import * as React from "react";
import { Moment } from "moment";
import { dayNames } from "../helpers/dateHelper";
import { cloneDeep } from "lodash";

// Copmonents
import { Day } from "./Day";

interface WeekProps {
	month: number;
	week: Moment;
}

export class Week extends React.Component<WeekProps> {
	renderDays = () => {
		const { week } = this.props;
		let _date = cloneDeep(week);

		const days = dayNames.map(() => {
			_date = _date.clone();
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
