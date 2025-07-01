# Payload 3 CMS Documentation

## Core Concepts
- **Data Modeling**: Collections define data structures (e.g., `Users`, `Media`)
- **Lexical Editor**: Rich text editor with block-based content
- **Authentication**: Built-in user auth with access control
- **REST & GraphQL**: Dual API endpoints

## Best Practices
```typescript
// Example collection configuration
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: true,
  fields: [{ name: 'alt', type: 'text', required: true }]
}
```

## Data Loading Patterns
```typescript
// Next.js data fetching with Tanstack Query
import { useQuery } from '@tanstack/react-query';

const fetchMedia = async () => {
  const res = await fetch('/api/media');
  return res.json();
};

function MediaGallery() {
  const { data } = useQuery({ queryKey: ['media'], queryFn: fetchMedia });
  // Render media items
}