
'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const InputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  className,
  labelClassName,
  ...props
}: InputFieldProps) => {
  const { register, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...props}
      />
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};
