
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import DynamicForm from '@/app/(frontend)/components/forms/DynamicForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock useCollectionSchema
vi.mock('@/app/(frontend)/hooks/useCollectionSchema', () => ({
  useCollectionSchema: vi.fn(() => ({
    data: {
      slug: 'users',
      fields: [
        { name: 'first_name', type: 'text', label: 'First Name', required: true, maxLength: 50 },
        { name: 'email', type: 'email', label: 'Email', required: true, unique: true },
        { name: 'password', type: 'password', label: 'Password', required: true, minLength: 8 },
      ],
    },
    isLoading: false,
    isError: false,
    error: null,
  })),
}));

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('DynamicForm', () => {
  it('renders form fields based on schema', async () => {
    const handleSubmit = vi.fn();
    renderWithClient(
      <DynamicForm collectionSlug="users" onSubmit={handleSubmit} />
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates fields and shows error messages', async () => {
    const handleSubmit = vi.fn();
    renderWithClient(
      <DynamicForm collectionSlug="users" onSubmit={handleSubmit} />
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    renderWithClient(
      <DynamicForm collectionSlug="users" onSubmit={handleSubmit} />
    );

    await userEvent.type(screen.getByLabelText(/First Name/i), 'John');
    await userEvent.type(screen.getByLabelText(/Email/i), 'john.doe@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      first_name: 'John',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });
});
