import * as moment from "moment";
import { Map } from "immutable";
import { EventActionTypes, EventActions } from "./actions";
import { EventMap, CategoryMap } from "./types";
import { createEventMapFromArray } from "./factories";
import { UpdateState } from "../types/global";

export class EventsState {
  constructor(
    public events: EventMap = Map(),
    public category: CategoryMap = Map()
  ) {}
}

export function eventsReducer(
  state = new EventsState(),
  action: EventActionTypes
): EventsState {
  const updateState: UpdateState<EventsState> = newState => ({
    ...state,
    ...newState
  });

  switch (action.type) {
    case EventActions.GetEvents:
    case EventActions.CreateEvent:
    case EventActions.DeleteEventRequest:
      return state;

    case EventActions.GetEventsResponse: {
      if (!action.response.success) return state;

      const eventBase = action.response.body;
      const response = createEventMapFromArray(eventBase);
      return updateState({ events: state.events.merge(...response) });
    }

    case EventActions.CreateEventResponse: {
      if (!action.response.success) return state;
      const { body } = action.response;
      const date = moment(body.date);

      return updateState({
        events: state.events.set(date.toISOString(), body)
      });
    }

    case EventActions.DeleteEventResponse: {
      return updateState({
        events: state.events.delete(action.response.body.id)
      });
    }

    default:
      return state;
  }
}
