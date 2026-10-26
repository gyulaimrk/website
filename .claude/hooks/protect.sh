#!/bin/sh
# PreToolUse: blocks manual editing of generated or sensitive files.
f=$(sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
case "$f" in
  */package-lock.json|*/.env|*/.env.*|*/dist/*)
    echo "Forbidden: $f is a generated or sensitive file, do not edit it by hand (npm install / build handles it)." >&2
    exit 2 ;;
esac
exit 0
