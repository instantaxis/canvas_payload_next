# Zustand State Management

## Store Patterns
- [x] Store structure and organization - Split stores into slices for separate concerns
- [x] Action patterns and naming conventions - Use `set` for simple updates and actions for complex logic
- [x] State normalization strategies - Normalize nested data using entities pattern
- [x] Middleware integration - Implement `persist` and `devtools` middleware
```typescript
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      { name: 'count-store' }
    )
  )
);
```
- [x] TypeScript integration - Define strict types for state and actions

## Integration Patterns
- [x] Tanstack Query integration - Use Zustand for UI state and Tanstack for server state
- [x] Form state synchronization - Sync form state with Zustand using `useEffect`
- [x] Authentication state management - Implement with Payload's auth flow[3]
```typescript
// Auth state example
const useAuthStore = create((set) => ({
  user: null,
  login: async (credentials) => {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
    set({ user: await res.json() });
  },
  logout: () => set({ user: null })
}));
```
- [x] UI state (modals, notifications) - Manage with dedicated Zustand slices
- [x] Real-time data updates - Combine with WebSockets for live updates

## Performance Optimization
- [x] Selector patterns - Use `shallow` for object comparisons
- [x] Store slicing - Create independent slices for performance
- [x] Subscription patterns - Use `subscribe` for external updates
- [x] Memory leak prevention - Add cleanup functions to effects
- [x] State persistence - Implement with `persist` middleware

## Testing Strategies
- [x] Store testing patterns - Test actions and state transitions
- [x] Mock store creation - Use `create` to mock store instances
- [x] Integration testing with React - Test components with store
- [x] State mutation testing - Verify immutability patterns
- [x] Async action testing - Mock API calls in tests

## Payload CMS Integration
1. **Version History** - Use Payload's versioning system for state snapshots[1]
2. **Draft Management** - Implement draft states with Payload's draft mode[1]
3. **Admin Hooks** - Use `useRouteTransition` for UI feedback[4]
4. **Form State** - Integrate with Payload's Form Builder[2]

## Files to Create
- `best_practices.md` - Zustand best practices
- `common_patterns.md` - Reusable store patterns
- `troubleshooting.md` - Common state management issues
- `integration_guides.md` - Integration with other libraries
