
#!/bin/bash

# Description: This script renames API routes to simplify the path structure

echo "Starting API route path simplification..."

# Rename the top-level public API route
echo "Moving src/app/api/v1/my-route/* to src/app/my-route/*"
mv -v src/app/api/v1/my-route src/app/my-route || echo "Failed to rename public API route"

# Process PayloadCMS v1 routes under authentication layer
echo "Renaming Payload authentication routes"
# Batch rename auth actions
for ROUTE in $(ls -1 src/app/(payload)/api/auth/); do
    case $ROUTE in
        login|logout|refresh-token|password-reset|password-reset-request)
            mkdir -p $(dirname "src/app/auth-$ROUTE")
            mv -v "src/app/(payload)/api/auth/$ROUTE/route.ts" "src/app/auth-$ROUTE/route.ts"
        ;;
    esac
done

echo "Moving API media handler"
mv -v "src/app/(payload)/api/media" "src/app/media"

# Handle special cases
# 1. User profile -> /api/{user} path
mv -v src/app/(payload)/api/users/me src/app/users

# 2. Payload catch-all route -> /api/payload/
#   Update v1 reference during rename
newPath="src/app/payload/"$(basename "$(dirname "src/app/(payload)/api/v1/[...slug]")")
echo "Moving Payload CMS [...slug] route to: $newPath"
mkdir -p $(dirname "$newPath")
mv -v "src/app/(payload)/api/v1/[...slug]/route.ts" "$newPath/route.ts" 

# Final checks
echo "Validating new routes exist..."
if ! [ -e "src/app/my-route/route.ts" ]; then 
  echo "ERROR: Route moved failed for public v1 API route"
  exit 1
fi
if ! [ -e "src/app/auth-login/route.ts" ]; then 
  echo "ERROR: Login route missing after rename"
  exit 1
fi
# ...add other verification checks

echo "API path simplification complete!"

