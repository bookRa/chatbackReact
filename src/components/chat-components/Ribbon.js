import React from 'react';
import ButtonContainer from './ButtonContainer';
//import classes from './Ribbon.css';

const ribbon = (props) => props.prompts.map((prompt, index) => {
	console.log(props.clicked)
  	return (
	  	<div className="prompt" key={props.prompts[index].key}>
	  		<ButtonContainer
	  			clicked={props.clicked}
	  			btns={props.prompts[index].btns}
	 		/>
	 	</div>
 	)
});

export default ribbon;