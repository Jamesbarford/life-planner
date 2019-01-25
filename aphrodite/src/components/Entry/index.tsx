import * as React from "react";
import { Event } from "../../events/types";

interface EntryProps {
  event: Event;
}

/**
 *
 * @param entry is an Event
 *
 * __Event__
 * @param id: string;
 * @param title: string;
 * @param description?: string
 * @param date: Moment;
 * @param location?: string;
 * @param category?: Category;
 */
export const Entry: React.FunctionComponent<EntryProps> = ({
  event
}): JSX.Element => <span className="entry">{event.title}</span>;
