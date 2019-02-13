import * as React from "react";
import * as moment from "moment";
import { Map } from "immutable";
import { Moment } from "moment";
import { connect } from "react-redux";

// HELPERS
import { classNames } from "../../helpers/util";

import { Entry } from "../../components/Entry";

// TYPES
import { CalendarShared } from "../types";
import { ApplicationState } from "../../App/types";
import { EventMap } from "../../events/types";
import { selectEventsToList } from "../../events/selectors";

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

const Day: React.FunctionComponent<DayProps> = ({
  select,
  selectedDay,
  day,
  events,
  budgetPerDay
}): JSX.Element => {
  const selected = selectedDay.toISOString() === day.toISOString();
  const eventList = selectEventsToList(day, events);

  return (
    <div className="calendar-cell">
      <div
        className="calendar-cell__inner"
        onClick={() => select("eventModal", day)}
      >
        <span
          className={classNames([`${selected ? "today" : ""}`, "cell-date"])}
        >
          {day.format("D")}
        </span>
        <span>{budgetPerDay.get(day.format("YYYY-MM-DD"))}</span>
      </div>
      {eventList.map(e => (
        <Entry key={e.id} event={e} />
      ))}
      <div
        className="calendar-cell__inner"
        onClick={() => select("eventModal", day)}
      />
    </div>
  );
};

interface MapStateToProps {
  events: EventMap;
  budgetPerDay: Map<string, number>;
}

export const DayConnected = connect<MapStateToProps>(
  ({ entries: { events }, budget: { budgetPerDay } }: ApplicationState) => ({
    events,
    budgetPerDay
  })
)(Day);
