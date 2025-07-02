
'use client';

import { useState, useCallback } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface FormStateOptions<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  initialState?: Partial<TFormValues>;
}

export const useFormState = <TFormValues extends FieldValues>({
  form,
  initialState,
}: FormStateOptions<TFormValues>) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Track if any field has been changed from its initial state
  const watchAllFields = form.watch();
  useCallback(() => {
    if (initialState) {
      const dirtyFields = form.formState.dirtyFields;
      setIsDirty(Object.keys(dirtyFields).length > 0);
    } else {
      setIsDirty(Object.keys(watchAllFields).length > 0);
    }
  }, [watchAllFields, form.formState.dirtyFields, initialState, form]);

  const setSubmitting = useCallback((value: boolean) => {
    setIsSubmitting(value);
  }, []);

  const incrementSubmitCount = useCallback(() => {
    setSubmitCount((prev) => prev + 1);
  }, []);

  return {
    isDirty,
    isSubmitting,
    submitCount,
    setSubmitting,
    incrementSubmitCount,
    formState: form.formState,
    control: form.control,
    watch: form.watch,
    getValues: form.getValues,
    setValue: form.setValue,
    reset: form.reset,
  };
};
