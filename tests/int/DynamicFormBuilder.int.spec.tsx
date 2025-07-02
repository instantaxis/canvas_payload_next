import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock a simple dynamic field component for testing
const TextField = ({ name, label }: { name: string; label: string }) => {
  const { register, formState: { errors } } = useForm();
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...register(name)} />
      {errors[name] && <span role="alert">{errors[name]?.message as string}</span>}
    </div>
  );
};

// Mock a simple DynamicFormBuilder component
const DynamicFormBuilder = ({ schema, fieldsConfig }: { schema: z.ZodObject<any>; fieldsConfig: Array<{ name: string; label: string; type: string }> }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form>
        {fieldsConfig.map((field) => {
          if (field.type === 'text') {
            return <TextField key={field.name} name={field.name} label={field.label} />;
          }
          return null;
        })}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe('DynamicFormBuilder', () => {
  it('renders fields based on configuration', () => {
    const testSchema = z.object({
      firstName: z.string().min(1, 'First name is required'),
    });
    const fields = [{ name: 'firstName', label: 'First Name', type: 'text' }];

    render(<DynamicFormBuilder schema={testSchema} fieldsConfig={fields} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });

  it('displays validation errors on submit', async () => {
    const testSchema = z.object({
      email: z.string().email('Invalid email format'),
    });
    const fields = [{ name: 'email', label: 'Email', type: 'text' }];

    render(<DynamicFormBuilder schema={testSchema} fieldsConfig={fields} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email format');
  });

  it('renders multiple fields and validates them', async () => {
    const testSchema = z.object({
      username: z.string().min(3, 'Username must be at least 3 characters'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
    });
    const fields = [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Password', type: 'text' },
    ];

    render(<DynamicFormBuilder schema={testSchema} fieldsConfig={fields} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    expect(await screen.findByText('Username must be at least 3 characters')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    fireEvent.click(submitButton);

    // Expect no validation errors after valid input
    expect(screen.queryByText('Username must be at least 3 characters')).not.toBeInTheDocument();
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
  });
});
