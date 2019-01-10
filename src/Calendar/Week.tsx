import * as React from "react";
import { Moment } from "moment";
import { dayNames } from "../helpers/dateHelper";
import { cloneDeep } from "lodash";

// Copmonents
import { Day } from "./Day";

interface WeekProps {
	monthIndex: number;
	month: Moment;
}

export class Week extends React.Component<WeekProps> {
	renderDays = () => {
		const { month } = this.props;
		let _date = cloneDeep(month);

		const days = dayNames.map(() => {
			_date = cloneDeep(_date);
			_date.add(1, "day");
			return _date;
		});
		return days;
	};

	render() {
		const days = this.renderDays();

		return (
			<div>
				{days.map((day, i) => (
					<Day key={i} day={day} />
				))}
			</div>
		);
	}
}
