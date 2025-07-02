
'use client';

import React from 'react';
import { useForm, FormProvider, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodSchema, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues } from 'react-hook-form';

interface FormWrapperProps<TFormValues extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: TFormValues) => void;
  schema: ZodSchema<TFormValues>;
  options?: UseFormProps<TFormValues>;
  className?: string;
}

/**
 * @description A wrapper component for react-hook-form that provides a FormProvider and handles form submission.
 * @template TFormValues
 * @param {FormWrapperProps<TFormValues>} props
 * @returns {React.ReactElement}
 */
export const FormWrapper = <TFormValues extends FieldValues>({
  children,
  onSubmit,
  schema,
  options,
  className,
}: FormWrapperProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

// Re-exporting for convenience
export { useForm, zodResolver, z };
export type { UseFormReturn };
