import * as React from "react";
import { dayNames } from "../helpers/dateHelper";
import { Moment } from "moment";
import moment = require("moment");
import { classNames } from "../helpers/util";

export const DayNames: React.FunctionComponent = () => (
  <div className="row day-names">
    {dayNames.map(day => (
      <span key={day} className="day">
        {day.slice(0, 3)}
      </span>
    ))}
  </div>
);

interface DayProps {
  day: Moment;
}

export class Day extends React.Component<DayProps> {
  render() {
    const today = moment()
      .startOf("day")
      .toISOString();
    const select = today === this.props.day.toISOString();

    return (
      <div className={classNames(["calendar-cell", select ? "today" : ""])}>
        {this.props.day.format("DD MMM YYYY")}
      </div>
    );
  }
}
