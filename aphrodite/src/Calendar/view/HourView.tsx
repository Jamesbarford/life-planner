import * as React from "react";
import { List } from "immutable";
import { Moment } from "moment";
import { CalendarShared } from "../types";
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
          <div
            key={hour.toISOString()}
            className="calendar-cell hour"
            onClick={e => {
              select("eventModal", hour);
            }}
          >
            <div className="calendar-cell__hour">
              <span className="cell-hour">{hour.format("H a")}</span>
              {events.get(hour.toISOString()) && (
                <Entry
                  key={hour.toISOString()}
                  event={events.get(hour.toISOString())}
                />
              )}
              <hr className="hour-line" />
            </div>
          </div>
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
