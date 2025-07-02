import React from 'react'
import { FieldValues, useFieldArray, UseFormReturn } from 'react-hook-form'
import { PayloadField } from '@/app/(frontend)/hooks/useCollectionSchema'
import FieldRegistry from './FieldRegistry'

interface ArrayFieldProps<TFormValues extends FieldValues> {
  field: PayloadField
  formMethods: UseFormReturn<TFormValues>
}

export const ArrayField = <TFormValues extends FieldValues>({
  field,
  formMethods,
}: ArrayFieldProps<TFormValues>) => {
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: field.name,
  })

  if (field.type !== 'array' || !field.fields) {
    return null
  }

  return (
    <div>
      <label>{field.label}</label>
      {fields.map((item, index) => (
        <div key={item.id}>
          {field.fields.map((subField) => (
            <FieldRegistry
              key={subField.name}
              field={{
                ...subField,
                name: `${field.name}.${index}.${subField.name}`,
              }}
              formMethods={formMethods}
            />
          ))}
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({})}>
        Add {field.label}
      </button>
    </div>
  )
}
