
# API Route Renamed Routes List

The following routes in the Canvas Payload app were renamed to improve consistency following next-gen best practices:

**Before (double /api/api):**
- `/src/app/api/v1/my-route/route.ts`

**After (simplified):**
- `/src/app/v1/my-route/route.ts`

We executed this change for:
- **User profile APIs**: `/api/v1/users/me/route.ts` => `/api/users/me.ts`
- **Catch-all handler**: `/payload-v1-routes/[...slug]` => `/payload/[...slug]`
- **Auth operations**: `/auth/login/route.ts` => `/auth-login/route.ts` (namespaced)

Refactored imports:
- Removes internal `/api` path in Next.js handlers
- Adds top-level versioning prefix for clearer routing (all v1)

To apply these changes:
1. Run the `rename_routes.sh` script included in this commit
2. Update Next.js middleware references (some imports may need adjustment)
3. Verify route availability via `http://localhost:<port>/v1-payload-routes/<route>`

These changes produce:
1. Consistent, version-prefixed API paths 
2. Direct access to frontend and payload routes
3. Clear separation of auth-specific paths

Test affected endpoints to verify routing still functions correctly post-rename.

