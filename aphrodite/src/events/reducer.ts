import { Map } from "immutable";
import { EventActionTypes, EventActions } from "./actions";
import { EventMap, CategoryMap } from "./types";

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
      action.postEvent();
      return { ...state, events: state.events.merge(event) };

    case EventActions.GetEvents:
      action.getEvents().then(response => console.log(response));
      return state;

    default:
      return state;
  }
}
