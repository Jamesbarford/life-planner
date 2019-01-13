import * as React from "react";
import { Input, InputType } from "../../components/Input";
import { Button, ButtonStyle } from "../../components/Button";

interface CreateEventState {
  title: string;
}

export class CreateEvent extends React.Component<{}, CreateEventState> {
  state = { title: "" };

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value
    });
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
          buttonStyle={ButtonStyle.success}
          text="Save"
        />
      </div>
    );
  }
}
