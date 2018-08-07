import React from "react";
//import classes from './Ribbon.css';

const ribbonButton = props => {
  return (
    <button onClick={props.clickfunc} className="ribbonButton btn" value={props.value}>
      {props.name}
      <span className="tooltiptext invisible">{props.title}</span>
    </button>
  );
};

export default ribbonButton;
