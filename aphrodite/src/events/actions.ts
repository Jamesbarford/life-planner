import { ActionBase } from "../types/global";
import { Event, EventResponseBody } from "./types";
import { BaseResponse } from "../helpers/api";

export const enum EventActions {
  CreateEvent = "Events.CreateEvent",
  CreateEventResponse = "Events.CreateEventResponse",
  GetEvents = "Events.GetEvents",
  GetEventsResponse = "Events.GetEventsResponse",
  DeleteEventRequest = "Events.DeleteEventRequest",
  DeleteEventResponse = "Events.DeleteEventResponse"
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

export class DeleteEventRequest implements ActionBase {
  public readonly type = EventActions.DeleteEventRequest;
  constructor(public id: string) {}
}

export class DeleteEventResponse implements ActionBase {
  public readonly type = EventActions.DeleteEventResponse;
  constructor(public response: BaseResponse<{ id: string }>) {}
}

export type EventActionTypes =
  | CreateEvent
  | GetEvents
  | GetEventsResponse
  | CreateEventResponse
  | DeleteEventRequest
  | DeleteEventResponse;
