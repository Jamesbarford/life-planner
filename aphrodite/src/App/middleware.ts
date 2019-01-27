import { Action, Middleware } from "redux";
import { isPlainObject } from "lodash";
import {
  createEpicMiddleware,
  combineEpics,
  ActionsObservable,
  StateObservable
} from "redux-observable";
import { Observable } from "rxjs";
import { createLogger } from "redux-logger";

// EPICS
import { eventEpics } from "../events/epics";
import { budgetEpics } from "../budget/epics";

// TYPES
import { ApplicationState } from "./types";

// STRIP ACTIONS TO OBJECT
// =============================================================================
type NextAction = (a: Action) => void;

const actionIsObject = (next: NextAction, action: Action) => {
  return next(isPlainObject(action) ? action : Object.assign({}, action));
};

const classToObject: Middleware = () => (next: NextAction) => {
  return (action: Action) => actionIsObject(next, action);
};

// REDUX LOGGER
// =============================================================================
const logger = createLogger({ collapsed: () => true });

// EPICS
// =============================================================================
interface Epic<
  I extends Action = any,
  O extends Action = any,
  S = ApplicationState,
  Dependencies = any
> {
  (
    action$: ActionsObservable<I>,
    state$: StateObservable<S>,
    dependencies: Dependencies
  ): Observable<O>;
}

const epicMiddleware = createEpicMiddleware<Action, Action, ApplicationState>();
const allEpics = [eventEpics, budgetEpics];
const rootEpic = combineEpics(...allEpics);

export { rootEpic, epicMiddleware, classToObject, logger, Epic };
