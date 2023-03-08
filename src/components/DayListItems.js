import React from "react";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  let dayClass = "day-list__item";

  if (props.selected) {
    dayClass += "--selected";
  }
  if (props.spots === 0) {
    dayClass += "--full";
  }

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining"
    }
    if (spots === 1) {
      return "1 spot remaining"
    }
    if (spots > 1) {
      return `${spots} spots remaining`
    }
  }

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}