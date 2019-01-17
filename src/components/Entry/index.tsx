import * as React from "react";
import { Event } from "../../events/types";

interface EntryProps {
  event: Event;
}

export const Entry: React.FunctionComponent<EntryProps> = ({
  event
}): JSX.Element => <span className="entry">{event.title}</span>;
