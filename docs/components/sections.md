# Sections (`src/app/sections/`)

A section assembles: it reads from the `ContentService` and leaves the rendering to small components. There is no text
in them. The `id` of the sections is the anchor of the menu and the scroll spy.

### `app-nav` (`Nav`)

The header and menu: brand (monogram and name), links to the sections, language and theme toggles, the “Contact” button and,
on mobile, a hamburger. The active menu item has `aria-current="true"` (based on the `ScrollSpyService`). The hamburger has an
`aria-expanded` state; Escape and any link close the menu.

**Tests:** `nav.spec.ts`: monogram, name, menu items and contact button; the brand link's name contains the visible text; marking of the active menu item; opening and closing of the mobile menu and Escape.

### `app-hero` (`Hero`)

The introduction: greeting, the name in the single `h1`, the typewriter role (`app-typewriter`), the introduction text, three
buttons (My work, résumé download, LinkedIn), statistics. The two tabs of the code window are assembled by the component: the
first is the `Main.kt` built from the profile (the default, made by the `developerInstance()` function in `developer-instance.ts`), the second is the `Developer.kt` data class (`codeSamples`).

**Tests:** `hero.spec.ts`: a single `h1`, role and statistics, the order and content of the two tabs, the links of the buttons, language switch.

### `app-about` (`About`)

The paragraphs of the introduction letter and a card with the photo and the facts (place, role, languages, driving licence, email).
The photo is lazy-loaded with a fixed size.

**Tests:** `about.spec.ts`: every paragraph and the five facts, the photo with a descriptive caption, the labels follow the language.

### `app-skills` (`Skills`)

The cards of the skills: a group label, a title and one or more paragraphs (`paragraphs`), and, if present, technology chips (`chips`, on the Testing card). The featured card (`highlight`) is wide and has a gradient border.

**Tests:** `skills.spec.ts`: a card for every skill, the featured one wider and with a border, the paragraphs and chips.

### `app-ai-workflow` (`AiWorkflow`)

“How I work with AI”: five points on cards (each with one or more paragraphs), next to them in a code window the shortened excerpt of the real `CLAUDE.md` and
a note.

**Tests:** `ai-workflow.spec.ts`: all five points paragraph by paragraph, the highlighted CLAUDE.md excerpt with the note, language switch.

### `app-experience` (`Experience`) and `app-job-card` (`JobCard`)

The timeline, with the most recent employer first. `JobCard` is the card of one employer: role, period, description,
a collapsible project list (`<details>`, with the count in the label) and technologies.

| Input     | Type      | Default  | Meaning                                                |
| --------- | --------- | -------- | ------------------------------------------------------ |
| `job`     | `Job`     | required | the employer shown                                     |
| `current` | `boolean` | `false`  | the current employer: featured card, open project list |

The project name is a link if there is a `url`; the short text and the task list (`points`) are only shown if present.

**Tests:** `experience.spec.ts` (one timeline item per employer, only the most recent featured), `job-card.spec.ts` (project list, task list, open and closed state).

### `app-side-projects` (`SideProjects`) and `app-project-card` (`ProjectCard`)

The list of the side projects. `ProjectCard` is the card of one project (`project` input, required): the description (paragraph by paragraph), technologies, and
the button of the live address (`url`) or the source code (`sourceUrl`), if there is one.

**Tests:** `side-projects.spec.ts` (a card for every side project), `project-card.spec.ts` (links opening in a new tab, only the existing ones).

### `app-education` (`Education`) and `li[appStudyItem]` (`StudyItem`)

Three cards: studies, the Anthropic certificates (featured), further certificates. Below the further certificates
there is a link to all the certificates of the LinkedIn profile. `StudyItem` is one entry.

| Input   | Type    | Meaning                                                |
| ------- | ------- | ------------------------------------------------------ |
| `study` | `Study` | required; the title becomes a link if there is a `url` |

It shows the issuer and the date on one line, and leaves out what is missing (no empty comma).

**Tests:** `education.spec.ts` (three cards, every entry once, the LinkedIn link), `study-item.spec.ts` (title as a link, leaving out empty lines, description).

### `app-contact` (`Contact`)

The contact panel: LinkedIn, résumé download (with the `download` attribute) and email buttons.

**Tests:** `contact.spec.ts`: LinkedIn, résumé download and email button; the résumé button is marked for download.

### `app-footer` (`Footer`)

The copyright line with the current year, and the LinkedIn and email links (their labels come from the content file).

**Tests:** `footer.spec.ts`: the contact details and the current year.
