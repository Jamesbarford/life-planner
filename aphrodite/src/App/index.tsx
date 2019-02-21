import * as React from "react";
import { render } from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

// REDUCERS
import { calendarReducer } from "../Calendar/reducer";
import { eventsReducer } from "../events/reducer";
import { budgetReducer } from "../budget/reducer";

// MIDDLEWARE
import { classToObject, logger, epicMiddleware, rootEpic } from "./middleware";

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

export const store = createStore(
  allReducers,
  applyMiddleware(classToObject, logger, epicMiddleware)
);

epicMiddleware.run(rootEpic as any);

const App: React.FunctionComponent = (): JSX.Element => (
  <Provider store={store}>
    <CalendarConnected />
  </Provider>
);

render(<App />, document.getElementById("root"));
