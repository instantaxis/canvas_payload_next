'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useSearchParams } from 'next/navigation'

const passwordResetSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type PasswordResetFormData = z.infer<typeof passwordResetSchema>

export function PasswordResetForm() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      token: tokenFromUrl,
    },
  })

  async function onSubmit(data: PasswordResetFormData) {
    try {
      const response = await fetch('/api/auth/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.token, newPassword: data.newPassword }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your password has been reset successfully.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to reset password',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('token')} />
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <Input
          id="newPassword"
          type="password"
          {...register('newPassword')}
          aria-invalid={errors.newPassword ? 'true' : 'false'}
          aria-describedby="newPassword-error"
          className="mt-1 block w-full"
        />
        {errors.newPassword && (
          <p id="newPassword-error" className="mt-1 text-sm text-red-600">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-describedby="confirmPassword-error"
          className="mt-1 block w-full"
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Reset Password
      </Button>
    </form>
  )
}
