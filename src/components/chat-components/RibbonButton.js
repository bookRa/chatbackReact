import React from "react";

import IndexCard from './IndexCard';
//import classes from './Ribbon.css';

const ribbonButton = props => {
  return (
  	<div className="prompt" key={props.activePrompt}>
	    <button id={props.activePrompt} onClick={props.clickfunc} className={props.classes} value={props.value}>
	      {props.name}
	    </button>
	    {props.btns !== undefined ? (
    		<IndexCard id={props.activePrompt} classes="indexCard hidden" search={props.search} submit={props.submit} title={props.title} clicked={props.clicked} btns={props.btns} />
  		) : (
    		<IndexCard id={props.activePrompt} classes="indexCard hidden" search={props.search}  submit={props.submit} title={props.title} />
  		)}
    </div>
  );
};

export default ribbonButton;
