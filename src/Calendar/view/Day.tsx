import * as React from "react";
import * as moment from "moment";
import { Moment } from "moment";
import { connect } from "react-redux";

// HELPERS
import { classNames } from "../../helpers/util";

import { Entry } from "../../components/Entry";

// TYPES
import { CalendarShared } from "../types";
import { ApplicationState } from "../../App/types";
import { EventMap } from "../../events/types";
import { matchDayToHash } from "../../events/selectors";

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

interface DayProps extends CalendarShared, MapStateToProps {
  day: Moment;
}

export const Day: React.FunctionComponent<DayProps> = ({
  select,
  selectedDay,
  day,
  events
}): JSX.Element => {
  const selected = selectedDay.toISOString() === day.toISOString();
  const event = events.filter(
    (v, k) => matchDayToHash(k) === day.toISOString()
  );
  const eventList = event.toList();

  return (
    <button className="calendar-cell" onClick={() => select(day)}>
      <div className={classNames(["calendar-cell__inner"])}>
        <span
          className={classNames([`${selected ? "today" : ""}`, "cell-date"])}
        >
          {day.format("D")}
        </span>
      </div>
      {eventList.map(v => (
        <Entry key={v.id} event={v} />
      ))}
    </button>
  );
};

interface MapStateToProps {
  events: EventMap;
}

export const DayConnected = connect<MapStateToProps>(
  ({ entries: { events } }: ApplicationState) => ({ events })
)(Day);
