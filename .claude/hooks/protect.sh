#!/bin/sh
# PreToolUse: generált/érzékeny fájlok kézi szerkesztésének tiltása.
f=$(sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
case "$f" in
  */package-lock.json|*/.env|*/.env.*|*/dist/*)
    echo "Tiltott: $f generált vagy érzékeny fájl, ne szerkeszd kézzel (npm install / build kezeli)." >&2
    exit 2 ;;
esac
exit 0
