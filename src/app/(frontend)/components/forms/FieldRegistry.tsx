import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { InputField } from './InputField'
import { SelectField } from './SelectField'
import { ArrayField } from './ArrayField' // Placeholder
import { TabbedField } from './TabbedField' // Placeholder
import { PayloadField } from '@/app/(frontend)/hooks/useCollectionSchema'

interface FieldRegistryProps<TFormValues extends FieldValues> {
  field: PayloadField
  formMethods: UseFormReturn<TFormValues>
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
  const {
    formState: { errors },
  } = formMethods
  const error = errors[field.name]

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return (
        <div>
          <InputField
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.admin?.placeholder || field.label}
            aria-invalid={!!error}
            {...formMethods.register(field.name)}
          />
          {error && (
            <span role="alert" style={{ color: 'red' }}>
              {error.message?.toString()}
            </span>
          )}
        </div>
      )
    case 'select':
      return (
        <div>
          <SelectField
            name={field.name}
            label={field.label}
            options={field.options || []}
            placeholder={field.admin?.placeholder || field.label}
            aria-invalid={!!error}
          />
          {error && (
            <span role="alert" style={{ color: 'red' }}>
              {error.message?.toString()}
            </span>
          )}
        </div>
      )
    case 'array':
      return <ArrayField field={field} formMethods={formMethods} />
    case 'tabs':
      return <TabbedField field={field} formMethods={formMethods} />
    // TODO: Add more cases for other field types (checkbox, relationship, richText, etc.)
    default:
      return <p>Unknown or unsupported field type: {field.type}</p>
  }
}

export default FieldRegistry
