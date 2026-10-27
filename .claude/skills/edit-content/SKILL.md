---
name: edit-content
description: Edit the portfolio content (employers, projects, skills, studies, UI texts) in both Hungarian and English.
disable-model-invocation: true
---

# Editing the content

The site texts are the only Hungarian text in the repository: this skill, the code, comments, test names, documentation and commit messages are written in English.

Every text of the site lives in two files: `src/app/data/content.hu.ts` (Hungarian) and `src/app/data/content.en.ts` (English). The components read from the `ContentService`.

1. Read both files and **make the same change in both**. The structure of the two languages (keys, list lengths) must be identical; `content.spec.ts` checks this.
2. **Enter only real data.** Sources: the user's message, their résumé, their LinkedIn profile. If a fact (date, role, technology) is not known, ask; do not invent anything. Phone number, date of birth and home address must not appear on the site.
3. A project under an employer goes into the `jobs[].projects` list (name, optional `role`, `subtitle` and `url`, short description), not in as a separate employer.
4. Write the texts in natural, flowing language (first person, in Hungarian and in English too), not as bullet lists. The technology chips (`tech`) may stay short words.
5. Links, emails, numbers and technology names are the same in both languages.
6. A certificate link goes into `studies[].url`, only a real address received from the user; the same in both languages.
7. Because the résumé (PDF) is built from the content, run `npm run cv` after a change and commit the `public/cv/` files too.
8. Finally run `npm test -- --watch=false`, `npm run build` and (if the change touches a visible feature) `npm run e2e`, and report if they find errors.
