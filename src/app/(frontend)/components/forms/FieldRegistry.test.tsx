import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import FieldRegistry from './FieldRegistry';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

// Mock child components
jest.mock('./InputField', () => ({
  InputField: jest.fn(() => <div data-testid="InputField" />),
}));
jest.mock('./SelectField', () => ({
  SelectField: jest.fn(() => <div data-testid="SelectField" />),
}));

describe('FieldRegistry', () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  beforeEach(() => {
    (InputField as jest.Mock).mockClear();
    (SelectField as jest.Mock).mockClear();
  });

  it('renders InputField for text type', () => {
    const field = { name: 'testText', label: 'Test Text', type: 'text' };
    render(
      <Wrapper>
        <FieldRegistry field={field} formMethods={useForm()} />
      </Wrapper>
    );
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'testText',
        label: 'Test Text',
        type: 'text',
      }),
      {}
    );
    expect(screen.getByTestId('InputField')).toBeInTheDocument();
  });

  it('renders InputField for email type', () => {
    const field = { name: 'testEmail', label: 'Test Email', type: 'email' };
    render(
      <Wrapper>
        <FieldRegistry field={field} formMethods={useForm()} />
      </Wrapper>
    );
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'testEmail',
        label: 'Test Email',
        type: 'email',
      }),
      {}
    );
    expect(screen.getByTestId('InputField')).toBeInTheDocument();
  });

  it('renders InputField for password type', () => {
    const field = { name: 'testPassword', label: 'Test Password', type: 'password' };
    render(
      <Wrapper>
        <FieldRegistry field={field} formMethods={useForm()} />
      </Wrapper>
    );
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'testPassword',
        label: 'Test Password',
        type: 'password',
      }),
      {}
    );
    expect(screen.getByTestId('InputField')).toBeInTheDocument();
  });

  it('renders InputField for number type', () => {
    const field = { name: 'testNumber', label: 'Test Number', type: 'number' };
    render(
      <Wrapper>
        <FieldRegistry field={field} formMethods={useForm()} />
      </Wrapper>
    );
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'testNumber',
        label: 'Test Number',
        type: 'number',
      }),
      {}
    );
    expect(screen.getByTestId('InputField')).toBeInTheDocument();
  });

  it('renders SelectField for select type', () => {
    const field = { name: 'testSelect', label: 'Test Select', type: 'select', options: ['option1', 'option2'] };
    render(
      <Wrapper>
        <FieldRegistry field={field} formMethods={useForm()} />
      </Wrapper>
    );
    expect(SelectField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'testSelect',
        label: 'Test Select',
        options: ['option1', 'option2'],
      }),
      {}
    );
    expect(screen.getByTestId('SelectField')).toBeInTheDocument();
  });

  it('renders message for unknown field type', () => {
    const field = { name: 'unknown', label: 'Unknown Field', type: 'unsupported' };
    render(
      <Wrapper>
        <FieldRegistry field={field} formMethods={useForm()} />
      </Wrapper>
    );
    expect(screen.getByText('Unknown or unsupported field type: unsupported')).toBeInTheDocument();
  });
});
