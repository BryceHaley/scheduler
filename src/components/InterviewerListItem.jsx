import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const InterviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  
  return (
    <li className={InterviewerItemClass}
      onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
};