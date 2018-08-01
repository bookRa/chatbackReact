import React from "react";
//import classes from './Ribbon.css';

const ribbonButton = props => {
  return (
    <button onClick={props.clickfunc} className="ribbonButton btn">
      {props.name}
    </button>
  );
};

export default ribbonButton;
