import * as React from "react";
import { shallow } from "enzyme";
import * as moment from "moment";
import { TimePoint } from "../helpers/dateHelper";
import { Calendar } from ".";

describe("invoking class functions on calendar", () => {
  it("should increment month by one", () => {
    const date = moment().startOf(TimePoint.day);
    const calendar = shallow(<Calendar />);
    const calendarInstance = calendar.instance() as Calendar;

    expect(calendar.state("date")).toEqual(date.startOf(TimePoint.day));
    calendarInstance.next(TimePoint.month);
    expect(calendar.state("date")).toEqual(date.add(1, TimePoint.month));
  });
  it("should decrement by one year", () => {
    const date = moment().startOf(TimePoint.day);
    const calendar = shallow(<Calendar />);
    const calendarInstance = calendar.instance() as Calendar;

    expect(calendar.state("date")).toEqual(date.startOf(TimePoint.day));
    calendarInstance.previous(TimePoint.year);
    expect(calendar.state("date")).toEqual(date.subtract(1, TimePoint.year));
  });
});
