import * as React from "react";
import { Moment } from "moment";
import { List } from "immutable";

// COMPONENTS
import { Week } from "./Week";

// TYPES
import { CalendarShared } from "../types";

interface MonthViewProps extends CalendarShared {
  weeks: List<Moment>;
}

export const MonthView: React.FunctionComponent<MonthViewProps> = ({
  weeks,
  selectedDay,
  select
}): JSX.Element => (
  <>
    {weeks.map(week => (
      <Week
        key={week.toString()}
        week={week}
        selectedDay={selectedDay}
        select={select}
      />
    ))}
  </>
);
