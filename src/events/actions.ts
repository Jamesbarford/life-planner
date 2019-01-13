import { ActionBase } from "../types/global";
import { Event } from "./types";
import { createEvent } from "./factories";

export enum EventActions {
  CreateEvent = "Events.CreateEvent"
}

export class CreateEventAction implements ActionBase {
  readonly type = EventActions.CreateEvent;
  constructor(public event: Event) {}
  public createEvent = () => createEvent(this.event);
}

export type EventActionTypes = CreateEventAction;
