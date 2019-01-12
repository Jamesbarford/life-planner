import * as React from "react";
import { Moment } from "moment";
import { dayNames } from "../helpers/dateHelper";
import { cloneDeep } from "lodash";

// COMPONENTS
import { Day } from "./Day";

// TYPES
import { CalendarShared } from "./types";

interface WeekProps extends CalendarShared {
  week: Moment;
}

export class Week extends React.Component<WeekProps> {
  renderDays = () => {
    const { week } = this.props;
    let _date = cloneDeep(week);

    const days = dayNames.map(() => {
      _date = cloneDeep(_date);
      _date.add(1, "day");
      return _date;
    });
    return days;
  };

  render() {
    const days = this.renderDays();
    const { select, selectedDay } = this.props;

    return (
      <div className="calendar-row">
        {days.map((day, i) => (
          <Day select={select} selectedDay={selectedDay} key={i} day={day} />
        ))}
      </div>
    );
  }
}
