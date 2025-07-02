# Forms & Validation Tasks

## Overview
This group of tasks focuses on building and refining the application's form infrastructure. This includes core form handling, validation, dynamic form creation, performance optimization, and file uploads.

## Context & Information
### Application Details
- **Stack**: Payload CMS backend with NextJS frontend
- **Architecture**: The application uses a robust form system built with React Hook Form, Zod for validation, and Zustand for state management.

### Relevant Libraries & Tools
- **React Hook Form**: Core form library.
- **Zod**: Schema validation.
- **Zustand**: State management for complex forms.
- **TanStack Query**: For handling form submissions and server state.
- **Payload CMS**: For backend integration, including media uploads.
- **react-dropzone**: For file upload UI.

### Best Practices
- **Schema Isolation**: Define separate Zod schemas for each step in multi-step forms and merge them for final validation.
- **State Management**: Use `FormProvider` and `useFormContext` for nested form components. Use Zustand for persisting form state across sessions or complex multi-step flows.
- **Conditional Fields**: Use `watch` to monitor field values and conditionally render other fields. Unregister fields when they are hidden to avoid validation errors.
- **File Uploads**: Use `react-dropzone` for the UI and handle uploads via Payload's hooks or direct S3 integration.
- **Accessibility**: Use ARIA roles for error messages and ensure keyboard navigability.
- **Testing**: Use Vitest and React Testing Library for unit tests and Playwright for end-to-end testing of form flows.

### Code Patterns & Conventions
- **Multi-Step Forms**: Use a central state (local or Zustand) to manage the current step. Trigger validation only for the fields in the current step.
- **Dynamic Arrays**: Use `useFieldArray` from React Hook Form to manage dynamic lists of fields.
- **Async Validation**: Use Zod's async refinements or a debounced `watch` effect to perform server-side validation.
- **Zustand Integration**: Use `persist` middleware to save form state to local storage. Synchronize React Hook Form's state with the Zustand store on mount and on step changes.

## Tasks to Complete

### Task ID: 4
**Title**: Form Infrastructure
**Description**: Implement core form handling, validation, dynamic forms, performance, and analytics. Refer to `llm_context/forms/README.md` for form submission patterns and `llm_context/forms/complex_forms.md` for advanced composition patterns. Utilize `llm_context/state_management/README.md` for Zustand integration in form state management.
**Dependencies**: [1]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 4.1 - Set up Form Component Base Structure (done)
- **Subtask ID**: 4.2 - Implement Zod Validation Schema (done)
- **Subtask ID**: 4.3 - Develop Form Field Components (done)
- **Subtask ID**: 4.5 - Setup TanStack Query Integration (done)
- **Subtask ID**: 4.6 - Add Form Submission Logic (done)
- **Subtask ID**: 4.7 - Implement Form State Management (done)
- **Subtask ID**: 4.8 - Integrate Next.js 15 Server Actions (done)
- **Subtask ID**: 4.9 - Create Dynamic Form Builder with Field Registry (done)
- **Subtask ID**: 4.10 - Add Performance Optimizations (done)
- **Subtask ID**: 4.12 - Create Reusable Form Components and Hooks (done)
- **Subtask ID**: 4.13 - Integrate Auth for Secure Form Submissions (done)
- **Subtask ID**: 4.14 - Add Form Analytics and Validation Tracking (done)

### Task ID: 6
**Title**: Dynamic Forms & Complex Forms Review
**Description**: Audit, research, prototype, and plan migration for complex form scenarios. Refer to `llm_context/forms/complex_forms.md` for advanced composition patterns for multi-step, dynamic, and state-driven forms. This includes guidance on multi-step forms, dynamic field arrays, conditional fields, persisted form state with Zustand, async field-level validation, file uploads, accessibility, and testing strategies.
**Dependencies**: [4, 5]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 6.1 - Audit Existing Forms (done)
- **Subtask ID**: 6.2 - Identify Issues in Current Forms (done)
- **Subtask ID**: 6.3 - Research Form Design Best Practices (done)
- **Subtask ID**: 6.4 - Analyze Complexity and Architectural Needs (done)
- **Subtask ID**: 6.5 - Develop Proof-of-Concept Implementation (done)
- **Subtask ID**: 6.6 - Document Findings and Recommendations (done)
- **Subtask ID**: 6.7 - Plan Migration and Implementation (done)

### Task ID: 7
**Title**: File Upload System
**Description**: Implement drag-and-drop uploads, media collection integration, progress tracking, and media management. Refer to `llm_context/forms/README.md` for file upload handling patterns and `llm_context/payload3/best_practices.md` for file upload security best practices.
**Dependencies**: [2, 4]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 7.1 - Dropzone UI Component Implementation (done)
- **Subtask ID**: 7.2 - File State Management (done)
- **Subtask ID**: 7.3 - Payload CMS Media Collection Integration (done)
- **Subtask ID**: 7.4 - File Upload Handler (done)
- **Subtask ID**: 7.5 - TanStack Query Mutation Setup (done)
- **Subtask ID**: 7.6 - Progress Tracking UI (done)
- **Subtask ID**: 7.8 - Media Management Integration (done)

### Task ID: 20
**Title**: Review and Refine Form Composition for Complex Forms
**Description**: Analyzed and improved the architecture of complex forms. Refer to `llm_context/forms/complex_forms.md` for advanced composition patterns for multi-step, dynamic, and state-driven forms.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: pending

### Task ID: 28
**Title**: Comprehensive Review and Enhancement of Form-Related Tasks and Subtasks
**Description**: Performed an in-depth review of all form-related tasks to ensure advanced patterns are correctly implemented. Refer to `llm_context/forms/complex_forms.md` for advanced form composition patterns.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 28.1 - Audit and Catalog All Form Implementations Against Project Patterns (pending)
- **Subtask ID**: 28.2 - Review and Validate Form Composition, State, and Validation Layers (pending)
- **Subtask ID**: 28.3 - Assess Dynamic Fields and File Upload Workflows (pending)
- **Subtask ID**: 28.4 - Review Accessibility and User Experience Across All Forms (pending)
- **Subtask ID**: 28.5 - Update Subtasks, Expand Testing, and Synchronize Documentation (pending)

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
