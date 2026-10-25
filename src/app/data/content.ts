import { contentEn as rawContentEn } from './content.en';
import { contentHu as rawContentHu } from './content.hu';
import { withExperience } from './experience';
import { Content, Lang } from './models';

/** A tartalom a betöltés pillanatában: a tapasztalat éveit (`{javaYears}`, `{aiYears}`) már kiszámolva. */
export const contentHu: Content = withExperience(rawContentHu);
export const contentEn: Content = withExperience(rawContentEn);

/** Nyelvenként a teljes tartalom. */
export const CONTENTS: Record<Lang, Content> = { hu: contentHu, en: contentEn };
export const LANGS = Object.keys(CONTENTS) as Lang[];
