# Repomix Integration Guide

## Overview
Repomix packages your entire repository into a single AI-friendly file. Integrating Repomix into our workflow enables:
- Feeding the full codebase to LLMs without manual concatenation  
- Automated token accounting to respect model context limits  
- Security scans for secrets and sensitive data  

## Installation

Using npx (no global install required):
```bash
cd /Users/webdev/Projects/canvas-payloadv3
npx repomix@latest
```

Or add as a dev dependency:
```bash
npm install --save-dev repomix
```

## Configuration

Create `repomix.config.json` at project root:
```json
{
  "output": "repomix-output.xml",
  "format": "xml",
  "ignore": ["node_modules/**", ".git/**"],
  "tokenCount": true,
  "detectSecrets": true
}
```

## Usage in Development

1. Run `npx repomix --config=repomix.config.json`.
2. Upload or attach `repomix-output.xml` when prompting the AI:
   > This file contains the entire repo. Please analyze architecture and suggest refactors.

## CI / Automation

Add a workflow step in `.github/workflows/ci.yml`:
```yaml
- name: Generate Repomix artifact
  run: npx repomix --config=repomix.config.json

- name: Upload AI context
  uses: actions/upload-artifact@v3
  with:
    name: repomix-artifact
    path: repomix-output.xml
```

## AI Prompt Examples

- **Initial review**  
  > "Here is the repository in one file. Identify unused code paths and suggest consolidation."

- **Refactor request**  
  > "Please update all React components to use hooks and context. Use the combined file."

- **Multi-file patch (Claude Artifacts)**  
  > "Generate updated files for API and data layer. Provide separate file contents."

## Best Practices

- Commit `repomix.config.json` to source control.  
- Exclude large binary assets via `.gitignore`.  
- Regularly regenerate after significant merges.  
- Use token counters to alert if repository size exceeds model limits.

## Further Reading

- [Official Repomix Guide](https://repomix.com/guide/)  
- [Advanced Usage & Plugins](https://repomix.com/usage)