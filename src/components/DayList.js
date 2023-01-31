import { action } from "@storybook/addon-actions";
import React from "react";
import DayListItem from "./DayListItems";

export default function DayList(props) {

  const dayList = props.days.map(day => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.day === day.name}
        setDay={props.setDay} />
    );
  })


  return (
    <ul>
      {dayList}
    </ul>
  )
}
