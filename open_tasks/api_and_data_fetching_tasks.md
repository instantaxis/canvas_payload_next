# API & Data Fetching Tasks

## Overview
This group of tasks focuses on building and optimizing the data-fetching layer of the application, integrating the Payload CMS backend with the Next.js frontend using TanStack Query.

## Context & Information
### Application Details
- **Stack**: Payload CMS backend with NextJS frontend
- **Architecture**: The application uses TanStack Query for all data fetching, with a focus on server-side rendering (SSR), caching, and optimistic updates.

### Relevant Libraries & Tools
- **TanStack Query**: Core library for data fetching and server state management.
- **Payload CMS**: Backend providing the REST and GraphQL APIs.
- **Next.js**: Frontend framework, with SSR capabilities.
- **Zustand**: For client-side state management that complements TanStack Query.

### Best Practices
- **Data Fetching**:
    - Use `useQuery` for data retrieval and `useMutation` for data modification.
    - Implement optimistic updates with `onMutate` for a better user experience.
    - Use `keepPreviousData` for smooth pagination.
    - Implement skeleton loaders during initial data fetch.
- **Caching**:
    - Define granular query keys to avoid unnecessary refetching.
    - Set appropriate `staleTime` and `cacheTime` based on data volatility.
- **SSR**:
    - Use `HydrationBoundary` to pass server-fetched data to the client.
    - Prefetch data on the server using `getQueryClient`.
- **Table Implementation**:
    - Use type-safe column definitions with `ColumnDef`.
    - Implement server-side sorting, filtering, and pagination for large datasets.

### Code Patterns & Conventions
- **Query Keys**: Use factory functions to generate consistent and unique query keys.
- **Authentication**: Create an auth-aware query hook that includes the user's token in requests.
- **Error Handling**: Implement a global error handler for TanStack Query to standardize error responses.
- **Zustand Integration**: Use Zustand for UI state (e.g., table filters, modal states) and TanStack Query for server state.

## Tasks to Complete

### Task ID: 2
**Title**: CMS & Database Integration
**Description**: Configure Payload 3.0 with Supabase, define collections, generate types, and verify setup. Refer to `llm_context/payload3/data_models.md` for detailed data models and relationships, `llm_context/payload3/README.md` for core concepts, and `llm_context/payload3/best_practices.md` for best practices in collection design and API usage. Pay attention to the Lexical WYSIWYG editor integration for rich text fields as described in `llm_context/payload3/data_models.md`.
**Dependencies**: [1]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 2.1 - Initialize Payload CMS Project Structure (done)
- **Subtask ID**: 2.2 - Configure Environment Variables for Payload and Supabase (done)
- **Subtask ID**: 2.3 - Define Initial Collection Schemas and Relationships (done)
- **Subtask ID**: 2.4 - Generate TypeScript Types via Payload (done)
- **Subtask ID**: 2.5 - Set Up Postgres Database Configuration (done)

### Task ID: 5
**Title**: Data-Fetching Layer
**Description**: Set up advanced TanStack Query patterns for SSR, caching, optimistic updates, auth-aware queries, offline, sync, and error handling. Refer to `llm_context/tanstack/README.md` for best practices in table implementation and integration points. Also, consult `llm_context/payload3/data_models.md` for Payload 3.0 data loading patterns.
**Dependencies**: [2, 3]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 5.1 - Query Client Setup (done)
- **Subtask ID**: 5.2 - Hydration Boundaries (done)
- **Subtask ID**: 5.3 - Caching Strategy (done)
- **Subtask ID**: 5.4 - Mutation Handlers (done)
- **Subtask ID**: 5.6 - Optimistic Updates (done)
- **Subtask ID**: 5.7 - Authentication-Aware Querying (done)
- **Subtask ID**: 5.8 - Factory Patterns (done)
- **Subtask ID**: 5.9 - Offline Support and Background Sync (done)
- **Subtask ID**: 5.10 - Loading States and Suspense Boundaries (done)

