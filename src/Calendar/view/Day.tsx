import * as React from "react";
import * as moment from "moment";
import { Moment } from "moment";

// HELPERS
import { classNames } from "../../helpers/util";

// TYPES
import { CalendarShared } from "../types";

export const DayNames: React.FunctionComponent = (): JSX.Element => {
  const weekdays = moment.weekdaysShort();
  const upperCaseWeekdays = weekdays.map(day => day.toUpperCase());

  return (
    <div className="day-row">
      {upperCaseWeekdays.map(day => (
        <span key={day} className="day">
          {day}
        </span>
      ))}
    </div>
  );
};

interface DayProps extends CalendarShared {
  day: Moment;
}

export const Day: React.FunctionComponent<DayProps> = ({
  select,
  selectedDay,
  day
}): JSX.Element => {
  const selected = selectedDay.toISOString() === day.toISOString();
  return (
    <button className="calendar-cell" onClick={() => select(day)}>
      <div className={classNames(["calendar-cell__inner"])}>
        <span className={`${selected ? "today" : ""}`}>{day.format("D")}</span>
      </div>
    </button>
  );
};
