# Form Submission Patterns


## Form Libraries
- [x] React Hook Form integration patterns - Integrates well with Zod for schema validation
- [x] Zod schema validation - Provides type safety and validation logic
- [x] Form state management with Zustand - Use Zustand for complex form state across components
- [x] File upload handling with Payload Media - Implement using Form Builder plugin with custom overrides[1][2]
- [x] Password reset flow - Backend endpoints and frontend forms with validation and email verification
- [x] Login flow - Backend API and frontend form with JWT authentication and secure cookie handling
## Submission Strategies
- [x] Optimistic UI updates - Implement with Tanstack Query's `onMutate`[4]
- [x] Error handling and user feedback - Use Form Builder's confirmation messages[1][4]
- [x] Multi-step form patterns - Implement with Zustand state management
- [x] Auto-save functionality - Use debounced submissions with Zustand
- [x] Form validation timing - Real-time validation with Zod schemas

## Payload Integration
- [x] Collection field mapping - Map form fields directly to Payload collections[3]
- [x] Relationship field handling - Use Form Builder's relationship fields[3]
- [x] Rich text editor integration - Implement Lexical editor in forms[3]
- [x] Media upload workflows - Custom file upload handling with Form Builder[1][2]
```typescript
// File upload example with Form Builder
import { FormBuilder } from 'payload-plugin-form-builder';

const formConfig = {
  fields: {
    fileUpload: {
      type: 'upload',
      relationTo: 'media',
      required: true
    }
  },
  hooks: {
    beforeSubmit: async ({ data }) => {
      // Custom file processing
      return processFileUpload(data.fileUpload);
    }
  }
};
```
- [x] Bulk operations - Implement with Payload's bulk operation endpoints

## UI Patterns
- [x] Loading states and spinners - Show during form submission
- [x] Success/error notifications - Use Form Builder's confirmation system[1][4]
- [x] Form reset strategies - Reset form after successful submission
- [x] Conditional field rendering - Implement with React state and useEffect
- [x] Accessibility considerations - Use semantic HTML and ARIA attributes

## Form Builder Best Practices
1. Use `redirectRelationships` for confirmation page redirection[4]
2. Implement `beforeEmail` hook for custom email templates[4]
3. Set `defaultToEmail` for fallback submission addresses[4]
4. Use `formOverrides` to customize form collection behavior[4]
5. Add reCAPTCHA for spam protection[3]

## Files to Create
- `best_practices.md` - Form handling best practices
- `common_patterns.md` - Reusable form components
- `troubleshooting.md` - Common form issues
- `integration_guides.md` - Integration with Payload and Tanstack
