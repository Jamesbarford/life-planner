import * as React from "react";
import { NormaliseDate } from ".";

interface DateRendererState {
  time: string;
  day: string;
  month: string;
  year: number;
  showSeconds: boolean;
}

interface DateRendererProps {
  showTime?: boolean;
  showDay?: boolean;
  showMonth?: boolean;
  showYear?: boolean;
  showAll?: boolean;
  showSeconds?: boolean;
}

export class DateRenderer extends React.Component<
  DateRendererProps,
  DateRendererState
> {
  constructor(props: DateRendererProps) {
    super(props);

    this.state = {
      time: NormaliseDate.getCurrentTime(false),
      day: NormaliseDate.getDayName(),
      month: NormaliseDate.getCurrentMonthName(),
      year: NormaliseDate.getYear(),
      showSeconds: this.props.showSeconds || false
    }
  }

  componentDidMount() {
    // 1 second interval for seconds, could be set to a minute as seconds are not shown.
		setInterval(this.getTime, 1000)
	}

  getTime = () => {
    return this.setState({
      time: NormaliseDate.getCurrentTime(this.state.showSeconds)
    })
  };

  render() {

    const {
      time,
      day,
      month,
      year,
      showSeconds
    } = this.state;

    return (
      <div className="">
        today is {day} {month} {year} {time}
        <button onClick={()=> {
          this.setState({showSeconds: !showSeconds})
        }}>
          show seconds?
        </button>
      </div>
    );
  }
}