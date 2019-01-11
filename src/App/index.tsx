import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { isPlainObject } from "lodash";
import { combineReducers } from "redux";

// REDUCERS
import { calendarReducer } from "../Calendar/reducer";

// INITIAL COMPONENT RENDER
import { CalendarConnected } from "../Calendar";

// STYLES
import "normalize.css";
import "./style.scss";

export const allReducers = combineReducers({
  calendar: calendarReducer
});

const stripClassActions = <State, Action>(store: Store<State>) => {
  return (next: (a: Action) => void) => (action: Action) =>
    next(isPlainObject(action) ? action : Object.assign({}, action));
};

const logger = createLogger();

export const store = createStore(
  allReducers,
  applyMiddleware(stripClassActions, logger)
);

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <CalendarConnected />
  </Provider>
);

render(<App />, document.getElementById("root"));
