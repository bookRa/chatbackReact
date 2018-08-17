import React from "react";

//import classes from './Ribbon.css';

const cardButton = props => {
  return (
  	<div id={props.activePrompt} className="prompt" key={props.activePrompt}>
	    <button onClick={props.clickfunc} className="ribbonButton btn" value={props.value}>
	      {props.name}
	    </button>
    </div>
  );
};

export default cardButton;
