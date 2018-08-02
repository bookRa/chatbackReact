import React from 'react';
import ButtonContainer from './ButtonContainer';
//import classes from './Ribbon.css';

var i = 0;

const ribbon = (props) => props.prompts.map((prompt, index) => {
	console.log(i);
	var classNames = ["prompt"];
	if (i === 1) {

		classNames = ["prompt", "hidden"];
		console.log(classNames);
	}
	i++;
  	return (
	  	<div className={classNames.join(" ")} key={props.prompts[index].key}>
	  		<ButtonContainer
	  			clicked={props.clicked}
	  			btns={props.prompts[index].btns}
	 		/>
	 	</div>
 	)
});

export default ribbon;