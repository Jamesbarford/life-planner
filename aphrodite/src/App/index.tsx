import * as React from "react";
import { render } from "react-dom";
import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware
} from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { isPlainObject } from "lodash";

// REDUCERS
import { calendarReducer } from "../Calendar/reducer";
import { eventsReducer } from "../events/reducer";
import { budgetReducer } from "../budget/reducer";

// INITIAL COMPONENT RENDER
import { CalendarConnected } from "../Calendar";

// STYLES
import "normalize.css";
import "./style.scss";

export const allReducers = combineReducers({
  calendar: calendarReducer,
  entries: eventsReducer,
  budget: budgetReducer
});

type NextAction = (a: Action) => void;

const actionIsObject = (next: NextAction, action: Action) => {
  return next(isPlainObject(action) ? action : Object.assign({}, action));
};

const classToObject: Middleware = () => (next: NextAction) => {
  return (action: Action) => actionIsObject(next, action);
};

const logger = createLogger({
  collapsed: () => true
});

export const store = createStore(
  allReducers,
  applyMiddleware(classToObject, logger)
);

const App: React.FunctionComponent = (): JSX.Element => (
  <Provider store={store}>
    <CalendarConnected />
  </Provider>
);

render(<App />, document.getElementById("root"));
