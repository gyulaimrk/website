# Shared building blocks (`src/app/shared/`)

Reusable elements independent of the content. The visible text is given by the caller or the `ContentService`.

### `a[appAnchor]` (`AnchorLink`)

An in-page jump. Because of `<base href="/">` a plain `#id` link does not work, so use this for every internal jump.
The `href` is the real address of the language (`/hu#id`), so it leads to the right page even without scripting.

| Input       | Type     | Meaning                                             |
| ----------- | -------- | --------------------------------------------------- |
| `appAnchor` | `string` | required; the id of the target element, without `#` |

```html
<a appAnchor="tapasztalat">Experience</a>
```

On click it scrolls to the target (a plain jump if the visitor asked for reduced motion), and moves focus there too if the
target has a `tabindex`.

### `app-back-to-top` (`BackToTop`)

A floating button that appears when scrolled further down the page, and leads to the top (with `appAnchor`). While hidden it is `visibility: hidden` and `aria-hidden`, so neither the screen reader nor Tab reaches it.

### `a[appButton]` (`Button`)

A button as a link.

| Input      | Type                   | Default     | Meaning                                                  |
| ---------- | ---------------------- | ----------- | -------------------------------------------------------- |
| `variant`  | `'primary' \| 'ghost'` | `'primary'` | gradient or ghost appearance                             |
| `size`     | `'normal' \| 'small'`  | `'normal'`  | size                                                     |
| `external` | `boolean`              | `false`     | opens in a new tab (`target="_blank"`, `rel="noopener"`) |

### `app-card` (`Card`)

A glass-effect card with `<ng-content>` content. The `featured` input (default `false`) gives a gradient border.

### `app-chip-list` (`ChipList`)

A row of chips (technologies). Input: `items` (`readonly string[]`, required). Its text colour is the `--accent-ink` token, which is a darker blue in the light theme for contrast.

### `app-code-window` (`CodeWindow`)

A code window with tabs and highlighting. Inputs: `files` (`readonly CodeFile[]`, required) and `idPrefix` (`string`, required): the prefix of the tab and panel ids, because a page can have several code windows (`hero-code` in the hero, `ai-code` in the AI section). The selected tab resets to the first one on a new
file list. The tabs have `tablist` semantics: the arrows step, Home and End jump to
the edges. The highlighting is done by `highlight()` (Kotlin and Markdown), split into tokens line by line. The embedding element
can replace its shadow with the `--code-window-shadow` CSS variable (the AI section gives the more restrained `--shadow-soft` token, so that
it does not spill onto the note below it).

**Tests:** `code-window.spec.ts`, `highlight.spec.ts`.

### `appCountUp` (`CountUp`)

The numbers in the text grow from 0 to the final value when the element first reaches the screen (about 1.1 s, with a decelerating
curve). Input: `appCountUp`, the final value as text (for example `5+` or `8–25`; every whole number grows separately).

```html
<strong [appCountUp]="'5+'">5+</strong>
```

The served HTML, a visitor without scripting, a visitor who asked for reduced motion and printing see the final value.
The animation writes Angular's own text node, and stops exactly at the final value. The statistics of the hero
use it.

### `app-language-toggle` (`LanguageToggle`)

A language toggle button that shows the code of the other language (`HU` or `EN`), and calls `LanguageService.toggle()`.

### `appReveal` (`Reveal`)

An entrance animation: once, when the element reaches the screen. Input: `appReveal`, the delay in steps (1 step =
80 ms, default 0, converted to a number). With reduced motion, or without `IntersectionObserver`, the element is
visible immediately.

### `app-section-heading` (`SectionHeading`)

A section heading with a short lead. Inputs: `title` (required) and `lead` (default: empty).

### `app-theme-toggle` (`ThemeToggle`)

A theme toggle button: a sun or moon icon, and the label names the next theme. It calls `ThemeService.toggle()`.

### `app-typewriter` (`Typewriter`)

Types and deletes words. Input: `words` (`readonly string[]`, required). The server and a visitor who asked for reduced motion
see the first word, without typing, so the served HTML is complete too.

**Tests:** every element has a `*.spec.ts` in its own folder.
