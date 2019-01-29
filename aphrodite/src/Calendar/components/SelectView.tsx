import * as React from "react";
import { CustomSelect } from "../../components/Select";
import { WithRipple } from "../../components/Ripple";
import { ButtonStyle } from "../../components/Button";
import { TimePointType } from "../../helpers/dateHelper";
import { Moment } from "moment";

interface SelectViewProps {
  day: TimePointType;
  week: TimePointType;
  month: TimePointType;
  year: TimePointType;
  view: TimePointType;
  date: Moment;
  changeView: (timePoint: TimePointType) => void;
}

export const SelectView: React.FunctionComponent<SelectViewProps> = ({
  view,
  day,
  week,
  month,
  year,
  changeView
}) => (
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
);
