import * as React from "react";
import { Event } from "../../events/types";

import { CreateEventModalConnected } from "../../events/CreateEventModal";

interface EntryProps {
  event: Event;
}

interface EntryState {
  modalOpen: boolean;
}

/**
 *
 * @param entry is an Event
 *
 * __Event__
 * @param id: string;
 * @param title: string;
 * @param description?: string
 * @param date: Moment;
 * @param location?: string;
 * @param category?: Category;
 */
export class Entry extends React.PureComponent<EntryProps, EntryState> {
  state = { modalOpen: false };

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    const { event } = this.props;
    const { modalOpen } = this.state;
    return (
      <>
        <button
          onClick={e => {
            this.toggleModal();
            return e.stopPropagation();
          }}
          className="entry"
        >
          {event.title}
        </button>
        {modalOpen && (
          <CreateEventModalConnected
            modalOpen={modalOpen}
            close={this.toggleModal}
            selectedDay={event.date}
            event={event}
          />
        )}
      </>
    );
  }
}
