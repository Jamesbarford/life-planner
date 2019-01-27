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
      <CustomSelect helperText="Select View" text={view}>
        {injectedProps => (
          <>
            <li className="selecter-list__item" value={day}>
              <WithRipple
                className="reset-width"
                persistFocus={true}
                rippleStyle={ButtonStyle.light}
              >
                {rippleProps => (
                  <button
                    className="selecter-list__button"
                    onMouseUp={rippleProps.handleMouseUp}
                    onMouseDown={rippleProps.handleMouseDown}
                    onClick={() => {
                      changeView(day);
                      injectedProps.closeList();
                    }}
                    onBlur={rippleProps.resetRipple}
                    value={day}
                  >
                    Day
                  </button>
                )}
              </WithRipple>
            </li>
            <li className="selecter-list__item" value={week}>
              <WithRipple
                className="reset-width"
                persistFocus={true}
                rippleStyle={ButtonStyle.light}
              >
                {rippleProps => (
                  <button
                    className="selecter-list__button"
                    onMouseUp={rippleProps.handleMouseUp}
                    onMouseDown={rippleProps.handleMouseDown}
                    onClick={() => {
                      changeView(week);
                      injectedProps.closeList();
                    }}
                    onBlur={rippleProps.resetRipple}
                    value={week}
                  >
                    Week
                  </button>
                )}
              </WithRipple>
            </li>
            <li className="selecter-list__item" value={month}>
              <WithRipple
                className="reset-width"
                persistFocus={true}
                rippleStyle={ButtonStyle.light}
              >
                {rippleProps => (
                  <button
                    className="selecter-list__button"
                    onMouseUp={rippleProps.handleMouseUp}
                    onMouseDown={rippleProps.handleMouseDown}
                    onClick={() => {
                      changeView(month);
                      injectedProps.closeList();
                    }}
                    onBlur={rippleProps.resetRipple}
                    value={month}
                  >
                    Month
                  </button>
                )}
              </WithRipple>
            </li>
            <li className="selecter-list__item" value={year}>
              <WithRipple
                className="reset-width"
                persistFocus={true}
                rippleStyle={ButtonStyle.light}
              >
                {rippleProps => (
                  <button
                    className="selecter-list__button"
                    onMouseUp={rippleProps.handleMouseUp}
                    onMouseDown={rippleProps.handleMouseDown}
                    onClick={() => {
                      this.changeView(year);
                      injectedProps.closeList();
                    }}
                    onBlur={rippleProps.resetRipple}
                    value={year}
                  >
                    Year
                  </button>
                )}
              </WithRipple>
            </li>
          </>
        )}
      </CustomSelect>
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
