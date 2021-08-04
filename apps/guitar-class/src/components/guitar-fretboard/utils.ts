import { Sound, SOUNDS, GuitarSound, GuitarString } from "models";
import { FretLabel, SoundTheme } from "./models";

const createSoundTheme = (color: string, background: string): SoundTheme => ({
  color,
  background,
});

export const MIN_FRETS = 1;
export const MAX_FRETS = 28;
export const FRET_LABEL_HEIGHT = 38;
export const FRET_WIDTH = 100;
export const STRING_OFFSET = 70;
export const SOUND_SIZE = 40;
export const FRET_LABELS: FretLabel[] = [
  {
    name: "OPEN",
    fret: 0,
  },
  { fret: 3 },
  { fret: 5 },
  { fret: 7 },
  { fret: 12 },
  { fret: 15 },
  { fret: 17 },
  { fret: 19 },
  { fret: 24 },
];
export const SOUNDS_THEMES: Record<Sound, SoundTheme> = {
  C: createSoundTheme("#ffffff", "#f44336"),
  "C#": createSoundTheme("#ffffff", "#e53935"),
  D: createSoundTheme("#ffffff", "#e91e63"),
  "D#": createSoundTheme("#ffffff", "#d81b60"),
  E: createSoundTheme("#ffffff", "#9c27b0"),
  F: createSoundTheme("#ffffff", "#673ab7"),
  "F#": createSoundTheme("#ffffff", "#512da8"),
  G: createSoundTheme("#ffffff", "#3f51b5"),
  "G#": createSoundTheme("#ffffff", "#303f9f"),
  A: createSoundTheme("#ffffff", "#2196f3"),
  "A#": createSoundTheme("#ffffff", "#1976d2"),
  B: createSoundTheme("#ffffff", "#009688"),
};

export const createGuitarStrings = (
  frets: number,
  tuning: Sound[]
): GuitarString[] => {
  const strings: GuitarString[] = [];

  for (let i = 0; i < tuning.length; i++) {
    const sound = tuning[i];
    let acc = SOUNDS.findIndex((currSound) => currSound === sound);
    const sounds: GuitarSound[] = [];

    for (let j = 0; j <= frets; j++) {
      sounds.push({ fret: j, name: SOUNDS[acc] });
      const nextAcc = acc + 1;
      acc = nextAcc > SOUNDS.length - 1 ? 0 : nextAcc;
    }

    strings.push({ id: i + 1, sounds });
  }

  return strings;
};
