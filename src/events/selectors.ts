import { EventsState } from "./reducer";

export function selectEvent(hash: string, state: EventsState) {
  return state.events.get(hash);
}
