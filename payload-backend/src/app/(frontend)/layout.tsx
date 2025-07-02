import React from 'react'
import './styles.css'
import { QueryClientProviderWrapper } from './lib/QueryClientProviderWrapper'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

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
        <QueryClientProviderWrapper>
          <main>{children}</main>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
