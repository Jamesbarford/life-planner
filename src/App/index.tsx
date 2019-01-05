import * as React from "react";
import { render } from "react-dom";
import "./style.scss";

const App = () => <div className="example">hello world</div>;

render( <App />, document.getElementById("root") );
