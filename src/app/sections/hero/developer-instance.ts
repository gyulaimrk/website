import { CodeFile, Profile } from '../../data/models';

/** A `Developer` data class egy példánya a profilból, Kotlin forrásként (a kódablak `Main.kt` füle). */
export function developerInstance(profile: Profile): CodeFile {
  const city = profile.location.split(',')[0];
  const code = [
    'val developer = Developer(',
    `    name = "${profile.name}",`,
    `    role = "${profile.role}",`,
    '    stack = listOf(',
    ...profile.stack.map((item) => `        "${item}",`),
    '    ),',
    '    ai = true,',
    `    location = "${city}",`,
    ')',
  ].join('\n');
  return { name: 'Main.kt', language: 'kotlin', code };
}
