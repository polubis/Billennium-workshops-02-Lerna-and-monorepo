import { GuitarString } from "models";
import { createGuitarStrings } from "../utils";

describe("createGuitarStrings", () => {
  it("creates guitar strings", () => {
    expect(createGuitarStrings(3, ["E", "B", "C"])).toEqual([
      {
        id: 1,
        sounds: [
          { fret: 0, name: "E" },
          { fret: 1, name: "F" },
          { fret: 2, name: "F#" },
          { fret: 3, name: "G" },
        ],
      },
      {
        id: 2,
        sounds: [
          { fret: 0, name: "B" },
          { fret: 1, name: "C" },
          { fret: 2, name: "C#" },
          { fret: 3, name: "D" },
        ],
      },
      {
        id: 3,
        sounds: [
          { fret: 0, name: "C" },
          { fret: 1, name: "C#" },
          { fret: 2, name: "D" },
          { fret: 3, name: "D#" },
        ],
      },
    ] as GuitarString[]);

    const B_SOUND_IDX = 7;
    expect(createGuitarStrings(12, ["E"])[0].sounds[B_SOUND_IDX]).toEqual({
      fret: 7,
      name: "B",
    });
  });
});
