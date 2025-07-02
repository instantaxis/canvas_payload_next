
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { PayloadField } from '@/app/(frontend)/hooks/useCollectionSchema';

interface FieldRegistryProps<TFormValues extends FieldValues> {
  field: PayloadField;
  formMethods: UseFormReturn<TFormValues>;
}

/**
 * @description A registry component that renders different form fields based on their type.
 * @template TFormValues
 * @param {FieldRegistryProps<TFormValues>} { field, formMethods }
 * @returns {React.ReactElement}
 */
const FieldRegistry = <TFormValues extends FieldValues>({
  field,
  formMethods,
}: FieldRegistryProps<TFormValues>) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return (
        <InputField
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.admin?.placeholder || field.label}
          {...formMethods.register(field.name)}
        />
      );
    case 'select':
      return (
        <SelectField
          name={field.name}
          label={field.label}
          options={field.options || []}
          placeholder={field.admin?.placeholder || field.label}
        />
      );
    // TODO: Add more cases for other field types (checkbox, relationship, richText, etc.)
    default:
      return <p>Unknown or unsupported field type: {field.type}</p>;
  }
};

export default FieldRegistry;

