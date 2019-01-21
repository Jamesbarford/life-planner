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
 * @example
 * id: string;
 * title: string;
 * description?: string
 * date: Moment;
 * location?: string;
 * category?: Category;
 */
export const Entry: React.FunctionComponent<EntryProps> = ({
  event
}): JSX.Element => <span className="entry">{event.title}</span>;
