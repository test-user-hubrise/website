#!/bin/bash
set -e

# Link Node modules
rm -rf node_modules && ln -s /usr/local/node_modules .

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"