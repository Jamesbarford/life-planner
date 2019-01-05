import * as React from "react";
import { render } from "react-dom";
import { DateRenderer } from "../dates/DateRender";

import "./style.scss";
class App extends React.Component<{}, {}> {
  render() {
    return ( <DateRenderer /> );
  }
}

render( <App />, document.getElementById("root") );
