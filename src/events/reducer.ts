import { Map } from "immutable";
import { EventActionTypes, EventActions } from "./actions";
import { EventMap, ExpenditureMap, CategoryMap } from "./types";

export class EventsState {
  constructor(
    public finance: ExpenditureMap = Map(),
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
      return { ...state, events: state.events.merge(event) };

    default:
      return state;
  }
}
