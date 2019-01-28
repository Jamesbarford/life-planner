import * as React from "react";
import { List } from "immutable";
import { Moment } from "moment";
import { CalendarShared } from "../types";
import {
  selectEventsToList,
  selectEvent,
  matchDayToHash
} from "../../events/selectors";
import { EventMap } from "../../events/types";
import { connect } from "react-redux";
import { ApplicationState } from "../../App/types";
import { Entry } from "../../components/Entry";

interface HourViewOwnProps extends CalendarShared {
  hours: List<Moment>;
}

type HourViewProps = HourViewOwnProps & MapStateToProps;

class HourView extends React.Component<HourViewProps> {
  render() {
    const { hours, select, selectedDay, events } = this.props;
    return (
      <>
        <div className="hour-header">
          <div className="hour-header__inner">
            <span>{selectedDay.format("ddd").toUpperCase()}</span>
            <span className="today" style={{ height: "46px", width: "46px" }}>
              {selectedDay.format("Do")}
            </span>
          </div>
        </div>
        {hours.map(hour => (
          <button
            key={hour.toISOString()}
            className="calendar-cell hour"
            onClick={() => select("eventModal", hour)}
          >
            <div className="calendar-cell__hour">
              <span className="cell-hour">{hour.format("H a")}</span>
              {selectEvent(hour.toISOString(), events) && (
                <Entry
                  key={hour.toISOString()}
                  event={selectEvent(hour.toISOString(), events)}
                />
              )}
              <hr className="hour-line" />
            </div>
          </button>
        ))}
      </>
    );
  }
}

interface MapStateToProps {
  events: EventMap;
}

export const HourViewConnected = connect<MapStateToProps>(
  ({ entries: { events } }: ApplicationState) => ({ events })
)(HourView);
