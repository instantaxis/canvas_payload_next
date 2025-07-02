'use client'

import Image from 'next/image'
import React from 'react'
import './styles.css'
import { useAuthQuery } from './hooks/useAuthQuery'

/**
 * @description The home page for the frontend application.
 * @returns {React.ReactElement}
 */
export default function HomePage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useAuthQuery(
    ['currentUser'],
    async ({ signal }) => {
      const response = await fetch('/api/users/me', { signal })
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      return response.json()
    },
    { requireAuth: false }, // This page can be viewed by unauthenticated users
  )

  // Create VSCode link using client-side only approach to prevent hydration mismatch
  const [fileURL, setFileURL] = React.useState('')

  React.useEffect(() => {
    // Only set the URL on the client side to ensure consistent rendering
    setFileURL(`vscode://file${process.cwd()}/src/app/(frontend)/page.tsx`)
  }, [])

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {isLoading && <h1>Loading user data...</h1>}
        {isError && <h1>Error loading user data.</h1>}
        {!isLoading && !isError && !user && <h1>Welcome to your new project.</h1>}
        {!isLoading && !isError && user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a className="admin" href="/admin" rel="noopener noreferrer" target="_blank">
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
