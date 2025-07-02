# Project Setup Verification for Payload 3.0 + Next.js

To ensure a robust setup for your Payload 3.0 + Next.js restaurant management system, perform the following verification checks:

### 1. Build Process Verification

This step ensures that both your Next.js frontend and Payload backend can be successfully built for production.

*   **Next.js Build:**
    *   **Command:** `npm run build` (or `yarn build`, `pnpm build`) in your Next.js project root.
    *   **Check:** The command should complete without errors, indicating that Next.js has successfully compiled your application for production. Look for output similar to "Compiled successfully" or "Build complete". This will generate the `.next` directory.

*   **Payload Build (if separate):**
    *   Payload CMS typically builds as part of the Next.js build process if integrated within the same project. If you have a separate Payload backend, it might have its own build step.
    *   **Command (example for a separate Payload build):** `npm run payload:build` (or similar, check your `package.json` scripts).
    *   **Check:** Verify successful compilation of Payload's admin UI and server-side code.

### 2. TypeScript Compilation Checks

Ensuring correct TypeScript compilation is crucial for type safety and catching errors early.

*   **Command:** `tsc --noEmit`
    *   **Description:** This command runs the TypeScript compiler to check for type errors without emitting any JavaScript files. It's a quick way to validate your TypeScript code.
    *   **Check:** The command should exit with no errors. Any output indicates type errors that need to be resolved.

*   **ESLint with TypeScript:**
    *   **Command:** `npm run lint` (or `yarn lint`, `pnpm lint`)
    *   **Description:** Assuming your ESLint is configured for TypeScript, this command will check for code style and potential issues.
    *   **Check:** The command should report no linting errors or warnings.

### 3. Payload Connection Testing

Verify that your Next.js application can successfully connect to and interact with the Payload CMS backend.

*   **Start Payload/Next.js Development Server:**
    *   **Command:** `npm run dev` (or `yarn dev`, `pnpm dev`) in your project root.
    *   **Check:** Ensure both the Next.js frontend and Payload CMS backend (admin UI) are running and accessible, typically on `http://localhost:3000` and `http://localhost:3000/admin` respectively.

*   **Access Payload Admin UI:**
    *   **Check:** Navigate to `http://localhost:3000/admin` in your browser. You should see the Payload CMS login screen or dashboard. This confirms the Payload server is running and serving its admin interface.

*   **Test API Endpoints:**
    *   **Check:** Use a tool like Postman, Insomnia, `curl`, or your browser to hit a public Payload API endpoint (e.g., `http://localhost:3000/api/users` or `http://localhost:3000/api/media`).
    *   **Command (example using curl):** `curl http://localhost:3000/api/media`
    *   **Check:** You should receive a valid JSON response, even if it's an empty array, indicating that the API is reachable and functioning.

*   **Database Connection:**
    *   **Check:** When starting the Payload server, observe the console output for messages indicating a successful database connection (e.g., "Connected to MongoDB"). If there are connection errors, verify your `DATABASE_URI` environment variable.

### 4. Dependency Validation

Ensure all project dependencies are correctly installed and compatible.

*   **Install Dependencies:**
    *   **Command:** `npm install` (or `yarn install`, `pnpm install`)
    *   **Check:** This command should complete without errors. Any errors here indicate issues with `package.json` or network connectivity.

*   **Check for Outdated Dependencies (Optional but Recommended):**
    *   **Command:** `npm outdated` (or `yarn outdated`, `pnpm outdated`)
    *   **Check:** This command lists outdated packages. While not strictly a "failure" if outdated, it's good practice to keep dependencies updated to avoid security vulnerabilities and compatibility issues.

*   **Verify `node_modules`:**
    *   **Check:** Ensure the `node_modules` directory exists in your project root and contains the installed packages. Its presence confirms that `npm install` (or equivalent) ran successfully.

By systematically performing these checks, you can ensure that your Payload 3.0 + Next.js project is correctly set up and ready for development.