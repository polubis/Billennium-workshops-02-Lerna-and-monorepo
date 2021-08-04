import React from "react";
import ReactDOM from "react-dom";

import { Sound } from "models";
import { GuitarFretboard } from "components";

import "./styles/index.scss";

const TUNING: Sound[] = ["E", "B", "G", "D", "A", "E"];
const FRETS = 25;

const App = () => {
  return <GuitarFretboard frets={FRETS} tuning={TUNING} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
