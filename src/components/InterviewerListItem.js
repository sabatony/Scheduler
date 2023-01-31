import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {

  let dayClass = "interviewers__item";

  if (props.selected) {
    dayClass += "--selected";
  }


  return (
    <li onClick={() => props.setInterviewer(props.id)} className={dayClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}