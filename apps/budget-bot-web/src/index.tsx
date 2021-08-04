import React from "react";
import ReactDOM from "react-dom";

import { Schema, required, minLength, maxLength, min } from "@stackoff/schema";

const App = () => {
  console.log(Schema("", [required, minLength(2), maxLength(10)]).result());
  console.log(Schema("", [required, minLength(2), maxLength(10)]).valid());
  console.log(Schema(10, [min(10)]).valid());

  return <div>React custom webpack config</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
