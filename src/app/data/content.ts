import { contentEn as rawContentEn } from './content.en';
import { contentHu as rawContentHu } from './content.hu';
import { withExperience } from './experience';
import { Content, Lang } from './models';

/** The content at load time: the years of experience (`{javaYears}`, `{aiYears}`) already calculated. */
export const contentHu: Content = withExperience(rawContentHu);
export const contentEn: Content = withExperience(rawContentEn);

/** The whole content per language. */
export const CONTENTS: Record<Lang, Content> = { hu: contentHu, en: contentEn };
export const LANGS = Object.keys(CONTENTS) as Lang[];
