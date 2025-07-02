'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import debounce from 'lodash.debounce'
import FieldRegistry from '@/app/(frontend)/components/forms/FieldRegistry'
import { useCollectionSchema } from '@/app/(frontend)/hooks/useCollectionSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

interface DynamicFormProps {
  collectionSlug: string
  onSubmit: (data: FieldValues) => void
  className?: string
}

/**
 * @description A dynamic form component that generates form fields based on a Payload collection schema.
 * @param {DynamicFormProps} { collectionSlug, onSubmit, className }
 * @returns {React.ReactElement}
 */
const DynamicForm: React.FC<DynamicFormProps> = ({ collectionSlug, onSubmit, className }) => {
  const { data: schema, isLoading, isError, error } = useCollectionSchema(collectionSlug)

  const [isMounted, setIsMounted] = useState(false)

  const dynamicZodSchema = useMemo(() => {
    if (!schema) return z.object({})

    const schemaFields = schema.fields.reduce((acc, field) => {
      let fieldSchema: z.ZodTypeAny
      switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
          fieldSchema = z.string()
          break
        case 'number':
          fieldSchema = z.number()
          break
        case 'checkbox':
          fieldSchema = z.boolean()
          break
        case 'select':
          fieldSchema = z.string()
          if (field.hasMany) {
            fieldSchema = z.array(z.string())
          }
          break
        default:
          fieldSchema = z.any()
          break
      }

      if (field.required) {
        if ('min' in fieldSchema) {
          fieldSchema = (fieldSchema as z.ZodString | z.ZodArray<any>).min(
            1,
            `${field.label || field.name} is required`,
          )
        }
      }

      if (field.type === 'number') {
        if (field.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(field.min, `Must be at least ${field.min}`)
        }
        if (field.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(field.max, `Must be at most ${field.max}`)
        }
      }

      if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
        if (field.maxLength !== undefined) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.maxLength,
            `Must be at most ${field.maxLength} characters`,
          )
        }
      }

      return { ...acc, [field.name]: fieldSchema }
    }, {})

    return z.object(schemaFields)
  }, [schema])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formMethods = useForm({
    resolver: zodResolver(dynamicZodSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const debouncedSubmit = useMemo(
    () => debounce(formMethods.handleSubmit(onSubmit), 500),
    [formMethods, onSubmit],
  )

  if (isLoading || !isMounted) {
    return <div>Loading form schema...</div>
  }

  if (isError) {
    return <div>Error loading form schema: {error?.message}</div>
  }

  if (!schema || schema.fields.length === 0) {
    return <div>No schema found for {collectionSlug} or no fields defined.</div>
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={debouncedSubmit} className={className}>
        {schema.fields.map((field, index) => (
          <FieldRegistry key={`${field.name}-${index}`} field={field} formMethods={formMethods} />
        ))}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

export default DynamicForm
