import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Menu,
  Select,
  Slider,
  Typography,
  Button,
} from "@material-ui/core";

import { GuitarString, Sound, SOUNDS } from "models";
import {
  createGuitarStrings,
  FRET_LABEL_HEIGHT,
  FRET_WIDTH,
  MAX_FRETS,
  MIN_FRETS,
  SOUNDS_THEMES,
  SOUND_SIZE,
  STRING_OFFSET,
} from "./utils";

import css from "./GuitarFretboard.scss";

export interface GuitarFretboardProps {
  frets: number;
  tuning: Sound[];
}

const getInitDisplayedSounds = (): Record<Sound, boolean> => {
  return SOUNDS.reduce(
    (acc, sound) => ({ ...acc, [sound]: true }),
    {} as Record<Sound, boolean>
  );
};

const getInitDisplayedStrings = (
  strings: GuitarString[]
): Record<number, boolean> => {
  return strings.reduce(
    (acc, string) => ({ ...acc, [string.id]: true }),
    {} as Record<number, boolean>
  );
};

const formatSliderLabel = (value: number): string => `${value} frets`;

const TUNINGS = [["E", "B", "G", "D", "A", "D"]];

const GuitarFretboard = (props: GuitarFretboardProps) => {
  const [tuning, setTuning] = useState(props.tuning);
  const [frets, setFrets] = useState(props.frets);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [displayedSounds, setDisplayedSounds] = useState(
    getInitDisplayedSounds()
  );

  const strings = createGuitarStrings(frets, tuning);

  const [displayedStrings, setDisplayedStrings] = useState(
    getInitDisplayedStrings(strings)
  );

  const fretboardWidth = (frets + 1) * FRET_WIDTH;
  const fretboardHeight = strings.length * STRING_OFFSET - STRING_OFFSET;

  const toggleSound = (sound: Sound): void => {
    setDisplayedSounds((prevDisplayedSounds) => ({
      ...prevDisplayedSounds,
      [sound]: !prevDisplayedSounds[sound],
    }));
  };

  const resetSounds = (): void => {
    setDisplayedSounds(getInitDisplayedSounds());
  };

  const handleSoundPick = (sound: Sound | ""): void => {
    if (sound === "") {
      resetSounds();
    } else {
      setDisplayedSounds((prevDisplayedSound) =>
        (Object.keys(prevDisplayedSound) as Sound[]).reduce(
          (acc, key) => ({
            ...acc,
            [key]: key === sound,
          }),
          {} as Record<Sound, boolean>
        )
      );
    }
  };

  const handleStringSelect = (id: number) => {
    setDisplayedStrings((prevDisplayedStrings) => ({
      ...prevDisplayedStrings,
      [id]: !prevDisplayedStrings[id],
    }));
  };

  return (
    <div className={css.container}>
      <div className={css.filters}>
        {SOUNDS.map((sound) => (
          <FormControlLabel
            key={sound}
            control={
              <Checkbox
                checked={displayedSounds[sound]}
                onChange={() => toggleSound(sound)}
                name={sound}
                color="primary"
              />
            }
            label={sound}
          />
        ))}

        <FormControlLabel
          control={
            <Checkbox
              checked={!Object.values(displayedSounds).some((value) => !value)}
              onChange={resetSounds}
              name="All selected"
              color="primary"
            />
          }
          label="All selected"
        />

        <FormControl variant="filled" className={css.soundPicker}>
          <InputLabel id="sound-picker">Pick sound</InputLabel>
          <Select
            labelId="sound-picker"
            id="sound-picker"
            value={
              Object.values(displayedSounds).filter((value) => value).length ===
              1
                ? Object.keys(displayedSounds).filter(
                    (key) => displayedSounds[key as Sound]
                  )[0]
                : ""
            }
            onChange={(e) => handleSoundPick(e.target.value as Sound | "")}
          >
            <MenuItem value="">
              <em>All selected</em>
            </MenuItem>
            {SOUNDS.map((sound) => (
              <MenuItem key={sound} value={sound}>
                {sound}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className={css.soundPicker}>
          <InputLabel id="tuning-picker">Tuning</InputLabel>
          <Select
            labelId="tuning-picker"
            id="tuning-picker"
            value={tuning}
            onChange={(e: any) => setTuning(e.target.value)}
          >
            <MenuItem value={props.tuning}>
              <em>{props.tuning.join(",")}</em>
            </MenuItem>
            {TUNINGS.map((currTuning, tuningIdx) => (
              <MenuItem key={tuningIdx} value={currTuning}>
                {currTuning.join(",")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          className={css.stringPicker}
          aria-controls="string-picker"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Strings:{" "}
          {Object.keys(displayedStrings)
            .map((key) => +key)
            .filter((key) => displayedStrings[key])
            .join(",")}
        </Button>
        <Menu
          id="string-picker"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          {strings.map((string) => (
            <MenuItem
              key={string.id}
              value={string.id}
              onClick={() => handleStringSelect(string.id)}
            >
              String: {string.sounds[0].name}{" "}
              {displayedStrings[string.id] ? "Displayed" : "Hidden"}
            </MenuItem>
          ))}
        </Menu>

        <Typography id="frets-slider" gutterBottom>
          Number of frets
        </Typography>
        <Slider
          className={css.slider}
          defaultValue={props.frets}
          getAriaValueText={formatSliderLabel}
          aria-labelledby="frets-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          value={frets}
          min={MIN_FRETS}
          max={MAX_FRETS}
          onChange={(e, value) => {
            setFrets(value as number);
          }}
        />
      </div>

      <div
        className={css.fretboard}
        style={{
          height: fretboardHeight + "px",
          width: fretboardWidth + "px",
        }}
      >
        <div
          className={css.overlay}
          style={{ width: fretboardWidth - FRET_WIDTH + "px" }}
        />

        {strings.map((string, stringIdx) => (
          <React.Fragment key={string.id}>
            <div
              className={css.string}
              style={{
                top: STRING_OFFSET * stringIdx + "px",
                opacity: displayedStrings[string.id] ? 1 : 0,
              }}
            />

            {displayedStrings[string.id] &&
              string.sounds.map((sound, soundIdx) => (
                <React.Fragment key={sound.fret}>
                  <div
                    className={css.sound}
                    style={{
                      ...SOUNDS_THEMES[sound.name],
                      opacity: displayedSounds[sound.name] ? 1 : 0,
                      width: SOUND_SIZE + "px",
                      height: SOUND_SIZE + "px",
                      top: -(SOUND_SIZE / 2) + STRING_OFFSET * stringIdx + "px",
                      left:
                        FRET_WIDTH / 2 +
                        FRET_WIDTH * soundIdx -
                        SOUND_SIZE / 2 +
                        "px",
                    }}
                  >
                    {sound.name}
                  </div>
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}

        {Array.from({ length: frets + 1 }).map((_, soundIdx) => (
          <div
            key={soundIdx}
            className={css.fret}
            style={{
              left:
                FRET_WIDTH * soundIdx +
                FRET_WIDTH -
                (soundIdx === 0 ? 6 : 0) +
                "px",
              width: soundIdx === 0 ? "6px" : "2px",
            }}
          />
        ))}
      </div>

      <div className={css.fretsLabels} style={{ width: fretboardWidth + "px" }}>
        {Array.from({ length: frets + 1 }).map((_, fretIdx) => (
          <div
            key={fretIdx}
            className={css.fretLabel}
            style={{
              width: FRET_WIDTH + "px",
              height: FRET_LABEL_HEIGHT + "px",
              left: FRET_WIDTH * fretIdx + "px",
            }}
          >
            <div className={css.fretLabelContent}>
              {fretIdx === 0 ? "OPEN" : fretIdx}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuitarFretboard;
