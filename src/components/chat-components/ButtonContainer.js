import React from "react";
import CardButton from "./CardButton";

//import classes from './Ribbon.css';

const buttonContainer = props =>
  props.btns.map((btn, index) => {
  	console.log(index)
    return (
		<CardButton
			className="ribbonButton"
			name={props.btns[index].key}
			key={props.btns[index].key}
			value={props.btns[index].value}
			title={props.btns[index].tooltip}
			clickfunc={(e) => props.clicked(e)}
		/>
    );
  });

export default buttonContainer;
