
'use client';

import React, { useEffect, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormWrapper, useForm } from '@/app/(frontend)/components/forms/FormWrapper';
import FieldRegistry from '@/app/(frontend)/components/forms/FieldRegistry';
import { useCollectionSchema } from '@/app/(frontend)/hooks/useCollectionSchema';
import { z } from 'zod';

interface DynamicFormProps {
  collectionSlug: string;
  onSubmit: (data: FieldValues) => void;
  className?: string;
}

/**
 * @description A dynamic form component that generates form fields based on a Payload collection schema.
 * @param {DynamicFormProps} { collectionSlug, onSubmit, className }
 * @returns {React.ReactElement}
 */
const DynamicForm: React.FC<DynamicFormProps> = ({
  collectionSlug,
  onSubmit,
  className,
}) => {
  const { data: schema, isLoading, isError, error } = useCollectionSchema(collectionSlug);

  const dynamicZodSchema = useMemo(() => {
    if (!schema) return z.object({}); // Return an empty schema if schema is not yet available

    return z.object(
      schema.fields.reduce((acc, field) => {
        let fieldSchema: z.ZodTypeAny;
        switch (field.type) {
          case 'text':
          case 'email':
          case 'password':
            fieldSchema = z.string();
            break;
          case 'number':
            fieldSchema = z.number();
            break;
          case 'checkbox':
            fieldSchema = z.boolean();
            break;
          case 'select':
            fieldSchema = z.string(); // Assuming single select for now
            if (field.hasMany) {
              fieldSchema = z.array(z.string());
            }
            break;
          // TODO: Add more types as needed (e.g., richText, relationship, date, array, group)
          default:
            fieldSchema = z.any();
            break;
        }

        if (field.required) {
          fieldSchema = fieldSchema.min(1, `${field.label || field.name} is required`);
        }

        // Apply min/max for number fields
        if (field.type === 'number') {
          if (field.min !== undefined) {
            fieldSchema = fieldSchema.min(field.min, `Must be at least ${field.min}`);
          }
          if (field.max !== undefined) {
            fieldSchema = fieldSchema.max(field.max, `Must be at most ${field.max}`);
          }
        }

        // Apply maxLength for text fields
        if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
          if (field.maxLength !== undefined) {
            fieldSchema = fieldSchema.max(field.maxLength, `Must be at most ${field.maxLength} characters`);
          }
        }

        return { ...acc, [field.name]: fieldSchema };
      }, {})
    );
  }, [schema]);

  // Initialize useForm with the memoized schema
  const methods = useForm({
    resolver: zodResolver(dynamicZodSchema),
    defaultValues: {},
    mode: 'onBlur', // Validate on blur
    reValidateMode: 'onChange', // Re-validate on change after first blur
    shouldUnregister: false, // Keep fields registered even if unmounted
  });

  // Track form submission attempts and validation errors
  useEffect(() => {
    if (methods.formState.isSubmitted) {
      console.log(`Form ${collectionSlug} submitted. Valid: ${methods.formState.isValid}`);
      if (!methods.formState.isValid) {
        console.log('Validation errors:', methods.formState.errors);
        // Here you would typically send this data to an analytics service
      }
    }
  }, [methods.formState.isSubmitted, methods.formState.isValid, methods.formState.errors, collectionSlug]);

  if (isLoading) {
    return <div>Loading form schema...</div>;
  }

  if (isError) {
    return <div>Error loading form schema: {error?.message}</div>;
  }

  if (!schema || schema.fields.length === 0) {
    return <div>No schema found for {collectionSlug} or no fields defined.</div>;
  }

  return (
    <FormWrapper onSubmit={onSubmit} schema={dynamicZodSchema} options={{ defaultValues: methods.getValues() }} className={className}>
      {schema.fields.map((field) => (
        <FieldRegistry key={field.name} field={field} formMethods={methods} />
      ))}
      <button type="submit">Submit</button>
    </FormWrapper>
  );
};

export default DynamicForm;
