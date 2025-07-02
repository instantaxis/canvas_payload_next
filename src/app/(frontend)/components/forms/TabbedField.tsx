import React, { useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { PayloadField } from '@/app/(frontend)/hooks/useCollectionSchema'
import FieldRegistry from './FieldRegistry'

interface TabbedFieldProps<TFormValues extends FieldValues> {
  field: PayloadField
  formMethods: UseFormReturn<TFormValues>
}

export const TabbedField = <TFormValues extends FieldValues>({
  field,
  formMethods,
}: TabbedFieldProps<TFormValues>) => {
  const [activeTab, setActiveTab] = useState(0)

  if (field.type !== 'tabs' || !field.tabs) {
    return null
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      const nextTab = (index + 1) % field.tabs.length
      setActiveTab(nextTab)
      const nextTabElement = document.getElementById(`tab-${nextTab}`)
      nextTabElement?.focus()
    } else if (event.key === 'ArrowLeft') {
      const prevTab = (index - 1 + field.tabs.length) % field.tabs.length
      setActiveTab(prevTab)
      const prevTabElement = document.getElementById(`tab-${prevTab}`)
      prevTabElement?.focus()
    }
  }

  const progress = ((activeTab + 1) / field.tabs.length) * 100

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: '#76c7c0',
              height: '10px',
              borderRadius: '4px',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </div>
        <span style={{ marginTop: '0.5rem', display: 'block' }}>
          Step {activeTab + 1} of {field.tabs.length}
        </span>
      </div>
      <div role="tablist">
        {field.tabs.map((tab, index) => (
          <button
            key={tab.label}
            id={`tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={activeTab === index ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {field.tabs[activeTab].fields.map((tabField) => (
          <FieldRegistry key={tabField.name} field={tabField} formMethods={formMethods} />
        ))}
      </div>
    </div>
  )
}
