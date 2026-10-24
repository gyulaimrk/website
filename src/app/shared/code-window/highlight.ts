import { CodeLanguage } from '../../data/models';

export type TokenKind =
  | 'plain'
  | 'keyword'
  | 'type'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'heading'
  | 'bullet'
  | 'code';

export interface Token {
  text: string;
  kind: TokenKind;
}

const KOTLIN_KEYWORDS = new Set([
  'val',
  'var',
  'fun',
  'class',
  'object',
  'interface',
  'if',
  'else',
  'when',
  'for',
  'while',
  'return',
  'private',
  'public',
  'internal',
  'override',
  'data',
  'true',
  'false',
  'null',
  'import',
  'package',
  'in',
  'is',
  'as',
]);

/** Egy kódsort tokenekre bont: a megjegyzés, a karakterlánc, a szám, a kulcsszó és a típus külön színt kap. */
function kotlinLine(line: string): Token[] {
  const tokens: Token[] = [];
  const pattern =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*"|`[^`]*`)|(@\w+)|(\b\d[\d_.]*\b)|([A-Za-z_]\w*)(\s*\()?|(\s+|.)/g;
  for (const match of line.matchAll(pattern)) {
    const [text, comment, string, annotation, number, word, call] = match;
    if (comment) tokens.push({ text: comment, kind: 'comment' });
    else if (string) tokens.push({ text: string, kind: 'string' });
    else if (annotation) tokens.push({ text: annotation, kind: 'type' });
    else if (number) tokens.push({ text: number, kind: 'number' });
    else if (word) {
      if (KOTLIN_KEYWORDS.has(word)) tokens.push({ text: word, kind: 'keyword' });
      else if (/^[A-Z]/.test(word)) tokens.push({ text: word, kind: 'type' });
      else if (call) tokens.push({ text: word, kind: 'function' });
      else tokens.push({ text: word, kind: 'plain' });
      if (call) tokens.push({ text: call, kind: 'plain' });
    } else tokens.push({ text, kind: 'plain' });
  }
  return tokens;
}

/** Markdown-sor: cím, felsorolásjel és `kód` részek külön színt kapnak. */
function markdownLine(line: string): Token[] {
  if (/^#{1,6}\s/.test(line)) return [{ text: line, kind: 'heading' }];
  const tokens: Token[] = [];
  const bullet = line.match(/^(\s*[-*]\s)(.*)$/);
  if (bullet) tokens.push({ text: bullet[1], kind: 'bullet' });
  const rest = bullet ? bullet[2] : line;
  for (const part of rest.split(/(`[^`]+`)/)) {
    if (part) tokens.push({ text: part, kind: part.startsWith('`') ? 'code' : 'plain' });
  }
  return tokens;
}

/** A kódot soronként tokenekre bontja; az üres sor üres tokenlista. */
export function highlight(code: string, language: CodeLanguage): Token[][] {
  const line = language === 'kotlin' ? kotlinLine : markdownLine;
  return code.split('\n').map((text) => (text === '' ? [] : line(text)));
}
