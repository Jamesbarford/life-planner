import { ActionBase } from "../types/global";
import { createHashEvent } from "./factories";
import { Event, EventResponseBody } from "./types";
import { BaseResponse } from "../helpers/api";

export enum EventActions {
  CreateEvent = "Events.CreateEvent",
  CreateEventResponse = "Events.CreateEventResponse",
  GetEvents = "Events.GetEvents",
  GetEventsResponse = "Events.GetEventsResponse"
}

export class CreateEvent implements ActionBase {
  public readonly type = EventActions.CreateEvent;
  constructor(public event: Event) {}
}

export class CreateEventResponse implements ActionBase {
  public readonly type = EventActions.CreateEventResponse;
  constructor(public response: BaseResponse<EventResponseBody>) {}
}

export class GetEvents implements ActionBase {
  public readonly type = EventActions.GetEvents;
  constructor(public month: number) {}
}

export class GetEventsResponse implements ActionBase {
  public readonly type = EventActions.GetEventsResponse;
  constructor(public response: BaseResponse<Array<EventResponseBody>>) {}
}

export type EventActionTypes =
  | CreateEvent
  | GetEvents
  | GetEventsResponse
  | CreateEventResponse;
