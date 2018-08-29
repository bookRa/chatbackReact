import React from "react";
import CardButtonInput from "./CardButtonInput"
//import classes from './Ribbon.css';

const cardButton = props => {
	return (
	  	<div className="prompt">
  			{props.title !== undefined ? (
	          <button onClick={(e) => props.clicked(e)} className="cardButton btn" value={props.value}>
	          	<b>{props.name}:</b> {props.title} <CardButtonInput value={props.editable} />
	          </button>
	        ) : (
	          <button onClick={(e) => props.clicked(e)} className="cardButton btn" value={props.value}>
	          	{props.name} <CardButtonInput value={props.editable} />
	          </button>
	        )}
	    </div>
	);
};

export default cardButton;
