import * as React from "react";
import { render } from "react-dom";
import { DateRenderer } from "../Dates/DateRender";

import "./style.scss";
import { Calendar } from "../Calendar";
class App extends React.Component<{}, {}> {
  render() {
    return ( 
      <>
        <DateRenderer />
        <Calendar />
      </>
    );
  }
}

render( <App />, document.getElementById("root") );
