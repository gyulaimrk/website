import { contentEn } from './content.en';
import { contentHu } from './content.hu';
import { Content, Lang } from './models';

export { contentEn, contentHu };

/** Nyelvenként a teljes tartalom. */
export const CONTENTS: Record<Lang, Content> = { hu: contentHu, en: contentEn };
export const LANGS = Object.keys(CONTENTS) as Lang[];
