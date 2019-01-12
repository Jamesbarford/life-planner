import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

// HELPERS
import { TimePoint, TimePointType } from "../helpers/dateHelper";

// ACTIONS
import {
  CalendarNext,
  CalendarPrevious,
  ChangeView,
  SelectDay,
  CalculateMomentArray
} from "./actions";

// COMPONENTS
import { MonthView } from "./MonthView";
import { Select } from "../components/Select";
import { ApplicationState } from "../App/types";
import { getDate } from "./selectors";
import { Icon } from "../components/IconButton";
import {
  CircularButton,
  BackgroundColor
} from "../components/IconButton/style";
import { ToolTip } from "../components/ToolTip";

type CalendarProps = MapStateToProps & MapDispatchToProps;
class Calendar extends React.Component<CalendarProps> {
  next = () => {
    const { next, view, calculateMomentArray } = this.props;
    next(1, view);
    calculateMomentArray(this.props.date, view);
  };

  previous = () => {
    const { previous, view, calculateMomentArray } = this.props;
    previous(1, view);
    calculateMomentArray(this.props.date, view);
  };

  changeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const view = e.target.value as TimePoint;
    this.props.changeView(view);
  };

  select = (date: Moment) => this.props.selectDay(date);

  render() {
    const { date, selectedDay, view, momentArr } = this.props;
    const { day, week, month, year } = TimePoint;

    return (
      <>
        <div className="calendar-navigation">
          <div className="calendar-navigation__item">
            {date.format("MMMM YYYY")}
          </div>

          <div className="calendar-navigation__item">
            <ToolTip helper="select timepoint">
              <Select onChange={this.changeView} defaultValue={month}>
                <option value={day}>Day</option>
                <option value={week}>Week</option>
                <option value={month}>Month</option>
                <option value={year}>Year</option>
              </Select>
            </ToolTip>
          </div>
          <div className="calendar-navigation__item">
            <ToolTip helper={`previous ${view}`}>
              <Icon
                hoverBackground={BackgroundColor.lightGray}
                btnStyle={CircularButton}
                onClick={this.previous}
                iconName="keyboard_arrow_left"
              />
            </ToolTip>
          </div>
          <div className="calendar-navigation__item">
            <ToolTip helper={`next ${view}`}>
              <Icon
                hoverBackground={BackgroundColor.lightGray}
                btnStyle={CircularButton}
                onClick={this.next}
                iconName="keyboard_arrow_right"
              />
            </ToolTip>
          </div>
        </div>

        <MonthView
          weeks={momentArr}
          selectedDay={selectedDay}
          select={this.select}
        />
      </>
    );
  }
}

interface MapStateToProps {
  date: Moment;
  selectedDay: Moment;
  currentMonth: number;
  view: TimePointType;
  momentArr: Array<Moment>;
}

interface MapDispatchToProps {
  next: (unitOfTime: number, timePoint: TimePointType) => void;
  previous: (unitOfTime: number, timePoint: TimePointType) => void;
  changeView: (newView: TimePoint) => void;
  selectDay: (date: Moment) => void;
  calculateMomentArray: (date: Moment, t?: TimePointType) => void;
}

export const CalendarConnected = connect<MapStateToProps, MapDispatchToProps>(
  (state: ApplicationState) => ({
    date: state.calendar.date,
    selectedDay: state.calendar.selectedDay,
    currentMonth: state.calendar.currentMonth,
    view: state.calendar.view,
    momentArr: state.calendar.momentArr
  }),
  dispatch => ({
    next: (unitOfTime, timePoint) =>
      dispatch(new CalendarNext(unitOfTime, timePoint)),
    previous: (unitOfTime, timePoint) =>
      dispatch(new CalendarPrevious(unitOfTime, timePoint)),
    changeView: newView => dispatch(new ChangeView(newView)),
    selectDay: date => dispatch(new SelectDay(date)),
    calculateMomentArray: (date, t) =>
      dispatch(new CalculateMomentArray(date, t))
  })
)(Calendar);
