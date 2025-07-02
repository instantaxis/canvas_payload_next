# Task: Refactor Table Data Fetching

## Overview
This task focuses on optimizing table components by implementing server-side sorting and filtering, adding virtualization for large datasets, integrating Zustand for state persistence, and developing CSV export functionality.

## Context & Information
### Application Details
- **Stack**: Payload CMS backend with NextJS frontend
- **Architecture**: The application uses TanStack Table for displaying data, with TanStack Query for data fetching.

### Relevant Libraries & Tools
- **TanStack Table**: For creating tables and data grids.
- **TanStack Query**: Core library for data fetching and server state management.
- **Zustand**: For client-side state management.
- **TanStack Virtual**: For virtualizing large lists and tables.

### Best Practices
- **Server-Side Operations**: For large tables, perform sorting, filtering, and pagination on the server to avoid sending large amounts of data to the client.
- **Virtualization**: Use a library like TanStack Virtual to render only the visible rows in a table, which can significantly improve performance for large datasets.
- **State Persistence**: Use Zustand to persist table state (e.g., filters, sorting, column order) across page loads.
- **CSV Export**: Provide a way for users to export table data to CSV format. This can be done by using the data from the query cache.

## Task to Complete

### Task ID: 29.7
**Title**: Refactor Table Data Fetching
**Description**: Optimize table components by implementing server-side sorting/filtering, adding virtualization for large datasets, integrating Zustand for state persistence, and developing CSV export using query cache data.
**Dependencies**: [29.6]
**Status**: pending

## Success Test
1.  **Server-Side Operations**: All tables that display large datasets are updated to use server-side sorting and filtering.
2.  **Virtualization**: TanStack Virtual is implemented for all large tables.
3.  **State Persistence**: The state of all tables is persisted using Zustand.
4.  **CSV Export**: A CSV export button is added to all tables, and it correctly exports the table data.
5.  **Testing**:
    - Verify that server-side sorting and filtering are working correctly by inspecting the network requests.
    - Scroll through a large table and verify that virtualization is working correctly by inspecting the DOM.
    - Change the state of a table (e.g., by applying a filter), reload the page, and verify that the state is restored.
    - Export a table to CSV and verify that the data is correct.

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
