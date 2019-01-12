import * as React from "react";
import { connect } from "react-redux";
import { Moment, unitOfTime } from "moment";

// HELPERS
import { TimePoint, calculate, TimePointType } from "../helpers/dateHelper";

// ACTIONS
import {
  CalendarNext,
  CalendarPrevious,
  ChangeView,
  SelectDay
} from "./actions";

// COMPONENTS
import { MonthView } from "./MonthView";
import { Select } from "../components/Select";

interface CalendarState {
  weeks: Array<Moment>;
}

type CalendarProps = MapStateToProps & MapDispatchToProps;

class Calendar extends React.Component<CalendarProps, CalendarState> {
  private cache = (date: Moment) => calculate(date);

  state = { weeks: [] as Array<Moment> };

  componentDidMount() {
    this.calculateWeeks();
  }

  next = () => {
    const { next, view } = this.props;
    next(1, view);
    this.calculateWeeks();
  };

  previous = () => {
    const { previous, view } = this.props;
    previous(1, view);
    this.calculateWeeks();
  };

  calculateWeeks = () => {
    const { date } = this.props;
    const weeks = this.cache(date)(date);
    this.setState({ weeks });
  };

  changeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const view = e.target.value as TimePoint;
    this.props.changeView(view);
  };

  select = (date: Moment) => this.props.selectDay(date);

  render() {
    const { weeks } = this.state;
    const { date, selectedDay, view } = this.props;
    const { day, week, month } = TimePoint;

    return (
      <>
        <div className="calendar-navigation">
          <div>{date.format("MMMM YYYY")}</div>

          <Select onChange={this.changeView} defaultValue={month}>
            <option value={day}>Day</option>
            <option value={week}>Week</option>
            <option value={month}>Month</option>
          </Select>
          <button onClick={() => this.previous()}>previous {view}</button>
          <button onClick={() => this.next()}>next {view}</button>
        </div>

        <MonthView
          weeks={weeks}
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
}

interface MapDispatchToProps {
  next: (unitOfTime: number, timePoint: TimePointType) => void;
  previous: (unitOfTime: number, timePoint: TimePointType) => void;
  changeView: (newView: TimePoint) => void;
  selectDay: (date: Moment) => void;
}

export const CalendarConnected = connect<MapStateToProps, MapDispatchToProps>(
  ({ calendar }: { calendar: MapStateToProps }) => ({
    date: calendar.date,
    selectedDay: calendar.selectedDay,
    currentMonth: calendar.currentMonth,
    view: calendar.view
  }),
  dispatch => ({
    next: (unitOfTime, timePoint) =>
      dispatch(new CalendarNext(unitOfTime, timePoint)),
    previous: (unitOfTime, timePoint) =>
      dispatch(new CalendarPrevious(unitOfTime, timePoint)),
    changeView: newView => dispatch(new ChangeView(newView)),
    selectDay: date => dispatch(new SelectDay(date))
  })
)(Calendar);
