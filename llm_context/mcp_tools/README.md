# MCP Tools Integration

## Core MCP Tools
- [x] Context7 documentation retrieval patterns - Implement with selective subscriptions[1]
- [x] Taskmaster project management integration - Use Zustand for task state management[1][3]
- [x] Puppeteer browser automation workflows - Combine with Zustand for UI state[1][5]
- [x] Supabase database operations - Implement with computed state patterns[1]
- [x] Brave Search API integration - Use middleware for rate limiting[5]

## Development Workflow Tools
- [x] Magic-UI component generation - Implement with Zustand store slices[1]
- [x] Gemini CLI context optimization - Use computed state for derived values[1]
- [x] Repomix code context generation - Implement with selective store loading[1]
- [x] Browser tools for debugging - Use devtools middleware for state inspection[2][5]
- [x] Directus CMS integration - Model as events rather than setters[3]

## Automation Patterns
- [x] CI/CD integration with MCP tools - Implement with async actions[4]
- [x] Automated testing workflows - Use mock store creation for tests[5]
- [x] Code generation pipelines - Implement with event-based actions[3]
- [x] Documentation generation - Use computed state for dynamic docs[1]
- [x] Performance monitoring - Implement with middleware logging[2][5]

## Integration Strategies
- [x] Tool chaining patterns - Use Zustand for cross-tool state[1]
- [x] Error handling across tools - Implement with async action patterns[4]
- [x] Authentication management - Use Payload's auth flow with Zustand[3]
- [x] Rate limiting strategies - Implement with middleware[5]
- [x] Caching mechanisms - Use persist middleware with TTL[2]

## Zustand Best Practices for MCP
1. **Store Organization** - Create separate stores for distinct concerns[1]
2. **Selective Subscriptions** - Subscribe only to needed state slices[1]
3. **Computed State** - Derive values rather than recomputing[1]
4. **Middleware Caution** - Align with application requirements[1]
5. **Event Modeling** - Model actions as events, not setters[3]

```typescript
// MCP tool integration example
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useMCPStore = create(
  devtools(
    persist(
      (set) => ({
        tools: [],
        addTool: (tool) => set((state) => ({ tools: [...state.tools, tool] })),
        removeTool: (id) => set((state) => ({ 
          tools: state.tools.filter(t => t.id !== id) 
        })),
      }),
      { name: 'mcp-tools-store' }
    )
  )
);
```

## Files to Create
- `context7_advanced.md` - Advanced Context7 usage patterns
- `taskmaster_workflows.md` - Project management workflows
- `gemini_cli_optimization.md` - Context window optimization
- `repomix_automation.md` - Code context automation
- `tool_integration_patterns.md` - Cross-tool integration