import * as React from "react";
import { render } from "react-dom";

import "./style.scss";
import { Calendar } from "../Calendar";
class App extends React.Component<{}, {}> {
  render() {
    return ( 
      <>
        <Calendar />
      </>
    );
  }
}

render( <App />, document.getElementById("root") );
