#!/bin/sh
# Stop: if the source changed, the production build must be clean.
cd "$CLAUDE_PROJECT_DIR" || exit 0
if [ -n "$(git status --porcelain src 2>/dev/null)" ]; then
  out=$(npm run build --silent 2>&1) || { echo "ng build failed:" >&2; echo "$out" | tail -25 >&2; exit 2; }
  out=$(npm test --silent -- --watch=false 2>&1) || { echo "The tests failed:" >&2; echo "$out" | tail -40 >&2; exit 2; }
fi
exit 0
