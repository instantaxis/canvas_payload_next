# Security & Authentication Tasks

## Overview
This group of tasks focuses on implementing and enhancing the security and authentication features of the application. This includes user authentication, authorization, role-based access control (RBAC), and middleware protections.

## Context & Information
### Application Details
- **Stack**: Payload CMS backend with NextJS frontend
- **Architecture**: The application uses a Payload CMS backend for data management and a Next.js frontend for the user interface. Authentication is handled through JWTs with secure cookies.

### Relevant Libraries & Tools
- **Payload CMS**: Core backend and authentication provider.
- **Next.js**: Frontend framework.
- **Zod**: Schema validation for forms and API inputs.
- **TanStack Query**: Data fetching and state management.
- **Vitest, Playwright, Supertest**: Testing frameworks.

### Best Practices
- **Authentication**: Use JWT with refresh tokens. Implement `maxLoginAttempts` and `lockTime` to prevent brute force attacks.
- **CSRF Protection**: Enable CSRF protection for all API endpoints.
- **Session Management**: Use HttpOnly, SameSite=Strict cookies for authentication tokens.
- **Environment Security**: Store sensitive data in environment variables.
- **Data Encryption**: Always use HTTPS for data transmission.
- **Audit Logging**: Implement detailed audit logs for all admin actions using plugins like `payload-auditor`.
- **Access Control**: Role-based access with inheritance.
- **Input Validation**: Schema-based validation for all inputs.
- **File Upload Security**: Type validation and virus scanning.
- **API Rate Limiting**: Use a token bucket algorithm.

### Code Patterns & Conventions
- **Imports**: Use direct imports from `payload` for core types (`CollectionConfig`, `Field`, `Access`, `PayloadRequest`).
- **Typing**:
    - Use `Access<any, User>` for access control functions.
    - Extend `PayloadRequest` to include your custom `User` type.
    - Use `CollectionBeforeChangeHook<T>` and `CollectionAfterChangeHook<T>` for hooks.
- **Access Control**:
    - `isAdmin`: Checks if `req.user.roles` includes 'admin'.
    - `isEmployee`: Checks if `req.user.roles` includes 'employee'.
    - `isManager`: Checks if `req.user.roles` includes 'manager'.
    - `isAdminOrHasLocationAccess`: Checks for admin role or if the user has access to the document's location.

## Tasks to Complete

### Task ID: 3
**Title**: Authentication & Authorization
**Description**: Implement secure authentication flows, RBAC, and middleware protections. Refer to `llm_context/payload3/best_practices.md` for security best practices (JWT revocation, secure password hashing, secure cookies, rate limiting, CSRF prevention, session management). Consult `llm_context/forms/README.md` for login/password reset flow patterns. For TypeScript typing issues, refer to `llm_context/responses/typescript_errors.md` and `llm_context/responses/typescript_error_resolution_v2.md`.
**Dependencies**: [2]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 3.1 - Set Up Authentication Configuration (done)
- **Subtask ID**: 3.2 - Implement User Registration Flow (done)
- **Subtask ID**: 3.3 - Implement User Login Flow (done)
- **Subtask ID**: 3.4 - Configure JWT Generation and Validation (done)
- **Subtask ID**: 3.5 - Implement Secure Cookie Management (done)
- **Subtask ID**: 3.6 - Design and Implement RBAC (done)
- **Subtask ID**: 3.7 - Implement Session Management (done)
- **Subtask ID**: 3.8 - Develop Password Reset Flow (done)
- **Subtask ID**: 3.9 - Apply Rate Limiting for Auth Endpoints (done)
- **Subtask ID**: 3.10 - Apply CSRF Protection (done)
- **Subtask ID**: 3.11 - Integrate Next.js Middleware for Auth (done)
- **Subtask ID**: 3.12 - Configure CORS for Auth Endpoints (done)
- **Subtask ID**: 3.13 - Implement JWT Fallback Mechanism (done)
- **Subtask ID**: 3.14 - Develop Custom Authentication Strategies (done)
- **Subtask ID**: 3.15 - Implement Comprehensive Auth Testing (done)

### Task ID: 13
**Title**: Middleware & Security
**Description**: Modular middleware, JWT revocation, bcrypt hashing, secure cookies, rate limiting, input validation, centralized access control. Refer to `llm_context/payload3/best_practices.md` for security best practices (JWT revocation, secure password hashing, secure cookies, rate limiting, CSRF prevention, session management, environment security, data encryption). For TypeScript typing issues, refer to `llm_context/responses/typescript_errors.md` and `llm_context/responses/typescript_error_resolution_v2.md`.
**Dependencies**: [3, 4, 5, 9, 25]
**Details**: Full details in Taskmaster.
**Status**: done

