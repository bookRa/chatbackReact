import React from 'react';

import './Ribbon.css';
import RibbonButton from './RibbonButton';

const ribbon = (props) => {
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
					<RibbonButton
						activePrompt={activePrompt}
						className="ribbonButton"
						name={prompts[index].mainBtn.key}
						key={prompts[index].mainBtn.key}
						value={prompts[index].mainBtn.value}
						title={prompts[index].mainBtn.tooltip}
						clickfunc={(e) => props.clicked(e)}
						clicked={props.clicked}
						btns={prompts[index].btns}
					/>
				);
			}
			index++;
		}
	}
  	return promptContainers;
};

export default ribbon;