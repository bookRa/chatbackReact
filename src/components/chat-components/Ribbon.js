import React from 'react';

import './Ribbon.css';
import RibbonButton from './RibbonButton';

const ribbon = (props) => {
	var promptContainers = [];
	var prompts = props.prompts;
	var activePrompts = props.activePrompts;
	var finishedPrompts = props.finishedPrompts;
	var responses = props.responses;

	var activeResponses = props.activeResponses;
	var finishedResponses = props.finishedResponses;
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
						classes="promptButton ribbonButton btn"
						name={prompts[index].mainBtn.key}
						key={prompts[index].mainBtn.key}
						value={prompts[index].mainBtn.value}
						title={prompts[index].mainBtn.tooltip}
						clicked={props.clicked}
						clickfunc={(e) => props.clicked(e)}
						submit={props.submit}
						btns={prompts[index].btns}
					/>
				);
			}
			index++;
		}
	}
	for (var j = 0; j < activeResponses.length; j++) {
		var activeResponse = activeResponses[j];
		var responseKeyFound = false;
		var responseIndex = 0;
		while (!responseKeyFound && !finishedResponses.includes(activeResponse)) {
			var responseKey = responses[responseIndex].key;
			if (responseKey === activeResponse) {
				responseKeyFound = true;
				promptContainers.push(
					<RibbonButton
						activePrompt={activeResponse}
						classes="responseButton ribbonButton btn"
						name={responses[responseIndex].btn.key}
						key={responses[responseIndex].btn.key}
						value={responses[responseIndex].btn.value}
						title={responses[responseIndex].btn.tooltip}
						clickfunc={(e) => props.clicked(e)}
						submit={props.submit}
					/>
				);
			}
			responseIndex++;
		}
	}
  	return promptContainers;
};

export default ribbon;