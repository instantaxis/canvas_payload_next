'use client'

import React from 'react'
import { toast } from '@/components/ui/use-toast'
import DynamicForm from '@/app/(frontend)/components/forms/DynamicForm'
import { registerSchema } from '@/schemas/registerSchema'
import { registerUserAction } from './actions';
import { useCrudMutation } from '@/app/(frontend)/hooks/useCrudMutation';

/**
 * @description The user registration page.
 * @returns {React.ReactElement}
 */
export default function RegisterPage() {
  const { mutate, isPending } = useCrudMutation(registerUserAction, {
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: 'Registration successful!',
          description: 'You can now log in with your new account.',
        });
      } else {
        toast({
          title: 'Registration failed',
          description: data.error || 'An error occurred during registration.',
          variant: 'destructive',
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Registration failed',
        description: error.message || 'An error occurred during registration.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="mt-2 text-sm text-gray-600">Create your account</p>
        </div>
        <DynamicForm
          collectionSlug="users"
          onSubmit={onSubmit}
          className="space-y-6"
        />
      </div>
    </div>
  );
}
