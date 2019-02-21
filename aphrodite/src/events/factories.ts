import { Map } from "immutable";
import * as moment from "moment";
import { Event, EventResponseBody } from "./types";

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
    .map(event => Map({ [event.date.toISOString()]: event }));
  return eventsFormatted;
}
