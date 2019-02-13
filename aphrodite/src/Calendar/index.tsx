import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

// HELPERS
import { TimePoint, TimePointType, alterTime } from "../helpers/dateHelper";
import { selectMomentFromMap } from "./selectors";
import { createHash } from "./factories";

// ACTIONS
import {
  CalendarNext,
  CalendarPrevious,
  CalculateMomentArray,
  ChangeView,
  SelectDay
} from "./actions";
import { GetEvents } from "../events/actions";
import { GetBudget } from "../budget/actions";

// COMPONENTS
import { CreateEventModalConnected } from "../events/CreateEventModal";
import { BudgetModalConnected } from "../budget/BudgetModal";
import { DayNames } from "./view/Day";
import { HourViewConnected } from "./view/HourView";
import { MonthView } from "./view/MonthView";
import { Week } from "./view/Week";
import { CalendarNavigation } from "./CalendarNavigation";

// TYPES
import { ApplicationState } from "../App/types";
import { MomentDictionary } from "./types";

type CalendarProps = MapStateToProps & MapDispatchToProps;

interface CalendarState {
  eventModal: boolean;
  budgetModal: boolean;
  [key: string]: boolean;
}

export class Calendar extends React.Component<CalendarProps, CalendarState> {
  private budgetModal: string = "budgetModal";
  private eventModal: string = "eventModal";

  state: CalendarState = { eventModal: false, budgetModal: false };

  componentDidMount() {
    const { getEvents, getBudget, today } = this.props;
    getBudget(today.month());
    getEvents(today.month());
  }

  next = () => {
    const {
      next,
      view,
      calculateMomentArray,
      getEvents,
      currentMonth,
      getBudget
    } = this.props;

    next(1, view);
    if (view === TimePoint.month) {
      const dateToGet = alterTime(
        moment().month(currentMonth),
        1,
        TimePoint.month
      ).month();
      getBudget(dateToGet);
      getEvents(dateToGet);
    }
    calculateMomentArray(view);
  };

  previous = () => {
    const {
      previous,
      view,
      calculateMomentArray,
      getEvents,
      currentMonth,
      getBudget
    } = this.props;

    previous(1, view);
    if (view === TimePoint.month) {
      const dateToGet = alterTime(
        moment().month(currentMonth),
        -1,
        TimePoint.month
      ).month();
      getBudget(dateToGet);
      getEvents(dateToGet);
    }
    calculateMomentArray(view);
  };

  changeView = (timePoint: TimePointType) => {
    const { calculateMomentArray, changeView } = this.props;
    calculateMomentArray(timePoint);
    changeView(timePoint);
  };

  select = (key: string, date?: Moment) => {
    if (key === this.eventModal) {
      this.props.selectDay(date);
    }
    this.setState({ [key]: !this.state[key] });
  };

  getMomentArray = () => {
    const { view, momentList, date } = this.props;
    const dateHash = createHash(date, view);
    const timeArr = selectMomentFromMap(dateHash, momentList);
    return timeArr;
  };

  render() {
    const {
      date,
      today,
      selectedDay,
      view,
      currentBudgetDisplay,
      budget
    } = this.props;
    const { eventModal, budgetModal } = this.state;
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
          openBudgetModal={() => this.select(this.budgetModal)}
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
              <HourViewConnected
                hours={timeArr}
                selectedDay={date}
                select={this.select}
              />
            </div>
          )}
        </div>
        {eventModal && (
          <CreateEventModalConnected
            selectedDay={selectedDay}
            modalOpen={eventModal}
            close={() => this.setState({ eventModal: false })}
          />
        )}
        {budgetModal && (
          <BudgetModalConnected
            date={date}
            modalOpen={budgetModal}
            close={() => this.setState({ budgetModal: false })}
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
  budget: number;
}

interface MapDispatchToProps {
  next: (unitOfTime: number, timePoint: TimePointType) => void;
  selectDay: (date: Moment) => void;
  previous: (unitOfTime: number, timePoint: TimePointType) => void;
  changeView: (newView: TimePointType) => void;
  calculateMomentArray: (t: TimePointType) => void;
  getEvents: (month: number) => void;
  getBudget: (month: number) => void;
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
    currentBudgetDisplay: budget.currentBudgetDisplay,
    budget: budget.currentBudget
  }),
  dispatch => ({
    next: (unitOfTime, timePoint) =>
      dispatch(new CalendarNext(unitOfTime, timePoint)),
    selectDay: date => dispatch(new SelectDay(date)),
    previous: (unitOfTime, timePoint) =>
      dispatch(new CalendarPrevious(unitOfTime, timePoint)),
    changeView: newView => dispatch(new ChangeView(newView)),
    calculateMomentArray: t => dispatch(new CalculateMomentArray(t)),
    getEvents: month => dispatch(new GetEvents(month)),
    getBudget: month => dispatch(new GetBudget(month))
  })
)(Calendar);
