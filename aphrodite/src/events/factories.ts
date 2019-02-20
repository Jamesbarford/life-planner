import { Map } from "immutable";
import * as moment from "moment";
import { Moment } from "moment";
import { Event, EventResponseBody } from "./types";

export const createHashEvent = (
  date: Moment,
  event: Event
): Map<string, Event> => Map({ [date.toISOString()]: event });

export function createEventMapFromArray(
  events: Array<EventResponseBody>
): Array<Map<string, Event>> {
  if (events.length === 0) return;
  const eventsFormatted = events
    .map(event => {
      const time = moment(event.time, "HH:mm:ss");
      const date = moment(event.date)
        .hours(time.hours())
        .minutes(time.minutes())
        .seconds(time.seconds());
      return {
        id: date.toISOString(),
        category: event.category,
        description: event.description,
        title: event.title,
        date
      };
    })
    .map(event => createHashEvent(event.date, event));
  return eventsFormatted;
}
