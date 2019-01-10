import * as React from "react";
import { dayNames } from "../helpers/dateHelper";
import { Moment } from "moment";

export const DayNames: React.SFC<{}> = () => (
	<div className="row day-names">
		{dayNames.map(day => (
			<span key={day} className="day">
				{day.slice(0, 3)}
			</span>
		))}
	</div>
);

interface DayProps {
	day: Moment;
}

export class Day extends React.Component<DayProps> {
	render() {
		return <div>{this.props.day.format("dd DD MMM YYYY")}</div>;
	}
}
