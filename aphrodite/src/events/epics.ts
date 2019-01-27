import { combineEpics } from "redux-observable";
import "rxjs/add/operator/switchMap";
import {
  EventActions,
  GetEventsResponse,
  GetEvents,
  CreateEvent,
  CreateEventResponse
} from "./actions";
import { getRequest, Api, postRequest } from "../helpers/api";
import { Event, EventResponseBody } from "./types";
import { Epic } from "../App/middleware";

const fetchEventsEpic: Epic<GetEvents, GetEventsResponse> = action$ =>
  action$
    .ofType(EventActions.GetEvents)
    .switchMap(action =>
      getRequest<Array<EventResponseBody>>(
        `${Api}/events/${action.month}`
      ).then(response => new GetEventsResponse(response))
    );

const postEventEpic: Epic<CreateEvent, CreateEventResponse> = action$ =>
  action$
    .ofType(EventActions.CreateEvent)
    .switchMap(action =>
      postRequest<Event, EventResponseBody>(`${Api}/events`, action.event).then(
        response => new CreateEventResponse(response)
      )
    );

const epics = [fetchEventsEpic, postEventEpic];

export const eventEpics = combineEpics(...epics);
