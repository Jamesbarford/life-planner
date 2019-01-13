import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";
import { Input, InputType } from "../components/Input";
import { Button, ButtonStyle } from "../components/Button";
import { ApplicationState } from "../App/types";
import { getCalendarState } from "../Calendar/selectors";
import moment = require("moment");
import { Event } from "./types";
import { CreateEventAction } from "./actions";
import uuid = require("uuid");

interface CreateEventState {
  title: string;
}

type CreateEventProps = MapStateToProps & MapDispatchToProps;

const event = {
  id: "uuid",
  title: "string",
  date: "moment"
};

class CreateEvent extends React.Component<CreateEventProps, CreateEventState> {
  state = {
    title: "",
    date: this.props.selectedDay
  };

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value
    });
  };

  createEvent = () => {
    const event = { ...this.state, id: uuid() };
    this.props.createEvent(event);
  };

  render() {
    return (
      <div>
        <Input
          onChange={this.changeHandler}
          inputType={InputType.text}
          placeholder="Event title"
        />
        <Button
          onClick={() => {}}
          buttonStyle={ButtonStyle.light}
          text="More options"
        />
        <Button
          onClick={this.createEvent}
          buttonStyle={ButtonStyle.success}
          text="Save"
        />
      </div>
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
