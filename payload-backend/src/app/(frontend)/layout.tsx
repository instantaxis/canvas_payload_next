import React from 'react'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const queryClient = new QueryClient();

/**
 * @description The root layout for the frontend application.
 * @param {{ children: React.ReactNode }} props
 * @returns {Promise<React.ReactElement>}
 */
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <main>{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  )
}
