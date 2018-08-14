import React from 'react';
import ButtonContainer from './ButtonContainer';
import './Ribbon.css';

/*var i = 0;
	for(int i = 0; i < 6; i++) 
	{
		classNames = ["prompt", "hidden"];
		console.log(classNames);
	}

const ribbon = (props) => props.prompts.map((prompt, index) => {
	//console.log(i);
	console.log(index);
	var classNames = ["prompt"];
	if (i > 6) {
		classNames = ["prompt", "hidden"];
		console.log(classNames);
	}
	i++; 
  	return (
	  	<div id={props.prompts[index].key} className={classNames.join(" ")} key={props.prompts[index].key}>
	  		<ButtonContainer
	  			clicked={props.clicked}
	  			btns={props.prompts[index].btns}
	 		/>
	 	</div>
 	)
}); */

const ribbon = (props) => {
	var classNames = ["prompt"];
	var promptContainers = [];
	var prompts = props.prompts;
	var activePrompts = props.activePrompts;
	var finishedPrompts = props.finishedPrompts;
	for (var i = 0; i < activePrompts.length; i++) {
		var activePrompt = activePrompts[i];
		var keyFound = false;
		var index = 0;
		while (!keyFound && !finishedPrompts.includes(activePrompt)) {
			var key = prompts[index].key;
			if (key === activePrompt) {
				keyFound = true;
				promptContainers.push(
					<div id={activePrompt} className={classNames.join(" ")} key={activePrompt}>
						<ButtonContainer clicked={props.clicked} btns={prompts[index].btns}/>
					</div>
				);
			}
			index++;
		}
	}
  	return promptContainers;
};

export default ribbon;