#!/bin/sh
# Stop: ha a forrás változott, az éles build hibátlan kell legyen.
cd "$CLAUDE_PROJECT_DIR" || exit 0
if [ -n "$(git status --porcelain src 2>/dev/null)" ]; then
  out=$(npm run build --silent 2>&1) || { echo "Az ng build hibás:" >&2; echo "$out" | tail -25 >&2; exit 2; }
  out=$(npm test --silent -- --watch=false 2>&1) || { echo "A tesztek hibásak:" >&2; echo "$out" | tail -40 >&2; exit 2; }
fi
exit 0
