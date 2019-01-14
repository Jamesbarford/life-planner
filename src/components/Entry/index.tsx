import * as React from "react";
import { Event } from "../../events/types";

interface EntryProps {
  event: Event;
}

const EntryStyle = {
  height: "20px",
  width: "100%"
};

export const Entry: React.FunctionComponent<EntryProps> = ({
  event
}): JSX.Element => <span className="entry">{event.title}</span>;