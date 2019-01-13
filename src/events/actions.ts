import { ActionBase } from "../types/global";
import { Event } from "./types";
import { createHashEvent } from "./factories";

export enum EventActions {
  CreateEvent = "Events.CreateEvent"
}

export class CreateEventAction implements ActionBase {
  readonly type = EventActions.CreateEvent;
  constructor(public event: Event) {}
  public createEvent = () => createHashEvent(this.event);
}

export type EventActionTypes = CreateEventAction;
