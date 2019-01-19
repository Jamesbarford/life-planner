import * as React from "react";
import * as uuid from "uuid";
import * as moment from "moment";
import { Map } from "immutable";
import { connect } from "react-redux";
import { Moment } from "moment";

// ACTIONS
import { CreateEventAction } from "./actions";
import { calculate, TimePoint } from "../helpers/dateHelper";

// COMPONENTS
import {
  Button,
  ButtonStyle,
  ButtonType,
  ButtonPadding
} from "../components/Button";
import { Input, InputType } from "../components/Input";
import { Modal } from "../components/Modal";
import { CustomSelect } from "../components/Select";

// TYPES
import { Event } from "./types";
import { WithRipple } from "../components/Ripple";
import { currencyFormatter, CurrencySymbols } from "../helpers/currencyHelper";

interface CreateEventState {
  id: string;
  date: Moment;
  title: string;
  timeArr: Array<Moment>;
  error: Map<string, string>;
  amount: string;
}

interface OwnProps {
  modalOpen: boolean;
  close: () => void;
  selectedDay: Moment;
}

type CreateEventProps = MapDispatchToProps & OwnProps;

class CreateEvent extends React.Component<CreateEventProps, CreateEventState> {
  state = {
    id: "",
    date: moment(this.props.selectedDay),
    title: "",
    timeArr: [] as Array<Moment>,
    error: Map({ message: "" }),
    amount: "0"
  };

  componentDidMount() {
    const timeArr = calculate(this.props.selectedDay, TimePoint.hour, 30, 48);
    const id = uuid();
    this.setState({ id, timeArr });
  }

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
    this.setState({ error: Map() });
  };

  amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      return this.setState({ amount: "0" });
    }
    const stripLetters = e.target.value.match(/\d+/g).join("");
    const amount = currencyFormatter("en-GB", stripLetters);
    this.setState({ amount });
  };

  createEvent = (e: React.FormEvent) => {
    e.preventDefault();

    const { createEvent, close } = this.props;
    const { title, date, id, error } = this.state;

    if (!title) {
      return this.setState({
        error: error.merge({ message: "Event must have a title" })
      });
    }

    createEvent({ id, title, date });
    close();
  };

  selectChangeHandler = (date: Moment) => this.setState({ date });

  render() {
    const { modalOpen, close } = this.props;
    const { timeArr, error, date, amount } = this.state;

    return (
      <Modal open={modalOpen} close={close}>
        {error.get("message") !== "" && (
          <EventError error={error.get("message")} />
        )}
        <form className="event-modal" onSubmit={this.createEvent}>
          <Input
            autoFocus={true}
            onChange={this.changeHandler}
            inputType={InputType.text}
            placeholder="Event title"
          />
          <div className="horizonal-wrapper">
            <h3>{CurrencySymbols.sterling}</h3>
            <Input
              onChange={this.amountHandler}
              inputType={InputType.text}
              value={amount}
              placeholder="Amount"
            />
          </div>
          <CustomSelect helperText="Select Time" text={date.format("LT")}>
            {injectedProps =>
              timeArr.map(time => (
                <li
                  key={time.format("LT")}
                  className="selecter-list__item"
                  value={time.toISOString()}
                >
                  <WithRipple
                    className="reset-width"
                    rippleStyle={ButtonStyle.light}
                  >
                    {rippleProps => (
                      <button
                        className="selecter-list__button"
                        onMouseUp={rippleProps.handleMouseUp}
                        onMouseDown={rippleProps.handleMouseDown}
                        type="button"
                        onClick={() => {
                          this.selectChangeHandler(time);
                          injectedProps.closeList();
                        }}
                      >
                        {time.format("LT")}
                      </button>
                    )}
                  </WithRipple>
                </li>
              ))
            }
          </CustomSelect>
          <div className="horizonal-wrapper justify-end">
            <Button
              padding={ButtonPadding.small}
              onClick={() => {}}
              buttonStyle={ButtonStyle.light}
              text="More options"
            />
            <Button
              padding={ButtonPadding.normal}
              type={ButtonType.submit}
              buttonStyle={ButtonStyle.success}
              text="Save"
            />
          </div>
        </form>
      </Modal>
    );
  }
}

const EventError: React.FunctionComponent<{ error: string }> = ({
  error
}): JSX.Element => <div className="error-dialog">{error}</div>;

interface MapDispatchToProps {
  createEvent: (event: Event) => void;
}

export const CreateEventModalConnected = connect<{}, MapDispatchToProps>(
  null,
  dispatch => ({
    createEvent: event => dispatch(new CreateEventAction(event))
  })
)(CreateEvent);
