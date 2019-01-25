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
  public createEvent = () => createHashEvent(this.event.date, this.event);
  public postEvent = () => postRequest(`${Api}/events`, this.event);
}

export class GetEvents implements ActionBase {
  readonly type = EventActions.GetEvents;
  public getEvents = () => getRequest<Array<Event>>(`${Api}/events`);
}

export type EventActionTypes = CreateEventAction | GetEvents;
