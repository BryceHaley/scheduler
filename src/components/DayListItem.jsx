import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";

const formatSpots = (spots) => {
  return spots === 0 ? "no spots remaining" : 
    spots === 1 ? "1 spot remaining" : spots + " spots remaining"; 
};

export default function DayListItem(props) {
  
  const listItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const spotsRemainingText = formatSpots(props.spots);

  return (
    <li 
      className = {listItemClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
      
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemainingText}</h3>
    </li>
  );
}
