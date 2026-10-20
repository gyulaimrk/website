# Gyulai Márk – portfólió

Angular 22 (Node.js 24 LTS) alapú, magyar nyelvű portfólió.

```bash
npm install
npm start        # fejlesztői szerver: http://localhost:4200
npm test         # egységtesztek (Vitest)
npm run build    # éles build: dist/portfolio/browser
```

A tartalom (szövegek, projektek, linkek) a `src/app/data/content.ts` fájlban szerkeszthető.
A projektek és a bemutatkozás **minta szöveg**: cseréld a saját adataidra.

## Cloudflare
Hosting: Cloudflare Workers statikus assetekkel (`wrangler.jsonc`).

```bash
npm run preview   # build + helyi Cloudflare előnézet
npm run deploy    # build + éles telepítés (előtte: npx wrangler login)
```
