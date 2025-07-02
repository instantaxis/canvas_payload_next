import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { vi } from 'vitest'
import DynamicForm from '@/app/(frontend)/components/forms/DynamicForm'
import { useCollectionSchema } from '@/app/(frontend)/hooks/useCollectionSchema'

// Mock the useCollectionSchema hook
vi.mock('@/app/(frontend)/hooks/useCollectionSchema')

const mockUseCollectionSchema = useCollectionSchema as vi.Mock

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('DynamicForm Integration Tests', () => {
  beforeEach(() => {
    mockUseCollectionSchema.mockClear()
  })

  it('handles multi-step forms', async () => {
    const mockSchema = {
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Step 1',
              fields: [{ name: 'step1Field', label: 'Step 1 Field', type: 'text', required: true }],
            },
            {
              label: 'Step 2',
              fields: [{ name: 'step2Field', label: 'Step 2 Field', type: 'text', required: true }],
            },
          ],
        },
      ],
    }

    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    })

    const handleSubmit = vi.fn()

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText('Step 1')).toBeInTheDocument()
      expect(screen.getByText('Step 2')).toBeInTheDocument()
    })

    // Initially, Step 1 is active
    expect(screen.getByLabelText(/Step 1 Field/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Step 2 Field/i)).not.toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/Step 1 Field/i), 'Step 1 Value')

    // Navigate to Step 2
    userEvent.click(screen.getByText('Step 2'))

    await waitFor(() => {
      expect(screen.getByLabelText(/Step 2 Field/i)).toBeInTheDocument()
    })
    expect(screen.queryByLabelText(/Step 1 Field/i)).not.toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/Step 2 Field/i), 'Step 2 Value')

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        step1Field: 'Step 1 Value',
        step2Field: 'Step 2 Value',
      })
    })
  })

  it('handles conditional fields based on other field values', async () => {
    const mockSchema = {
      fields: [
        {
          name: 'ticketType',
          label: 'Ticket Type',
          type: 'select',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'VIP', value: 'vip' },
          ],
          required: true,
        },
        {
          name: 'vipDetails',
          label: 'VIP Details',
          type: 'text',
          required: true,
          admin: {
            condition: ({ ticketType }) => ticketType === 'vip',
          },
        },
      ],
    }

    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    })

    const handleSubmit = vi.fn()

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>,
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/Ticket Type/i)).toBeInTheDocument()
    })

    // Initially, VIP details should not be visible
    expect(screen.queryByLabelText(/VIP Details/i)).not.toBeInTheDocument()

    // Select VIP option
    userEvent.click(screen.getByRole('combobox', { name: /Ticket Type/i }))
    await screen.findByText('VIP')
    userEvent.click(screen.getByText('VIP'))

    // VIP details should now be visible
    await waitFor(() => {
      expect(screen.getByLabelText(/VIP Details/i)).toBeInTheDocument()
    })

    userEvent.type(screen.getByLabelText(/VIP Details/i), 'Special access')
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        ticketType: 'vip',
        vipDetails: 'Special access',
      })
    })

    // Switch back to Standard
    userEvent.click(screen.getByRole('combobox', { name: /Ticket Type/i }))
    await screen.findByText('Standard')
    userEvent.click(screen.getByText('Standard'))

    // VIP details should be hidden again
    await waitFor(() => {
      expect(screen.queryByLabelText(/VIP Details/i)).not.toBeInTheDocument()
    })

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        ticketType: 'standard',
        // vipDetails should not be part of the submission
      })
    })
  })

  it('handles dynamic field arrays', async () => {
    const mockSchema = {
      fields: [
        {
          name: 'attendees',
          label: 'Attendees',
          type: 'array',
          fields: [
            { name: 'name', label: 'Attendee Name', type: 'text', required: true },
            { name: 'email', label: 'Attendee Email', type: 'email', required: true },
          ],
        },
      ],
    }

    mockUseCollectionSchema.mockReturnValue({
      data: mockSchema,
      isLoading: false,
      isError: false,
      error: null,
    })

    const handleSubmit = vi.fn()

    render(
      <Wrapper>
        <DynamicForm collectionSlug="testCollection" onSubmit={handleSubmit} />
      </Wrapper>,
    )

    await waitFor(() => {
      expect(screen.getByText('Attendees')).toBeInTheDocument()
    })

    // Add an attendee
    userEvent.click(screen.getByRole('button', { name: /Add Attendee/i }))

    await waitFor(() => {
      expect(screen.getByLabelText(/Attendee Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Attendee Email/i)).toBeInTheDocument()
    })

    userEvent.type(screen.getByLabelText(/Attendee Name/i), 'Jane Doe')
    userEvent.type(screen.getByLabelText(/Attendee Email/i), 'jane.doe@example.com')

    // Add another attendee
    userEvent.click(screen.getByRole('button', { name: /Add Attendee/i }))

    await waitFor(() => {
      const nameInputs = screen.getAllByLabelText(/Attendee Name/i)
      const emailInputs = screen.getAllByLabelText(/Attendee Email/i)
      expect(nameInputs.length).toBe(2)
      expect(emailInputs.length).toBe(2)
    })

    const nameInputs = screen.getAllByLabelText(/Attendee Name/i)
    const emailInputs = screen.getAllByLabelText(/Attendee Email/i)

    userEvent.type(nameInputs[1], 'John Smith')
    userEvent.type(emailInputs[1], 'john.smith@example.com')

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        attendees: [
          { name: 'Jane Doe', email: 'jane.doe@example.com' },
          { name: 'John Smith', email: 'john.smith@example.com' },
        ],
      })
    })

    // Remove the first attendee
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i })
    userEvent.click(removeButtons[0])

    await waitFor(() => {
      const nameInputs = screen.getAllByLabelText(/Attendee Name/i)
      expect(nameInputs.length).toBe(1)
      expect(nameInputs[0]).toHaveValue('John Smith')
    })

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        attendees: [{ name: 'John Smith', email: 'john.smith@example.com' }],
      })
    })
  })
})
