#!/bin/sh
# PostToolUse: formats the modified source file with Prettier.
f=$(sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
case "$f" in
  */src/*.ts|*/src/*.scss|*/src/*.html|*/src/*.json) npx --no-install prettier --write "$f" >/dev/null 2>&1 ;;
esac
exit 0
