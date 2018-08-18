import React from "react";

//import classes from './Ribbon.css';

const cardButton = props => {
  return (
  	<div className="prompt">
        {props.title !== undefined ? (
          <button onClick={props.clickfunc} className="cardButton btn" value={props.value}><b>{props.name}:</b> {props.title}.</button>
        ) : (
          <button onClick={props.clickfunc} className="cardButton btn" value={props.value}>{props.name}</button>
        )}
    </div>
  );
};

export default cardButton;
