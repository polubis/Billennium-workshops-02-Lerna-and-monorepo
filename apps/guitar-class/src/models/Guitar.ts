import { Sound } from "./Sound";

export interface GuitarSound {
  name: Sound;
  fret: number;
}

export interface GuitarString {
  id: number;
  sounds: GuitarSound[];
}
