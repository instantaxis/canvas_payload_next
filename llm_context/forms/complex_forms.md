# Complex Forms: Advanced Composition Patterns

This guide covers patterns for building multi-step, dynamic, and state-driven forms using React Hook Form, Zod, and Zustand.

## 1. Multi-Step (Wizard) Forms

- **Step Schema Isolation**
  - Define a separate Zod schema per step.
  - Merge schemas at submission:  
    ```ts
    const step1Schema = z.object({ name: z.string().min(1) });
    const step2Schema = z.object({ address: z.string().min(1) });
    const fullSchema = step1Schema.merge(step2Schema);
    ```
- **FormProvider & useFormContext**
  - Wrap steps in `<FormProvider {...methods}>`.
  - Inside each step component, use `useFormContext()` to register fields.
- **Navigation & Validation**
  - On “Next”, call `trigger(stepFields)` to validate only current step.
  - Store `currentStep` in local component state or Zustand.

## 2. Dynamic Field Arrays

- **useFieldArray**
  - Use React Hook Form’s `useFieldArray` for repeating sections.
  - Example:
    ```tsx
    const { fields, append, remove } = useFieldArray({ name: "items" });
    ```
- **Nested Arrays**
  - Combine with step forms: manage separate arrays per step.
  - Ensure unique keys: use `id` from `fields`.

## 3. Conditional & Dependent Fields

- **watch & conditional render**
  - Use `watch("type")` to conditionally render and register fields.
  - Unregister fields when hidden:  
    ```ts
    useEffect(() => {
      if (type !== "other") unregister("otherText");
    }, [type]);
    ```
- **Zod refinements**
  - Enforce cross-field conditions:  
    ```ts
    z.object({ a: z.string(), b: z.string() })
      .refine(data => data.a !== data.b, { message: "A and B must differ" });
    ```

## 4. Persisted Form State (Zustand)

- **Create store slice**
  ```ts
  const useFormStore = create(persist((set) => ({
    data: {},
    setData: (partial) => set(state => ({ data: { ...state.data, ...partial } })),
  })));
  ```
- **Sync with RHF**
  - On step submit: `useFormStore.getState().setData(getValues())`.
  - On mount: `reset(useFormStore.getState().data)` to restore values.

## 5. Async Field-Level Validation

- **Debounced checks**
  - Use `watch` + `useDebounce` hook.
  - In `useEffect`, call server validation and `setError` or `clearErrors`.
- **Resolver with Zod + async**
  - Zod supports async refinements for unique-value checks.

## 6. File Uploads & Previews

- **react-dropzone + RHF**
  - Wrap `<input type="file" {...register("files")} />`.
  - Show previews: read `watch("files")`.
- **Upload Hooks**
  - Use Payload upload hooks or direct S3 upload in `onSubmit`.
  - Show progress with `onUploadProgress`.

## 7. Accessibility & UX

- **ARIA Roles**
  - Use `aria-invalid={!!errors.field}` and `<span role="alert">` for error messages.
- **Keyboard Navigation**
  - Ensure step controls (`Next`, `Back`) are focusable.
- **Progress Indicators**
  - Render a progress bar/update on each step.

## 8. Testing Complex Forms

- **Vitest + React Testing Library**
  - Use `renderHook` for store slice.
  - Simulate user flows: `userEvent.type`, `userEvent.click`.
- **Playwright E2E**
  - Cover multi-step navigation, validation errors, and final submission.

---

**Centralize** these patterns in your feature code by importing from this guide and reusing across form modules.
