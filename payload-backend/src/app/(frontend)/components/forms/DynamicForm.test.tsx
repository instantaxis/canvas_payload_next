import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import DynamicForm from './DynamicForm';
import { useCollectionSchema } from '@/app/(frontend)/hooks/useCollectionSchema';

// Mock the useCollectionSchema hook
jest.mock('@/app/(frontend)/hooks/useCollectionSchema');

const mockUseCollectionSchema = useCollectionSchema as jest.Mock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  );
};

describe('DynamicForm', () => {
  beforeEach(() => {
    mockUseCollectionSchema.mockClear();
  });

  it('renders loading state initially', () => {
    mockUseCollectionSchema.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={jest.fn()} />
      </Wrapper>
    );

    expect(screen.getByText('Loading form schema...')).toBeInTheDocument();
  });

  it('renders error state if schema fetching fails', () => {
    mockUseCollectionSchema.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch schema'),
    });

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={jest.fn()} />
      </Wrapper>
    );

    expect(screen.getByText('Error loading form schema: Failed to fetch schema')).toBeInTheDocument();
  });

  it('renders no schema message if schema is empty', () => {
    mockUseCollectionSchema.mockReturnValue({
      data: { fields: [] },
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={jest.fn()} />
      </Wrapper>
    );

    expect(screen.getByText('No schema found for testCollection or no fields defined.')).toBeInTheDocument();
  });

  it('renders form fields based on schema and handles submission', async () => {
    const mockSchema = {
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'age', label: 'Age', type: 'number', required: false },
      ],
    };
    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    });

    const handleSubmit = jest.fn();

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
    userEvent.type(screen.getByLabelText(/Email/i), 'john.doe@example.com');
    userEvent.type(screen.getByLabelText(/Age/i), '30');

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      });
    });
  });

  it('displays validation errors for required fields', async () => {
    const mockSchema = {
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
      ],
    };
    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    });

    const handleSubmit = jest.fn();

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('handles number field min/max validation', async () => {
    const mockSchema = {
      fields: [
        { name: 'age', label: 'Age', type: 'number', min: 18, max: 65, required: true },
      ],
    };
    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    });

    const handleSubmit = jest.fn();

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByLabelText(/Age/i), '10');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Must be at least 18')).toBeInTheDocument();
    });

    userEvent.clear(screen.getByLabelText(/Age/i));
    userEvent.type(screen.getByLabelText(/Age/i), '70');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Must be at most 65')).toBeInTheDocument();
    });

    userEvent.clear(screen.getByLabelText(/Age/i));
    userEvent.type(screen.getByLabelText(/Age/i), '25');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ age: 25 });
    });
  });

  it('handles text field maxLength validation', async () => {
    const mockSchema = {
      fields: [
        { name: 'bio', label: 'Bio', type: 'text', maxLength: 10, required: true },
      ],
    };
    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    });

    const handleSubmit = jest.fn();

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByLabelText(/Bio/i), 'This is a very long bio that exceeds the limit');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Must be at most 10 characters')).toBeInTheDocument();
    });

    userEvent.clear(screen.getByLabelText(/Bio/i));
    userEvent.type(screen.getByLabelText(/Bio/i), 'Short bio');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ bio: 'Short bio' });
    });
  });
});
