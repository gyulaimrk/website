import { CodeFile, Profile } from '../../data/models';

/** An instance of the `Developer` data class built from the profile, as Kotlin source (the `Main.kt` tab of the code window). */
export function developerInstance(profile: Profile): CodeFile {
  const city = profile.location.split(',')[0];
  const code = [
    'val developer = Developer(',
    `    name = "${profile.name}",`,
    '    roles = listOf(',
    ...profile.roleConstants.map((constant) => `        Role.${constant},`),
    '    ),',
    '    stack = listOf(',
    ...profile.stack.map((item) => `        "${item}",`),
    '    ),',
    '    ai = true,',
    `    location = "${city}",`,
    ')',
  ].join('\n');
  return { name: 'Main.kt', language: 'kotlin', code };
}
