#!/bin/sh
# Start the backend server in the background
npx tsx backend/server.ts &
# Start Nginx in the foreground
nginx -g 'daemon off;'
