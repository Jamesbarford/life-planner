import * as React from "react";
import * as uuid from "uuid";
import { connect } from "react-redux";
import { Moment } from "moment";

// ACTIONS
import { CreateEventAction } from "./actions";
import { getCalendarState } from "../Calendar/selectors";
import { calculate, TimePoint } from "../helpers/dateHelper";

// COMPONENTS
import { Button, ButtonStyle, ButtonType } from "../components/Button";
import { Input, InputType } from "../components/Input";
import { Modal } from "../components/Modal";
import { Select } from "../components/Select";

// TYPES
import { Event } from "./types";
import { ApplicationState } from "../App/types";

interface CreateEventState {
  title: string;
  timeArr: Array<Moment>;
  selectedTime: number;
}

interface OwnProps {
  modalOpen: boolean;
  close: () => void;
}

type CreateEventProps = MapStateToProps & MapDispatchToProps & OwnProps;

class CreateEvent extends React.Component<CreateEventProps, CreateEventState> {
  state = {
    title: "",
    timeArr: calculate(this.props.selectedDay, TimePoint.day)(
      this.props.selectedDay,
      TimePoint.day
    ),
    selectedTime: 0
  };

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  createEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const date = this.props.selectedDay.clone();
    const eventDate = date.hour(this.state.selectedTime);
    const event = {
      id: uuid(),
      title: this.state.title,
      date: eventDate
    };
    this.props.createEvent(event);
    this.props.close();
  };

  selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const time = parseInt(e.target.value);
    this.setState({ selectedTime: time });
  };

  render() {
    const { selectedDay, modalOpen, close } = this.props;
    const { timeArr } = this.state;

    return (
      <Modal open={modalOpen} close={close}>
        <form onSubmit={this.createEvent}>
          <Input
            onChange={this.changeHandler}
            inputType={InputType.text}
            placeholder="Event title"
          />
          <Select
            onChange={this.selectChangeHandler}
            defaultValue={selectedDay.format("LT")}
          >
            {timeArr.map(time => (
              <option value={time.hour()}>{time.format("LT")}</option>
            ))}
          </Select>
          <Button
            onClick={() => {}}
            buttonStyle={ButtonStyle.light}
            text="More options"
          />
          <Button
            type={ButtonType.submit}
            buttonStyle={ButtonStyle.success}
            text="Save"
          />
        </form>
      </Modal>
    );
  }
}

interface MapStateToProps {
  selectedDay: Moment;
}

interface MapDispatchToProps {
  createEvent: (event: Event) => void;
}

export const CreateEventModalConnected = connect<
  MapStateToProps,
  MapDispatchToProps
>(
  (state: ApplicationState) => ({
    selectedDay: getCalendarState(state).selectedDay
  }),
  dispatch => ({
    createEvent: event => dispatch(new CreateEventAction(event))
  })
)(CreateEvent);
