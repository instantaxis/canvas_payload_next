# Task: Secure Authentication-Aware Queries

## Overview
This task focuses on integrating authentication with data fetching to ensure that users can only access the data they are authorized to see. This will involve creating an authentication interceptor for automatic token refresh and implementing role-based query enabling.

## Context & Information
### Application Details
- **Stack**: Payload CMS backend with NextJS frontend
- **Architecture**: The application uses TanStack Query for all data fetching, with a focus on server-side rendering (SSR), caching, and optimistic updates.

### Relevant Libraries & Tools
- **TanStack Query**: Core library for data fetching and server state management.
- **Payload CMS**: Backend providing the REST and GraphQL APIs, as well as user and role data.

### Best Practices
- **Auth Interceptor**: Create an interceptor (e.g., using `axios` or a custom fetch wrapper) that automatically attaches the user's authentication token to outgoing requests and handles token refresh logic.
- **Role-Based Query Enabling**: Use the `enabled` option in `useQuery` to conditionally enable or disable queries based on the user's role.

## Task to Complete

### Task ID: 29.6
**Title**: Secure Authentication-Aware Queries
**Description**: Integrate authentication with data fetching by creating an auth interceptor for automatic token refresh and implementing role-based query enabling using user roles from the Users collection.
**Dependencies**: [29.5]
**Status**: pending

## Success Test
1.  **Auth Interceptor**: An authentication interceptor is created and applied to all relevant queries.
2.  **Role-Based Queries**: The `enabled` option is used to restrict access to queries based on user roles.
3.  **Testing**:
    - Log in as a user with a specific role and verify that they can only access the data they are authorized to see.
    - Attempt to access a protected query without being logged in and verify that the request is blocked.
    - Simulate a token expiration and verify that the auth interceptor successfully refreshes the token and retries the original request.

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
