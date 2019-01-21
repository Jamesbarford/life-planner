import { ActionBase } from "../types/global";
import { Event } from "./types";
import { createHashEvent } from "./factories";

export enum EventActions {
  CreateEvent = "Events.CreateEvent",
  GetEvents = "Events.GetEvents"
}

export class CreateEventAction implements ActionBase {
  readonly type = EventActions.CreateEvent;
  constructor(public event: Event) {}
  public createEvent = () => createHashEvent(this.event.date, this.event);
}

export class GetEvents implements ActionBase {
  readonly type = EventActions.GetEvents;
}

export type EventActionTypes = CreateEventAction | GetEvents;