#### Subtasks:
- **Subtask ID**: 13.1 - Implement JWT Revocation, Secure Password Hashing, and Secure Cookie Settings (done)
- **Subtask ID**: 13.2 - Integrate Rate Limiting and Comprehensive Input Validation Middleware (done)
- **Subtask ID**: 13.3 - Refactor Middleware into Modular Components and Add Security Headers (done)
- **Subtask ID**: 13.4 - Centralize Access Control and Integrate Audit Logging with Retention Policies (done)
- **Subtask ID**: 13.5 - Ensure Form Accessibility, Comprehensive Testing, and Docker Security Hardening (done)

### Task ID: 17
**Title**: Authenticated User Endpoint
**Description**: Implement /api/users/me API route for current authenticated user info. Refer to `llm_context/payload3/best_practices.md` for authentication best practices, including JWT and session management. For TypeScript typing issues related to `PayloadRequest` and custom user types, consult `llm_context/responses/typescript_errors.md` and `llm_context/responses/typescript_error_resolution_v2.md`.
**Dependencies**: [3, 23]
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 17.1 - Design Test Cases (pending)
- **Subtask ID**: 17.2 - Integration Testing (pending)
- **Subtask ID**: 17.3 - Retention Policy Validation (pending)
- **Subtask ID**: 17.4 - Cross-Database Checks (pending)
- **Subtask ID**: 17.5 - Documentation Review (pending)
- **Subtask ID**: 17.6 - Compliance Validation (pending)

### Task ID: 21
**Title**: Refactor and Centralize Access Control & Role Management
**Description**: Centralized all access control logic into a dedicated module. Refer to `llm_context/payload3/best_practices.md` for access control implementation and `llm_context/responses/typescript_error_resolution_v2.md` for typing.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

### Task ID: 22
**Title**: Modularize Middleware for Security, CORS, Authentication, and Rate Limiting
**Description**: Refactored the monolithic `middleware.ts` file into focused modules. Refer to `llm_context/payload3/best_practices.md` for API rate limiting and CSRF prevention. For TypeScript typing issues, refer to `llm_context/responses/typescript_errors.md`.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

### Task ID: 26
**Title**: Implement Security Best Practices
**Description**: Added explicit subtasks and implemented security best practices across the application. Refer to `llm_context/payload3/best_practices.md` for comprehensive security guidelines.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 26.1 - Implement JWT Revocation Mechanism (pending)
- **Subtask ID**: 26.2 - Enhance Password and Cookie Security (pending)
- **Subtask ID**: 26.3 - Apply Rate Limiting and Input Validation (pending)
- **Subtask ID**: 26.4 - Refactor Middleware and Centralize Access Control (pending)
- **Subtask ID**: 26.5 - Accessibility, Testing, and Docker Security Hardening (pending)

### Task ID: 30
**Title**: Review and Update Middleware, Access Control, and Logging
**Description**: Consolidated access control logic, modularized middleware, and implemented comprehensive logging. Refer to `llm_context/payload3/best_practices.md` for relevant security and logging best practices.
**Dependencies**: []
**Details**: Full details in Taskmaster.
**Status**: in-progress

#### Subtasks:
- **Subtask ID**: 30.1 - Audit Existing Access Points (pending)
- **Subtask ID**: 30.2 - Design and Implement Centralized RBAC Module (pending)
- **Subtask ID**: 30.3 - Refactor Access Checks to Use Central Module (pending)
- **Subtask ID**: 30.4 - Modularize and Standardize Middleware (pending)
- **Subtask ID**: 30.5 - Implement Security Headers and Middleware Hardening (pending)
- **Subtask ID**: 30.6 - Integrate Comprehensive Audit and Centralized Logging (pending)
- **Subtask ID**: 30.7 - Validation, Automated Testing, and Security Scanning (pending)
- **Subtask ID**: 30.8 - Documentation and CI/CD Pipeline Integration (pending)

### Task ID: 33
**Title**: Implement /api/users/me API Route for Authenticated User Info
**Description**: Created a secure API route at `/api/users/me` that returns the current authenticated user's information. Refer to `llm_context/payload3/best_practices.2.md` for authentication best practices, including JWT and session management. For TypeScript typing issues related to `PayloadRequest` and custom user types, consult `llm_context/responses/typescript_errors.md` and `llm_context/responses/typescript_error_resolution_v2.md`.
**Dependencies**: [3, 23]
**Details**: Full details in Taskmaster.
**Status**: in-progress

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