### Task ID: 8
**Title**: Collection & UI Components
**Description**: Implement CRUD hooks, relationship handling, and role-based UI/dashboard layout. Refer to `llm_context/payload3/data_models.md` for detailed data models and relationships, `llm_context/payload3/README.md` for core concepts, and `llm_context/ui_patterns/README.md` for Shadcn UI patterns and custom component development.
**Dependencies**: [5]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 8.1 - Design Data Models and Relationships (done)
- **Subtask ID**: 8.2 - Implement Create Operations (done)
- **Subtask ID**: 8.3 - Implement Read Operations with Filtering (done)
- **Subtask ID**: 8.4 - Implement Update Operations (done)
- **Subtask ID**: 8.5 - Implement Delete Operations (done)
- **Subtask ID**: 8.6 - Develop Advanced Filtering System (done)
- **Subtask ID**: 8.7 - Test and Optimize CRUD and Filtering (done)

### Task ID: 16
**Title**: Schema Sync
**Description**: Validate and synchronize database schema between Payload CMS and Supabase. Refer to `llm_context/payload3/data_models.md` for detailed Payload 3.0 data models and relationships, which are crucial for schema synchronization. This includes understanding collections like `Users`, `Media`, `Contacts`, `Locations`, and others, along with their key fields and relationships.
**Dependencies**: [27]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 16.1 - Export Current Payload CMS and Supabase Schemas (done)
- **Subtask ID**: 16.2 - Analyze and Document Schema Differences (done)
- **Subtask ID**: 16.3 - Plan and Generate Required Schema Migrations (done)
- **Subtask ID**: 16.4 - Apply Migrations and Update Payload CMS State (done)
- **Subtask ID**: 16.5 - Document and Version Control Schema Changes (done)

### Task ID: 23
**Title**: Implement API Versioning with URL Path Prefixes
**Description**: Introduced URL path versioning (e.g., `/api/v1/`) for all API routes. Refer to `llm_context/payload3/best_practices.md` for API usage best practices.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

### Task ID: 24
**Title**: Integrate Supabase S3-Compatible Storage with Payload CMS Media Collection
**Description**: Installed and configured `@payloadcms/storage-s3` for media uploads. Refer to `llm_context/payload3/best_practices.md` for file upload security best practices.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 24.1 - Package Installation (pending)
- **Subtask ID**: 24.2 - Environment Variable Setup (pending)
- **Subtask ID**: 24.3 - Payload Config Update (pending)
- **Subtask ID**: 24.4 - Media Collection Configuration (pending)
- **Subtask ID**: 24.5 - Integration Testing (pending)
- **Subtask ID**: 24.6 - Documentation (pending)

### Task ID: 29
**Title**: Review and Update Data Fetching and API Integration
**Description**: Reviewed and enhanced all data fetching and API integration tasks with advanced TanStack Query features. Refer to `llm_context/tanstack/README.md` for best practices in table implementation and integration points.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 29.1 - Audit Existing Data Fetching Patterns (pending)
- **Subtask ID**: 29.2 - Implement SSR Hydration (pending)
- **Subtask ID**: 29.3 - Optimize Pagination Strategies (pending)
- **Subtask ID**: 29.4 - Enhance Caching Strategies (pending)
- **Subtask ID**: 29.5 - Implement Optimistic Updates (pending)
- **Subtask ID**: 29.6 - Secure Authentication-Aware Queries (pending)
- **Subtask ID**: 29.7 - Refactor Table Data Fetching (pending)
- **Subtask ID**: 29.8 - Establish Monitoring and Metrics (pending)

### Task ID: 32
**Title**: Validate and Sync Database Schema Between Payload CMS and Supabase
**Description**: Researched and compared the current state of the database schema between Payload CMS and Supabase. Refer to `llm_context/payload3/data_models.md` for detailed Payload 3.0 data models and relationships.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 32.1 - Export Payload and Supabase Schemas (pending)
- **Subtask ID**: 32.2 - Analyze and Document Schema Differences (pending)
- **Subtask ID**: 32.3 - Generate Migration Scripts for Supabase (pending)
- **Subtask ID**: 32.4 - Apply and Validate Migrations on Supabase (pending)
- **Subtask ID**: 32.5 - Document and Version-Control Schema Changes (pending)

## Instructions for Completing These Tasks
1. **Work through tasks in dependency order** - Check dependencies before starting
2. **Follow existing code patterns** - Reference the context provided above
3. **Test your implementations** - Run relevant tests after each major change
4. **Document your progress** - Update the status and add notes below
5. **Commit changes** - When complete, prepare for git commit
6. **Report issues** - If blocked, document the issue and continue with other tasks

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
