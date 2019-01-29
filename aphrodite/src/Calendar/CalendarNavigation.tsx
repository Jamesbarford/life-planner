import * as React from "react";
import { Moment } from "moment";

// COMPONENTS
import { CustomSelect } from "../components/Select";
import { WithRipple } from "../components/Ripple";
import {
  CircularButton,
  BackgroundColor
} from "../components/IconButton/style";
import { Icon } from "../components/IconButton";
import { ToolTip } from "../components/ToolTip";
import { ButtonStyle } from "../components/Button";

// Types
import { TimePointType } from "../helpers/dateHelper";
import { SelectView } from "./components/SelectView";

interface CalendarNavigationProps {
  day: TimePointType;
  week: TimePointType;
  month: TimePointType;
  year: TimePointType;
  view: TimePointType;
  date: Moment;
  currentBudgetDisplay: string;
  openBudgetModal: () => void;
  changeView: (timePoint: TimePointType) => void;
  previous: () => void;
  next: () => void;
}

export const CalendarNavigation: React.FunctionComponent<
  CalendarNavigationProps
> = ({
  day,
  week,
  month,
  year,
  view,
  date,
  currentBudgetDisplay,
  openBudgetModal,
  changeView,
  previous,
  next
}) => (
  <div className="calendar-navigation">
    <div className="calendar-navigation__item">
      <SelectView
        day={day}
        view={view}
        date={date}
        week={week}
        year={year}
        month={month}
        changeView={changeView}
      />
    </div>
    <div className="calendar-navigation__item">
      <h2>{date.format("ddd Do MMMM YYYY")}</h2>
    </div>
    <div className="calendar-navigation__item">
      <ToolTip helper={`set budget`}>
        <Icon
          hoverBackground={BackgroundColor.lightGray}
          btnStyle={CircularButton}
          onClick={openBudgetModal}
          iconName="settings"
        />
      </ToolTip>
      <h2>Budget: &nbsp;</h2> <h3>{currentBudgetDisplay}</h3>
    </div>
    <div className="calendar-navigation__item">
      <ToolTip helper={`previous ${view}`}>
        <Icon
          hoverBackground={BackgroundColor.lightGray}
          btnStyle={CircularButton}
          onClick={previous}
          iconName="keyboard_arrow_left"
        />
      </ToolTip>
    </div>
    <div className="calendar-navigation__item">
      <ToolTip helper={`next ${view}`}>
        <Icon
          hoverBackground={BackgroundColor.lightGray}
          btnStyle={CircularButton}
          onClick={next}
          iconName="keyboard_arrow_right"
        />
      </ToolTip>
    </div>
  </div>
);
