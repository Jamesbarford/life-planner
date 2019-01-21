import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

// HELPERS
import { TimePoint, TimePointType, createHash } from "../helpers/dateHelper";
import { selectMomentFromMap } from "./selectors";

// ACTIONS
import {
  CalendarNext,
  CalendarPrevious,
  CalculateMomentArray,
  ChangeView,
  SelectDay
} from "./actions";

// COMPONENTS
import { CreateEventModalConnected } from "../events/CreateEventModal";
import { DayNames } from "./view/Day";
import { HourView } from "./view/HourView";
import { MonthView } from "./view/MonthView";
import { Week } from "./view/Week";

// TYPES
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";
import { CalendarNavigation } from "./CalendarNavigation";

type CalendarProps = MapStateToProps & MapDispatchToProps;

interface CalendarState {
  modalOpen: boolean;
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  state = { modalOpen: false };

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

  changeView = (timePoint: TimePointType) => {
    const { calculateMomentArray, changeView } = this.props;
    calculateMomentArray(timePoint);
    changeView(timePoint);
  };

  select = (date: Moment) => {
    this.props.selectDay(date);
    this.setState({ modalOpen: true });
  };

  getMomentArray = () => {
    const { view, momentList, date } = this.props;
    const dateHash = createHash(date, view);
    const timeArr = selectMomentFromMap(dateHash, momentList);
    return timeArr;
  };

  render() {
    const { date, selectedDay, view, currentBudgetDisplay } = this.props;
    const { modalOpen } = this.state;
    const { day, week, month, year } = TimePoint;
    const timeArr = this.getMomentArray();

    return (
      <>
        <CalendarNavigation
          day={day}
          week={week}
          month={month}
          year={year}
          view={view}
          date={date}
          currentBudgetDisplay={currentBudgetDisplay}
          changeView={this.changeView}
          previous={this.previous}
          next={this.next}
        />
        <div className="calendar-wrapper">
          {view === month && (
            <>
              <DayNames />
              <MonthView
                weeks={timeArr}
                selectedDay={selectedDay}
                select={this.select}
              />
            </>
          )}
          {view === week && (
            <>
              <DayNames />
              {timeArr.map(day => (
                <Week
                  key={day.toString()}
                  week={day}
                  selectedDay={selectedDay}
                  select={this.select}
                />
              ))}
            </>
          )}
          {view === day && (
            <div className="calendar-hour__view-wrapper">
              <hr className="vertical-line" />
              <HourView
                hours={timeArr}
                selectedDay={date}
                select={this.select}
              />
            </div>
          )}
        </div>
        {modalOpen && (
          <CreateEventModalConnected
            selectedDay={selectedDay}
            modalOpen={modalOpen}
            close={() => this.setState({ modalOpen: false })}
          />
        )}
      </>
    );
  }
}

interface MapStateToProps {
  date: Moment;
  today: Moment;
  view: TimePointType;
  momentList: MomentDictionary;
  selectedDay: Moment;
  currentMonth: number;
  currentWeek: number;
  currentBudgetDisplay: string;
}

interface MapDispatchToProps {
  next: (unitOfTime: number, timePoint: TimePointType) => void;
  selectDay: (date: Moment) => void;
  previous: (unitOfTime: number, timePoint: TimePointType) => void;
  changeView: (newView: TimePointType) => void;
  calculateMomentArray: (t: TimePointType) => void;
}

export const CalendarConnected = connect<MapStateToProps, MapDispatchToProps>(
  ({ calendar, budget }: ApplicationState) => ({
    date: calendar.date,
    today: calendar.today,
    view: calendar.view,
    momentList: calendar.momentList,
    selectedDay: calendar.selectedDay,
    currentMonth: calendar.currentMonth,
    currentWeek: calendar.currentWeek,
    currentBudgetDisplay: budget.currentBudgetDisplay
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
