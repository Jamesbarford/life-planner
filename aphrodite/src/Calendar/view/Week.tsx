import * as React from "react";
import * as moment from "moment";
import { Moment } from "moment";
import { cloneDeep } from "lodash";

// COMPONENTS
import { DayConnected } from "./Day";

// TYPES
import { CalendarShared } from "../types";

interface WeekProps extends CalendarShared {
  week: Moment;
}

export class Week extends React.Component<WeekProps> {
  renderDays = () => {
    const { week } = this.props;
    let _date = cloneDeep(week);

    const days = moment.weekdays().map(() => {
      // THIS NEEDS TO CHANGE
      _date = cloneDeep(_date);
      _date.add(1, "day");
      return _date;
    });
    return days;
  };

  render() {
    const { select, selectedDay } = this.props;
    const days = this.renderDays();

    return (
      <div className="calendar-row">
        {days.map(day => (
          <DayConnected
            select={select}
            selectedDay={selectedDay}
            key={day.toISOString()}
            day={day}
          />
        ))}
      </div>
    );
  }
}
