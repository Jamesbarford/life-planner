import * as React from "react";
import { Moment } from "moment";
import { dayNames, paddingRight } from "../../helpers/dateHelper";
import { CalendarShared } from "../types";
import { classNames } from "../../helpers/util";
import moment = require("moment");

export const DayNames: React.FunctionComponent = () => {
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

export class Day extends React.Component<DayProps> {
  render() {
    const { select, selectedDay, day } = this.props;
    const selected = selectedDay.toISOString() === day.toISOString();

    return (
      <button className="calendar-cell" onClick={() => select(day)}>
        <div
          className={classNames([
            "calendar-cell__inner",
            `${selected ? "today" : ""}`
          ])}
        >
          <span style={{ paddingRight: paddingRight(day) }}>
            {day.format("D")}
          </span>
        </div>
      </button>
    );
  }
}
