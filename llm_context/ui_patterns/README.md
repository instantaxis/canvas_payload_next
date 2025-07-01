# Shadcn UI Patterns

## Component Consistency
- [x] Theme configuration and customization - Use CSS variables and theme editors[3]
- [x] Component composition strategies - Build reusable components with Payload's UI library[1][2][4]
- [x] Color palette and design tokens - Implement with CSS variables and design systems[3]
- [x] Typography scale and usage - Use consistent type scales with CSS variables[3]
- [x] Spacing and layout patterns - Implement with Payload's Gutter component[3]

## Custom Component Development
1. **Modal Implementation** [1]
```typescript
import { Modal } from 'payload/components';
import { Button } from 'payload/components/elements';

const CustomModal = () => (
  <Modal header="Custom Modal" size="large">
    <div className="content">
      <p>Modal content here</p>
      <div className="delete-document__actions">
        <Button buttonStyle="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </div>
  </Modal>
);
```
2. **Dashboard Customization** [3]
```typescript
import { Gutter } from 'payload/components/layout';
import { Header } from 'payload/components';

const CustomDashboard = () => (
  <Gutter>
    <Header title="Custom Dashboard" />
    <div className="dashboard-content">
      {/* Dashboard components */}
    </div>
  </Gutter>
);
```
3. **Field Component Overrides** [4]
```typescript
const customField = {
  name: 'customSelect',
  type: 'text',
  admin: {
    components: {
      Field: CustomSelectField,
      Cell: CustomSelectCell,
      Filter: CustomSelectFilter
    }
  }
};
```

## Accessibility
- [x] ARIA label strategies - Implement with Payload's accessibility utilities[5]
- [x] Keyboard navigation - Ensure tab navigation and focus management[5]
- [x] Screen reader compatibility - Use semantic HTML and ARIA attributes[5]
- [x] Color contrast compliance - Meet WCAG 2.1 AA standards[5]
- [x] Focus management - Implement focus traps for modals[1][5]

## Integration
- [x] Tailwind CSS configuration - Extend with custom themes[3]
- [x] Custom component creation - Use Payload's component API[2][4]
- [x] Theme switching implementation - Implement with CSS variables and context[3]
- [x] Animation and transition patterns - Use Framer Motion for complex animations[3]

## Best Practices
1. Use Payload's built-in components for consistency[1][2]
2. Extend rather than replace core components[4]
3. Implement responsive design with breakpoints[3]
4. Use CSS variables for theming[3]
5. Follow Payload's component composition patterns[2][4]

## Files to Create
- `best_practices.md` - UI consistency guidelines
- `common_patterns.md` - Reusable component patterns
- `troubleshooting.md` - Common UI issues
- `integration_guides.md` - Integration with other libraries
