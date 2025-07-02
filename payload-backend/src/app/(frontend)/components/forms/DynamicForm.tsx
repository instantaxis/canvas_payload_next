'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { FormWrapper } from '@/app/(frontend)/components/forms/FormWrapper'
import FieldRegistry from '@/app/(frontend)/components/forms/FieldRegistry'
import { useCollectionSchema } from '@/app/(frontend)/hooks/useCollectionSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
    if (!schema) return z.object({}) // Return an empty schema if schema is not yet available

    return z.object(
      schema.fields.reduce((acc, field) => {
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
            fieldSchema = z.string() // Assuming single select for now
            if (field.hasMany) {
              fieldSchema = z.array(z.string())
            }
            break
          // TODO: Add more types as needed (e.g., richText, relationship, date, array, group)
          default:
            fieldSchema = z.any()
            break
        }

        if (field.required) {
          fieldSchema = fieldSchema.min(1, `${field.label || field.name} is required`)
        }

        // Apply min/max for number fields
        if (field.type === 'number') {
          if (field.min !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).min(field.min, `Must be at least ${field.min}`)
          }
          if (field.max !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).max(field.max, `Must be at most ${field.max}`)
          }
        }

        // Apply maxLength for text fields
        if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
          if (field.maxLength !== undefined) {
            fieldSchema = (fieldSchema as z.ZodString).max(
              field.maxLength,
              `Must be at most ${field.maxLength} characters`,
            )
          }
        }

        return { ...acc, [field.name]: fieldSchema }
      }, {}),
    )
  }, [schema])

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    <FormWrapper onSubmit={onSubmit} schema={dynamicZodSchema} className={className}>
      {schema.fields.map((field) => (
        <FieldRegistry key={field.name} field={field} />
      ))}
      <button type="submit">Submit</button>
    </FormWrapper>
  )
}

export default DynamicForm            fieldSchema = fieldSchema.min(1, `${field.label || field.name} is required`)
        }

        // Apply min/max for number fields
        if (field.type === 'number') {
          if (field.min !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).min(field.min, `Must be at least ${field.min}`)
          }
          if (field.max !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).max(field.max, `Must be at most ${field.max}`)
          }
        }

        // Apply maxLength for text fields
        if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
          if (field.maxLength !== undefined) {
            fieldSchema = (fieldSchema as z.ZodString).max(
              field.maxLength,
              `Must be at most ${field.maxLength} characters`,
            )
          }
        }

        return { ...acc, [field.name]: fieldSchema }
      }, {}),
    )
  }, [schema])

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    <FormWrapper onSubmit={onSubmit} schema={dynamicZodSchema} className={className}>
      {schema.fields.map((field) => (
        <FieldRegistry key={field.name} field={field} />
      ))}
      <button type="submit">Submit</button>
    </FormWrapper>
  )
}

export default DynamicForm
