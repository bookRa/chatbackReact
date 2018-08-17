import React from "react";

import IndexCard from './IndexCard';
//import classes from './Ribbon.css';

const ribbonButton = props => {
  return (
  	<div id={props.activePrompt} className="prompt" key={props.activePrompt}>
	    <button onClick={props.clickfunc} className="ribbonButton btn" value={props.value}>
	      {props.name}
	    </button>
	    {props.btns !== undefined ? (
    		<IndexCard title={props.title} clicked={props.clicked} btns={props.btns} />
  		) : (
    		<IndexCard title={props.title} />
  		)}
    </div>
  );
};

export default ribbonButton;
