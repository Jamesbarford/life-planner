import { combineEpics } from "redux-observable";
import "rxjs/add/operator/switchMap";
import {
  EventActions,
  GetEventsResponse,
  GetEvents,
  CreateEvent,
  CreateEventResponse,
  DeleteEventRequest,
  DeleteEventResponse
} from "./actions";
import { ApiRequest } from "../helpers/api";
import { Event, EventResponseBody } from "./types";
import { Epic } from "../App/middleware";

const fetchEventsEpic: Epic<GetEvents, GetEventsResponse> = action$ =>
  action$
    .ofType(EventActions.GetEvents)
    .switchMap(action =>
      ApiRequest.get<Array<EventResponseBody>>(
        `${ApiRequest.route}/events/${action.month}`
      ).then(response => new GetEventsResponse(response))
    );

const postEventEpic: Epic<CreateEvent, CreateEventResponse> = action$ =>
  action$
    .ofType(EventActions.CreateEvent)
    .switchMap(action =>
      ApiRequest.post<Event, EventResponseBody>(
        `${ApiRequest.route}/events`,
        action.event
      ).then(response => new CreateEventResponse(response))
    );

const deleteEventEpic: Epic<
  DeleteEventRequest,
  DeleteEventResponse
> = action$ =>
  action$
    .ofType(EventActions.DeleteEventRequest)
    .switchMap(action =>
      ApiRequest.delete<{ id: string }>(
        `${ApiRequest.route}/events/${action.id}`
      ).then(response => new DeleteEventResponse(response))
    );

const epics = [fetchEventsEpic, postEventEpic, deleteEventEpic];

export const eventEpics = combineEpics(...epics);
