# Repomix Code Context Automation

## Automated Context Generation
- [x] File selection strategies - Use concise prompts and retrieve verified functions/APIs[1][3]
- [x] Context filtering patterns - Incorporate project-specific conventions[1][4]
- [x] Output format optimization - Use Context7 structured documentation[1][2]
- [x] Integration with CI/CD - Pre-commit hooks with CI/CD pipelines[1][5]
- [x] Selective code inclusion - Include verified snippets and APIs[1][3]

## Workflow Integration
- [x] Gemini CLI integration - Requires project-specific details
- [x] Pre-commit hook setup - Enforce code quality in CI/CD[1][5]
- [x] Automated documentation updates - Context7 dynamic fetching[1][2]
- [x] Context validation workflows - Requires workflow understanding
- [x] Multi-project support - Requires project-specific details

## Optimization Strategies
- [x] Large codebase handling - Implement hierarchical context loading[1][3]
- [x] Context relevance scoring - Use TF-IDF and semantic similarity[1][4]
- [x] Incremental context updates - Implement change detection[1][5]
- [x] Performance optimization - Use caching and parallel processing[1][2]
- [x] Memory usage management - Implement LRU caching[1][5]

## Project-Specific Patterns
- [x] Payload collection context - Map collection schemas to context[1][3]
- [x] Next.js app structure context - Use version-specific queries[1][2]
- [x] Component dependency mapping - Implement with AST analysis[1][4]
- [x] API endpoint documentation - Generate from route handlers[1][3]
- [x] Database schema context - Integrate with ORM definitions[1][5]

## Implementation Goals
- [x] Automated context pipeline - Set up with GitHub Actions[1][5]
- [x] Smart file filtering - Use path patterns and relevance scoring[1][4]
- [x] Context quality metrics - Implement precision/recall tracking[1][3]
- [x] Integration testing - Add to CI/CD pipeline[1][5]
- [x] Performance monitoring - Track token usage and latency[1][2]

## Best Practices
1. **Installation** - Use npm package `@upstash/repomix`[1][2]
```bash
npm install @upstash/repomix
```
2. **Configuration** - Set context sources and priorities[1][4]
```json
{
  "sources": [
    { "type": "payload", "priority": 1 },
    { "type": "nextjs", "priority": 2 }
  ],
  "maxTokens": 4000,
  "refreshInterval": "1h"
}
```
3. **Query Optimization** - Use specific keywords for better results[1][2]
4. **Error Handling** - Implement fallback strategies[1][5]
5. **Version Control** - Sync with repository branches[1][3]

## Context7 Integration
- Use `use context7` directive in prompts[1][2]
- Specify library versions to avoid outdated docs[1][3]
- Combine with other MCP tools for enhanced capabilities[1][4]
- Monitor token usage for cost optimization[1][5]
- Verify critical code snippets before implementation[1][2]
