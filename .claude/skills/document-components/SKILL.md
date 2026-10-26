---
name: document-components
description: Document the components, directives, services and other parts in the docs/ folder. Use it after a new or modified part, or when docs/ is out of date.
---

# Documenting the parts

The documentation lives in the `docs/` folder, in English, and is made from the **code**: you do not write down anything you have not read from the source.

## Where it goes

| Part                                           | File                          |
| ---------------------------------------------- | ----------------------------- |
| `src/app/pages/`                               | `docs/components/pages.md`    |
| `src/app/sections/` (and their sub-components) | `docs/components/sections.md` |
| `src/app/shared/`                              | `docs/components/shared.md`   |
| `src/app/core/` (services, guards, helpers)    | `docs/components/core.md`     |
| `src/app/cv/`                                  | `docs/components/cv.md`       |
| Structure, routes, data flow                   | `docs/architecture.md`        |
| Commands, testing, CI, deployment              | `docs/development.md`         |
| Content and data model                         | `docs/content.md`             |

For a new folder or topic, add it to the table of contents of `docs/README.md` too.

## The entry of one part

Every component, directive and service gets a `###` heading with its selector or name, in this structure:

1. **One sentence on what it does** (one responsibility; if it does not fit one sentence, say so).
2. **Inputs** (`input()`) and outputs, if any: name, type, default, meaning. In a table.
3. **Usage**: a short code example with the selector, if not trivial.
4. **Behaviour and exceptions**: what is not visible from the name (for example hydration, reduced motion, keyboard handling, which service it uses).
5. **Tests**: which `.spec.ts` covers it, and what it checks in short.

## Workflow

1. Look at what changed (`git diff --name-only`), and read the affected `.ts`, `.html` and `.spec.ts` files.
2. Update or add the entry; delete the outdated one. The order of the entries is the alphabetical order of the folder.
3. Check that every component in the folder has an entry, and that no entry refers to a non-existent file or input.
4. If the structure (route, data flow, command) changed, update `architecture.md` and `development.md` too.

## Rules

- Write in English (the site texts in the content files are the only Hungarian text in the repository), in short sentences, in flowing text rather than bullet lists where you explain.
- Mark code, commands and file names in `code format`.
- Do not paste the source code; the documentation says what is not immediately visible from the code.
- Do not invent a property: read what is not certain from the code or leave it out.
- The documentation contains no personal data (phone number, date of birth, address).
