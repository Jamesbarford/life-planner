import * as React from "react";
import * as uuid from "uuid";
import * as moment from "moment";
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
  date: Moment;
}

interface OwnProps {
  modalOpen: boolean;
  close: () => void;
}

type CreateEventProps = MapStateToProps & MapDispatchToProps & OwnProps;

class CreateEvent extends React.Component<CreateEventProps, CreateEventState> {
  // These never change so setting as constants
  private timeArr = calculate(this.props.selectedDay, TimePoint.hour, 30, 48);
  private id = uuid();

  state = { title: "", date: moment(this.props.selectedDay) };

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  createEvent = (e: React.FormEvent) => {
    e.preventDefault();

    const { createEvent, close } = this.props;
    const { title, date } = this.state;

    const event = { id: this.id, title, date };

    createEvent(event);
    close();
  };

  selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const date = moment(e.target.value);
    this.setState({ date });
  };

  render() {
    const { selectedDay, modalOpen, close } = this.props;

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
            {this.timeArr.map(time => (
              <option key={time.format("LT")} value={time.toISOString()}>
                {time.format("LT")}
              </option>
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
