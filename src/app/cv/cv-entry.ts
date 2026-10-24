import { CONTENTS } from '../data/content';
import { Lang } from '../data/models';
import { CvAssets, renderCv } from './render-cv';

/** A `scripts/build-cv.mjs` belépési pontja: nyelvenként az önéletrajz HTML-je és a PDF fájlneve. */
export function renderAllCv(assets: CvAssets): Record<Lang, { html: string; fileName: string }> {
  const entry = (lang: Lang) => ({
    html: renderCv(lang, CONTENTS[lang], assets),
    fileName: CONTENTS[lang].profile.cv.split('/').pop() as string,
  });
  return { hu: entry('hu'), en: entry('en') };
}
