import { ActionBase } from "../types/global";
import { Event } from "./types";
import { createHashEvent } from "./factories";
import { postRequest, getRequest, Api } from "../helpers/api";

export enum EventActions {
  CreateEvent = "Events.CreateEvent",
  GetEvents = "Events.GetEvents"
}

export class CreateEventAction implements ActionBase {
  readonly type = EventActions.CreateEvent;
  constructor(public event: Event) {}
  public createEvent() {
    return createHashEvent(this.event.date, this.event);
  }
  public postEvent() {
    return postRequest<Event>(`${Api}/events`, this.event);
  }
}

export class GetEvents implements ActionBase {
  readonly type = EventActions.GetEvents;
  public getEvents() {
    return getRequest<Array<Event>>(`${Api}/events`);
  }
}

export type EventActionTypes = CreateEventAction | GetEvents;
