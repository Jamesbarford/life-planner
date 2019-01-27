import * as React from "react";
import * as uuid from "uuid";
import * as moment from "moment";
import { Map } from "immutable";
import { connect } from "react-redux";
import { Moment } from "moment";

// ACTIONS
import { CreateEvent } from "./actions";
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
import { WithRipple } from "../components/Ripple";

// TYPES
import { Event } from "./types";
import { CurrencySymbols, mergeAmount } from "../helpers/currencyHelper";

interface CreateEventState {
  id: string;
  date: Moment;
  title: string;
  timeArr: Array<Moment>;
  error: Map<string, string>;
  integer: string;
  fractional: string;
  inputWidth: string;
  [key: string]: any;
}

interface OwnProps {
  modalOpen: boolean;
  close: () => void;
  selectedDay: Moment;
}

type CreateEventProps = MapDispatchToProps & OwnProps;

class CreateEventModal extends React.Component<
  CreateEventProps,
  CreateEventState
> {
  private integer = "integer";
  private fractional = "fractional";

  state = {
    id: "",
    date: moment(this.props.selectedDay),
    title: "",
    timeArr: [] as Array<Moment>,
    error: Map({ message: "" }),
    integer: "",
    fractional: "",
    inputWidth: "15.5px"
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

  amountHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.value.length < 1) return this.setState({ [key]: "" });
    let _amount = e.target.value.match(/\d+/g).join("");
    if (key === this.fractional) {
      if (_amount.length >= 2) _amount = _amount.substring(0, 2);
    } else if (key === this.integer) {
      this.calculateInputWidth(e.target.value);
    }
    this.setState({ [key]: _amount });
  };

  calculateInputWidth = (str?: string) => {
    const MULTIPLIER = 15.5;
    const width = str.length * MULTIPLIER + "px";
    this.setState({ inputWidth: width });
  };

  createEvent = (e: React.FormEvent) => {
    e.preventDefault();

    const { createEvent, close } = this.props;
    const { title, date, id, error, integer, fractional } = this.state;

    mergeAmount(integer, fractional);
    if (!title) {
      return this.setState({
        error: error.merge({ message: "Event must have a title" })
      });
    }

    createEvent({ id, title, date, category: "test" });
    close();
  };

  selectChangeHandler = (date: Moment) => this.setState({ date });

  render() {
    const { modalOpen, close } = this.props;
    const { timeArr, error, date, integer, fractional } = this.state;

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
            <h3 className="currency-symbol">{CurrencySymbols.sterling}</h3>
            <Input
              style={{ width: this.state.inputWidth }}
              onChange={e => this.amountHandler(e, this.integer)}
              inputType={InputType.text}
              value={integer}
              placeholder="0"
            />
            .
            <Input
              style={{ width: "30px" }}
              onChange={e => this.amountHandler(e, this.fractional)}
              inputType={InputType.text}
              value={fractional}
              placeholder="00"
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
  dispatch => ({ createEvent: event => dispatch(new CreateEvent(event)) })
)(CreateEventModal);
