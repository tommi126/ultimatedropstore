#!/bin/bash
# vercel-setup.sh - helper to set environment variables in Vercel via Vercel CLI.
# Usage: install vercel CLI (npm i -g vercel), login: vercel login, then run:
# ./vercel-setup.sh <VERCEL_PROJECT_NAME>
if [ -z "$1" ]; then
  echo "Usage: ./vercel-setup.sh <VERCEL_PROJECT_NAME>"
  exit 1
fi
PROJECT=$1
echo "Setting Vercel environment variables for project: $PROJECT"
vercel env add DATABASE_URL production <<< "$(cat .env.production | sed -n '1p')"
# Note: for sensitive multi-line or many vars, prefer: vercel env add KEY production --value "value"
echo "Done. Please run vercel env add manually for each variable from .env.production or adapt this script."
