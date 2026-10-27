# Content

Every text of the site is in two files: `src/app/data/content.hu.ts` and `content.en.ts`. The types are in
`src/app/data/models.ts`, and `content.ts` exposes the two contents by language under the name `CONTENTS`.

## Data model

| Type          | What it describes                                                                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Profile`     | name, role, contact details, photo, introduction, languages, driving licence, résumé path, the `roleConstants` used in the hero code window (the values of the `Role` enum) |
| `Job`         | employer: company, role, period, description, projects (`JobProject`), and optionally tools that characterise the employer (`tech`, for example Plane at Adroit)            |
| `JobProject`  | name, subtitle (`subtitle`), link, short text, concrete tasks (`points`) and the technologies and tools used on the project (`tech`)                                        |
| `Skill`       | skills card: title, tag, paragraphs (`paragraphs`), optional chips (`chips`), highlight                                                                                     |
| `SideProject` | side project: description in paragraphs (`paragraphs`), live address, source code, technologies                                                                             |
| `Study`       | study or certificate: title, issuer, period, description, public link (`url`)                                                                                               |
| `CodeFile`    | one file of the code window: name, language, content                                                                                                                        |
| `AiWorkflow`  | the points of the “How I work with AI” section and the CLAUDE.md excerpt                                                                                                    |
| `Ui`          | all the UI texts: menu, buttons, section headings, labels                                                                                                                   |

## Rules

- **Language of the repository:** the site texts are the only Hungarian text. Everything around them (code, comments, test names, docs, skills, scripts, commit messages) is English.
- **Bilingual:** every change is made in both files, with an identical structure. `content.spec.ts`
  reports if the structure of the two languages differs.
- **Only real data:** the résumé, LinkedIn and what the owner says are the source. Nothing may be invented, and for missing
  data you ask. A phone number, date of birth and home address must not appear on the site.
- **No text in components:** the components read from the `ContentService`.
- **Project count:** the number in the statistics equals the number of distinct projects listed under the employers
  (a project listed under several roles counts once); `content.spec.ts` guards this too.
- **Links, email, numbers and technology names** are the same in both languages.
- **Certificate link:** only a real address given by the owner may go into the `Study.url` field.

## After a change

1. `npm test -- --watch=false` and `npm run build`.
2. `npm run cv`, and commit the `public/cv/` files too, because the résumé is built from the content.
3. For a visible feature, `npm run e2e`.

## The years of experience

Numbers such as “more than 5 years” and “3+” are not typed in: the content has the placeholders `{javaYears}` and `{aiYears}`
(`{javaYears}+` in the statistics). `data/experience.ts` calculates the full years from the start months (`EXPERIENCE_START`), and
`data/content.ts` substitutes them at load time, so the browser always shows the current number. The prerendered HTML
reflects the build time, so `ci.yml` rebuilds and deploys monthly. For a new start date, change
`EXPERIENCE_START`.
