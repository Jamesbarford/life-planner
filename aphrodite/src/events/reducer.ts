import * as moment from "moment";
import { Map } from "immutable";
import { EventActionTypes, EventActions } from "./actions";
import { EventMap, CategoryMap, Event } from "./types";
import { createEventMapFromArray, createHashEvent } from "./factories";

export class EventsState {
  constructor(
    public events: EventMap = Map(),
    public category: CategoryMap = Map()
  ) {}
}

export function eventsReducer(
  state = new EventsState(),
  action: EventActionTypes
) {
  switch (action.type) {
    case EventActions.GetEvents:
    case EventActions.CreateEvent:
      return state;

    case EventActions.GetEventsResponse:
      if (!action.response.success) return state;
      const eventBase = action.response.body;
      const response = createEventMapFromArray(eventBase);
      return {
        ...state,
        events: state.events.merge(...response)
      };

    case EventActions.CreateEventResponse:
      if (!action.response.success) return state;
      const newEvent = createHashEvent(
        moment(action.response.body.date),
        action.response.body
      );
      return {
        ...state,
        events: state.events.merge(newEvent)
      };

    default:
      return state;
  }
}
