
```
# LLM-Friendly Scripting Prompt for TypeScript Error Resolution in Payload CMS 3.0

# This script provides guidance for resolving common TypeScript compilation errors
# in Payload CMS 3.0 projects, specifically related to import paths and
# missing type annotations for Payload-specific functions.

# --- INPUT PARAMETERS ---
# @param {string} error_type - The type of TypeScript error encountered (e.g., "import_path", "missing_type_annotation").
# @param {string} file_path - The path to the file where the error is occurring.
# @param {string} [code_snippet] - An optional code snippet related to the error for more specific analysis.
# @param {string} [function_type] - For "missing_type_annotation" errors, specify the type of Payload function (e.g., "access_control", "hook", "condition").

# --- SCRIPT LOGIC ---

# 1. Handle Import Path Errors
IF error_type == "import_path":
    PRINT "## Resolving Import Path Errors in Payload CMS 3.0"
    PRINT "Payload CMS 3.0 has consolidated many core types and utilities directly under the 'payload' package."
    PRINT "You should update your imports from 'payload/types' to 'payload'."
    PRINT ""
    PRINT "### Incorrect Import (Payload 2.x style):"
    PRINT "```typescript"
    PRINT "import { CollectionConfig } from 'payload/types';"
    PRINT "import { Field } from 'payload/types';"
    PRINT "```"
    PRINT ""
    PRINT "### Correct Import (Payload 3.0 style):"
    PRINT "```typescript"
    PRINT "import { CollectionConfig, Field, Access, PayloadRequest, BeforeChangeHook, AfterChangeHook, CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload';"
    PRINT "```"
    PRINT ""
    PRINT "ACTION: In file '" + file_path + "', replace imports from 'payload/types' with direct imports from 'payload'."

# 2. Handle Missing Type Annotation Errors
ELSE IF error_type == "missing_type_annotation":
    PRINT "## Resolving Missing Type Annotations in Payload CMS 3.0"
    PRINT "Payload CMS functions require specific type annotations for their parameters to ensure type safety and prevent errors."
    PRINT ""

    IF function_type == "access_control":
        PRINT "### Access Control Functions"
        PRINT "Access control functions (e.g., `access.read`, `access.create`) receive an object with `req` (PayloadRequest), `doc`, `id`, and `collection`."
        PRINT "You should also ensure your `PayloadRequest` interface is extended to include your custom `User` type."
        PRINT ""
        PRINT "### Correct Typing for Access Control:"
        PRINT "```typescript"
        PRINT "import { Access, PayloadRequest } from 'payload';"
        PRINT "import { User } from '../payload-types'; // Adjust path to your User type"
        PRINT ""
        PRINT "export const isAdmin: Access<any, User> = ({ req }) => {"
        PRINT "  return req.user?.role === 'admin';"
        PRINT "};"
        PRINT ""
        PRINT "export const isAdminOrSelf: Access<any, User> = ({ req, id, doc }) => {"
        PRINT "  if (req.user?.role === 'admin') { return true; }"
        PRINT "  if (req.user && id === req.user.id) { return true; }"
        PRINT "  if (req.user && doc && doc.owner === req.user.id) { return true; }"
        PRINT "  return false;"
        PRINT "};"
        PRINT "```"
        PRINT ""
        PRINT "ACTION: In file '" + file_path + "', apply the correct type annotations for your access control functions. Ensure your `PayloadRequest` is extended with your `User` type."

    ELSE IF function_type == "hook":
        PRINT "### Hooks (e.g., `beforeChange`, `afterChange`)"
        PRINT "Hooks receive specific parameters depending on their type (e.g., `CollectionBeforeChangeHook`, `CollectionAfterChangeHook`)."
        PRINT ""
        PRINT "### Correct Typing for `beforeChange` Hook:"
        PRINT "```typescript"
        PRINT "import { CollectionBeforeChangeHook, PayloadRequest } from 'payload';"
        PRINT "import { Product } from '../payload-types'; // Adjust path to your data type"
        PRINT ""
        PRINT "export const setProductOwner: CollectionBeforeChangeHook<Product> = async ({"
        PRINT "  data, req, operation, originalDoc,"
        PRINT "}) => {"
        PRINT "  if (operation === 'create' && req.user) {"
        PRINT "    return { ...data, owner: req.user.id };"
        PRINT "  }"
        PRINT "  return data;"
        PRINT "};"
        PRINT "```"
        PRINT ""
        PRINT "### Correct Typing for `afterChange` Hook:"
        PRINT "```typescript"
        PRINT "import { CollectionAfterChangeHook, PayloadRequest } from 'payload';"
        PRINT "import { Order } from '../payload-types'; // Adjust path to your data type"
        PRINT ""
        PRINT "export const sendOrderConfirmation: CollectionAfterChangeHook<Order> = async ({"
        PRINT "  doc, req, operation,"
        PRINT "}) => {"
        PRINT "  if (operation === 'create') {"
        PRINT "    console.log(`Order ${doc.id} created.`);"
        PRINT "  }"
        PRINT "  return doc;"
        PRINT "};"
        PRINT "```"
        PRINT ""
        PRINT "ACTION: In file '" + file_path + "', apply the correct type annotations for your hook functions based on their type and parameters."

    ELSE IF function_type == "condition":
        PRINT "### Condition Functions (e.g., `fields[].admin.condition`)"
        PRINT "Condition functions typically receive `data` (the entire document data) and `siblingData` (data of fields at the same level)."
        PRINT ""
        PRINT "### Correct Typing for Condition Functions:"
        PRINT "```typescript"
        PRINT "import { Field } from 'payload';"
        PRINT "import { Product } from '../payload-types'; // Adjust path to your data type"
        PRINT ""
        PRINT "const drinkSizeField: Field = {"
        PRINT "  name: 'drinkSize',"
        PRINT "  type: 'select',"
        PRINT "  options: ['small', 'medium', 'large'],"
        PRINT "  admin: {"
        PRINT "    condition: (data: Product, siblingData: any) => {"
        PRINT "      return data.productType === 'drink';"
        PRINT "    },"
        PRINT "  },"
        PRINT "};"
        PRINT "```"
        PRINT ""
        PRINT "ACTION: In file '" + file_path + "', apply the correct type annotations for your field condition functions."

    ELSE:
        PRINT "## Missing Type Annotations"
        PRINT "Please specify the 'function_type' parameter (e.g., 'access_control', 'hook', 'condition') for more specific guidance on type annotations."
        PRINT "In general, ensure all function parameters in Payload-related functions are explicitly typed."
        PRINT "Refer to the Payload CMS 3.0 documentation for specific function signatures."

ELSE:
    PRINT "## Unknown Error Type"
    PRINT "Please specify a valid 'error_type' parameter (e.g., 'import_path', 'missing_type_annotation') for targeted assistance."

# --- END SCRIPT ---
```
