
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const SelectField = ({
  name,
  label,
  options,
  placeholder,
  className,
  labelClassName,
  ...props
}: SelectFieldProps) => {
  const { setValue, formState: { errors }, watch } = useFormContext();
  const errorMessage = errors[name]?.message as string | undefined;
  const selectedValue = watch(name);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
      )}
      <Select
        onValueChange={(value) => setValue(name, value, { shouldValidate: true })}
        value={selectedValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder || label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};
