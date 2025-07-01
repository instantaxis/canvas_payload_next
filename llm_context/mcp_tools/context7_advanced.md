# Context7 Advanced Usage

## Dynamic Documentation Retrieval
- [x] Library ID resolution strategies - Use enum-based approaches and dynamic schema adaptation[1][3]
- [x] Topic-focused documentation queries - Implement with targeted search parameters[1][2]
- [x] Token optimization for large docs - Use summarization and key point extraction[1][5]
- [x] Multi-library integration patterns - Implement with chained context requests[1][4]
- [x] Version-specific documentation - Specify exact package versions in requests[1][2]

```typescript
// Version-specific query example
const response = await fetch('https://context7-mcp.example.com/docs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    library: 'nextjs',
    version: '14.2.3',
    query: 'app router implementation'
  })
});
```

## Integration Patterns
- [x] Automated documentation updates - Implement webhook-based sync[1][3]
- [x] Context injection workflows - Use middleware for seamless integration[1][5]
- [x] Real-time documentation sync - Implement with SSE (Server-Sent Events)[1]
- [x] Custom library indexing - Extend with custom documentation sources[1][4]
- [x] Documentation caching strategies - Implement TTL-based caching[1][5]

## Workflow Optimization
- [x] Context window management - Use sliding window technique[3][5]
- [x] Selective documentation loading - Implement relevance scoring[1][3]
- [x] Documentation relevance scoring - Use TF-IDF and semantic similarity[1][5]
- [x] Multi-step research patterns - Chain context requests for complex queries[1][4]
- [x] Documentation validation - Implement checksum verification[1]

## Project-Specific Usage
- [x] Payload 3 documentation integration - Map collection schemas to context[1][3]
- [x] Next.js best practices retrieval - Use version-specific queries[1][2]
- [x] React patterns documentation - Implement component-focused queries[1]
- [x] TypeScript reference integration - Add type definition support[1][4]
- [x] UI library documentation - Integrate Shadcn UI references[1]

## Implementation Strategies
1. **Installation** - Use npm package `@upstash/context7`[2][5]
2. **Configuration** - Set default libraries and versions[1][4]
3. **Query Optimization** - Use specific keywords for better results[1][2]
4. **Error Handling** - Implement fallback to generic docs[1][5]
5. **Rate Limiting** - Use exponential backoff for retries[1][5]

```bash
# Installation command
npm install @upstash/context7
```

## Best Practices
- Always specify library versions to avoid outdated docs[1][2]
- Use `use context7` directive in your queries[1][3]
- Combine with other MCP tools for enhanced capabilities[1][4]
- Monitor token usage for cost optimization[1][5]
- Verify critical code snippets before implementation[1][2]
