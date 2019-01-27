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
    case EventActions.CreateEvent:
      const event = action.createEvent();
      return {
        ...state,
        events: state.events.merge(event)
      };

    case EventActions.GetEvents:
      return state;

    case EventActions.GetEventsResponse:
      const eventBase = action.response.body;
      const response = createEventMapFromArray(eventBase);
      return {
        ...state,
        events: state.events.merge(...response)
      };

    case EventActions.CreateEventResponse:
      const newEvent = createHashEvent(
        action.response.body.date,
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
