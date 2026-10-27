import { CONTENTS, LANGS } from '../data/content';
import { Lang } from '../data/models';
import { CvAssets, renderCv } from './render-cv';

/** Entry point of `scripts/build-cv.mjs`: the résumé HTML and the PDF file name per language. */
export function renderAllCv(assets: CvAssets): Record<Lang, { html: string; fileName: string }> {
  const entry = (lang: Lang) => ({
    html: renderCv(lang, CONTENTS[lang], assets),
    fileName: CONTENTS[lang].profile.cv.split('/').pop() as string,
  });
  return Object.fromEntries(LANGS.map((lang) => [lang, entry(lang)])) as Record<
    Lang,
    { html: string; fileName: string }
  >;
}
