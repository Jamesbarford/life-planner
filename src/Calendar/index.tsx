import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

// HELPERS
import { TimePoint, TimePointType } from "../helpers/dateHelper";
import { createHash, selectMomentFromList } from "./selectors";

// ACTIONS
import {
  CalendarNext,
  CalendarPrevious,
  CalculateMomentArray,
  ChangeView,
  SelectDay
} from "./actions";

// COMPONENTS
import { DayNames } from "./view/Day";
import { Icon } from "../components/IconButton";
import {
  CircularButton,
  BackgroundColor
} from "../components/IconButton/style";
import { MonthView } from "./view/MonthView";
import { Select } from "../components/Select";
import { ToolTip } from "../components/ToolTip";
import { Week } from "./view/Week";

// TYPES
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";

type CalendarProps = MapStateToProps & MapDispatchToProps;
class Calendar extends React.Component<CalendarProps> {
  next = () => {
    const { next, view, calculateMomentArray } = this.props;
    next(1, view);
    calculateMomentArray(view);
  };

  previous = () => {
    const { previous, view, calculateMomentArray } = this.props;
    previous(1, view);
    calculateMomentArray(view);
  };

  changeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const view = e.target.value as TimePointType;
    const { calculateMomentArray, changeView } = this.props;
    calculateMomentArray(view);
    changeView(view);
  };

  select = (date: Moment) => this.props.selectDay(date);

  getMomentArray = () => {
    const { currentMonth, view, momentList, currentWeek, date } = this.props;
    const dateHash = createHash(date, view);
    const timeArr = selectMomentFromList(dateHash, momentList);
    return timeArr;
  };

  render() {
    const { date, selectedDay, view } = this.props;
    const { day, week, month, year } = TimePoint;
    const timeArr = this.getMomentArray();

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
        <div className="calendar-wrapper">
          <DayNames />
          {view === TimePoint.month && (
            <MonthView
              weeks={timeArr}
              selectedDay={selectedDay}
              select={this.select}
            />
          )}
          {view === TimePoint.week &&
            timeArr.map(day => (
              <Week
                key={day.toString()}
                week={day}
                selectedDay={this.props.selectedDay}
                select={this.select}
              />
            ))}
        </div>
      </>
    );
  }
}

interface MapStateToProps {
  date: Moment;
  view: TimePointType;
  momentList: MomentDictionary;
  selectedDay: Moment;
  currentMonth: number;
  currentWeek: number;
}

interface MapDispatchToProps {
  next: (unitOfTime: number, timePoint: TimePointType) => void;
  selectDay: (date: Moment) => void;
  previous: (unitOfTime: number, timePoint: TimePointType) => void;
  changeView: (newView: TimePointType) => void;
  calculateMomentArray: (t: TimePointType) => void;
}

export const CalendarConnected = connect<MapStateToProps, MapDispatchToProps>(
  (state: ApplicationState) => ({
    date: state.calendar.date,
    view: state.calendar.view,
    momentList: state.calendar.momentList,
    selectedDay: state.calendar.selectedDay,
    currentMonth: state.calendar.currentMonth,
    currentWeek: state.calendar.currentWeek
  }),
  dispatch => ({
    next: (unitOfTime, timePoint) =>
      dispatch(new CalendarNext(unitOfTime, timePoint)),
    selectDay: date => dispatch(new SelectDay(date)),
    previous: (unitOfTime, timePoint) =>
      dispatch(new CalendarPrevious(unitOfTime, timePoint)),
    changeView: newView => dispatch(new ChangeView(newView)),
    calculateMomentArray: t => dispatch(new CalculateMomentArray(t))
  })
)(Calendar);
