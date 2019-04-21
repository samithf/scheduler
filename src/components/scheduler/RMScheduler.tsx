import React from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import withDragDropContext from "./WithDnDContext";

interface IRMSchedulerState {
  viewModel: any;
}

class RMScheduler extends React.Component<{}, IRMSchedulerState> {
  events = [
    {
      id: 1,
      start: "2017-12-18 09:30:00",
      end: "2017-12-19 23:30:00",
      resourceId: "r1",
      title: "I am finished",
      bgColor: "#D9D9D9"
    },
    {
      id: 2,
      start: "2017-12-18 12:30:00",
      end: "2017-12-26 23:30:00",
      resourceId: "r2",
      title: "I am not resizable",
      resizable: false
    },
    {
      id: 3,
      start: "2017-12-19 12:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r3",
      title: "I am not movable",
      movable: false
    },
    {
      id: 4,
      start: "2017-12-19 14:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r1",
      title: "I am not start-resizable",
      startResizable: false
    },
    {
      id: 5,
      start: "2017-12-19 15:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r2",
      title: "R2 has recurring tasks every week on Tuesday, Friday",
      rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
      bgColor: "#f759ab"
    }
  ];

  constructor(props: any) {
    super(props);

    const schedulerData = new SchedulerData(
      "2017-12-18",
      ViewTypes.Week,
      false,
      false,
      {
        // minuteStep: 15
      }
    );

    const resources = [
      {
        id: "r1",
        name: "Resource1"
      },
      {
        id: "r2",
        name: "Resource2"
      },
      {
        id: "r3",
        name: "Resource3"
      }
    ];
    schedulerData.setResources(resources);

    schedulerData.setEvents(this.events);
    this.state = {
      viewModel: schedulerData
    };
  }

  render() {
    const { viewModel } = this.state;
    return (
      <div>
        <div>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
          />
        </div>
      </div>
    );
  }

  prevClick = (schedulerData: any) => {
    schedulerData.prev();
    schedulerData.setEvents(this.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  nextClick = (schedulerData: any) => {
    schedulerData.next();
    schedulerData.setEvents(this.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onViewChange = (schedulerData: any, view: any) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(this.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  onSelectDate = (schedulerData: any, date: any) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.events);
    this.setState({
      viewModel: schedulerData
    });
  };

  eventClicked = (schedulerData: any, event: any) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData: any, event: any) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${
        event.title
      }}`
    );
  };

  ops2 = (schedulerData: any, event: any) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${
        event.title
      }}`
    );
  };

  newEvent = (
    schedulerData: any,
    slotId: any,
    slotName: any,
    start: any,
    end: any,
    type: any,
    item: any
  ) => {
    let newFreshId = 0;
    schedulerData.events.forEach((event: any) => {
      if (event.id >= newFreshId) newFreshId = event.id + 1;
    });

    const newEvent = {
      id: newFreshId,
      title: "New event you just created",
      start,
      end,
      resourceId: slotId,
      bgColor: "purple"
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventStart = (schedulerData: any, event: any, newStart: any) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      viewModel: schedulerData
    });
  };

  updateEventEnd = (schedulerData: any, event: any, newEnd: any) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      viewModel: schedulerData
    });
  };

  moveEvent = (
    schedulerData: any,
    event: any,
    slotId: any,
    slotName: any,
    start: any,
    end: any
  ) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData
    });
  };
}

export default withDragDropContext(RMScheduler);
