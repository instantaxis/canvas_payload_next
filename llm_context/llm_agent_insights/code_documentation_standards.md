# Code Documentation Standards (JSDoc/TSDoc)

This document outlines the standards for code documentation within this project, leveraging JSDoc/TSDoc for TypeScript files. Adhering to these guidelines ensures consistency, clarity, and maintainability of our codebase, facilitating automated documentation generation and improving developer experience.

## General Principles

*   **Clarity and Conciseness**: Documentation should be easy to understand and to the point. Avoid jargon where simpler terms suffice.
*   **Accuracy**: Documentation must accurately reflect the code's current behavior. Update documentation whenever code changes.
*   **Completeness**: All public APIs (functions, classes, interfaces, types, constants) and critical internal logic should be documented.
*   **Consistency**: Follow the specified formatting and style guidelines throughout the codebase.

## JSDoc/TSDoc Tags and Usage

Use the following JSDoc/TSDoc tags for comprehensive documentation:

### 1. `@description` (or plain text at the beginning)
*   **Purpose**: Provides a concise summary of the code element's purpose.
*   **Placement**: At the beginning of the JSDoc block.
*   **Example**:
    ```typescript
    /**
     * @description Calculates the sum of two numbers.
     * @param a - The first number.
     * @param b - The second number.
     * @returns The sum of a and b.
     */
    function add(a: number, b: number): number {
      return a + b;
    }
    ```

### 2. `@param {Type} name - Description`
*   **Purpose**: Describes a function parameter.
*   **`{Type}`**: The TypeScript type of the parameter (e.g., `{string}`, `{number[]}`, `{User}`).
*   **`name`**: The name of the parameter.
*   **Description**: A brief explanation of the parameter's role.
*   **Example**: (See `add` function example above)

### 3. `@returns {Type} - Description`
*   **Purpose**: Describes the return value of a function.
*   **`{Type}`**: The TypeScript type of the return value.
*   **Description**: A brief explanation of what the function returns.
*   **Example**: (See `add` function example above)

### 4. `@example`
*   **Purpose**: Provides a code example demonstrating how to use the documented element.
*   **Placement**: After `@param` and `@returns` tags.
*   **Example**:
    ```typescript
    /**
     * @description Fetches user data from the API.
     * @param userId - The ID of the user to fetch.
     * @returns A Promise that resolves to the user data.
     * @example
     * ```typescript
     * const user = await fetchUser(123);
     * console.log(user.name);
     * ```
     */
    async function fetchUser(userId: string): Promise<User> {
      // ... implementation
    }
    ```

### 5. `@typedef` and `@property`
*   **Purpose**: Documents complex object types or interfaces that are not explicitly defined as `interface` or `type` but are used in parameters or return values.
*   **Example**:
    ```typescript
    /**
     * @typedef {object} UserProfile
     * @property {string} id - The user's unique ID.
     * @property {string} name - The user's full name.
     * @property {string[]} roles - An array of roles assigned to the user.
     */

    /**
     * @description Creates a new user profile.
     * @param {UserProfile} profileData - The data for the new user profile.
     * @returns {UserProfile} The created user profile.
     */
    function createUser(profileData: UserProfile): UserProfile {
      // ... implementation
    }
    ```

### 6. `@deprecated`
*   **Purpose**: Indicates that a function, class, or property is no longer recommended for use and may be removed in future versions.
*   **Example**:
    ```typescript
    /**
     * @description This function is deprecated. Use `newFunction` instead.
     * @deprecated
     */
    function oldFunction() {
      // ...
    }
    ```

### 7. `@see`
*   **Purpose**: Refers to other related documentation or resources.
*   **Example**:
    ```typescript
    /**
     * @description Handles user authentication.
     * @see {@link https://example.com/auth-docs} for more details.
     * @see {@link User}
     */
    function authenticateUser() {
      // ...
    }
    ```

### 8. `@ignore`
*   **Purpose**: Excludes a code element from the generated documentation. Use sparingly.

## Formatting and Style

*   **Block Comments**: Use `/** ... */` for JSDoc/TSDoc blocks.
*   **Inline Comments**: Use `//` for short, single-line explanations within code blocks. Explain *why* something is done, not *what* is done (unless the "what" is complex).
*   **Indentation**: Match the indentation of the code it documents.
*   **Line Breaks**: Use line breaks to improve readability within long descriptions.
*   **Code Snippets**: Use Markdown code blocks (```typescript ... ```) within `@example` tags.

## Coverage Requirements

*   **Functions/Methods**: Every function and method (public and private, unless trivial) must have a JSDoc/TSDoc block.
*   **Classes/Interfaces/Types**: Every class, interface, and type definition must have a JSDoc/TSDoc block.
*   **Module/File Headers**: Each file should ideally start with a brief description of its purpose.
*   **Constants/Variables**: Document important constants or variables, especially if their purpose isn't immediately obvious.

By following these standards, we aim to create a self-documenting codebase that is easy to understand, maintain, and extend.
