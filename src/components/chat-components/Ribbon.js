import React from 'react';
import ButtonContainer from './ButtonContainer';
import './Ribbon.css';

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