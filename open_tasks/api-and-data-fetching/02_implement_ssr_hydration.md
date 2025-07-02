# Task: Implement SSR Hydration

## Overview
This task focuses on enabling server-side rendering (SSR) for public routes to improve initial page load performance. This will be achieved by pre-fetching data on the server and passing it to the client for hydration.

## Context & Information
### Application Details
- **Stack**: Payload CMS backend with NextJS frontend
- **Architecture**: The application uses TanStack Query for all data fetching, with a focus on server-side rendering (SSR), caching, and optimistic updates.

### Relevant Libraries & Tools
- **TanStack Query**: Core library for data fetching and server state management.
- **Next.js**: Frontend framework, with SSR capabilities.

### Best Practices
- **`getQueryClient`**: Use a utility function to get a singleton instance of the query client on the server.
- **`HydrationBoundary`**: Wrap pages with `HydrationBoundary` to pass the dehydrated query cache from the server to the client.
- **`getServerSideProps`**: Use `getServerSideProps` to pre-fetch data on the server and pass it to the page component as props.

## Task to Complete

### Task ID: 29.2
**Title**: Implement SSR Hydration
**Description**: Enable server-side rendering (SSR) support for public routes by creating a getQueryClient utility, wrapping pages with HydrationBoundary, and prefetching critical data in getServerSideProps.
**Dependencies**: [29.1]
**Status**: pending

## Success Test
1.  **`getQueryClient` Utility**: A `getQueryClient` utility function is created to provide a singleton instance of the query client.
2.  **`HydrationBoundary` Wrapper**: All pages that require SSR are wrapped with the `HydrationBoundary` component.
3.  **`getServerSideProps` Implementation**: `getServerSideProps` is implemented on the relevant pages to pre-fetch data and pass it to the `HydrationBoundary`.
4.  **Testing**:
    - View the source of a server-rendered page and verify that the pre-fetched data is present in the initial HTML.
    - Use the browser's developer tools to confirm that no additional network request is made for the pre-fetched data on the initial page load.
    - Verify that the page hydrates correctly on the client without any flickering or layout shifts.

## Progress Report
[Agent will fill this section]

### Completed Tasks:
- Task ID [X]: [Status] - [Brief description of what was done]

### Issues Encountered:
- [Document any problems or blockers]

### Files Modified/Created:
- [List all files changed]

### Ready for Commit: [Yes/No]
[If Yes, note that original taskmaster entries should be marked complete]
