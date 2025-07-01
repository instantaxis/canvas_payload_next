# Tanstack Query & Tables

## Table Implementation
- [x] Column definitions for Payload collections - Use type-safe column definitions
```typescript
const columns: ColumnDef<Collection>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' }
]
```
- [x] Sorting and filtering integration - Implement server-side sorting
- [x] Row selection patterns - Use `rowSelection` state
- [x] Custom cell renderers - Create reusable cell components
- [x] Export functionality - Implement CSV/Excel export

## Integration Points
- [x] Zustand state management integration - Sync table state with Zustand
- [x] Form submission with query invalidation - Invalidate queries on submit
- [x] Real-time updates with WebSocket/SSE - Use `useQuery` with WebSockets
- [x] Performance optimization strategies - Virtualize large tables

## Best Practices
1. Use `keepPreviousData` for smooth pagination transitions
2. Implement skeleton loaders for better UX
3. Use column visibility controls for responsive tables
4. Add global filtering with debouncing
5. Implement server-side pagination for large datasets
