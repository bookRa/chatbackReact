import React from 'react';

import './Ribbon.css';
import RibbonButton from './RibbonButton';

const ribbon = (props) => {
	var promptContainers = [];
	var prompts = props.prompts;
	var activePrompts = props.activePrompts;
	var finishedPrompts = props.finishedPrompts;
	//var responses = props.responses;
	//var activeResponses = props.activeResponses;
	//var finishedResponses = props.finishedResponses;
	for (var i = 0; i < activePrompts.length; i++) {
		var activePrompt = activePrompts[i];
		for (var j = 0; j < prompts.length; j++) {
			if (!finishedPrompts.includes(activePrompt)) {
				if (prompts[j].key === activePrompt) {
					promptContainers.push(
						<RibbonButton
							activePrompt={activePrompt}
							classes="promptButton ribbonButton btn"
							name={prompts[j].mainBtn.key}
							key={prompts[j].mainBtn.key}
							value={prompts[j].mainBtn.value}
							title={prompts[j].mainBtn.tooltip}
							search={prompts[j].mainBtn.search}
							clicked={props.clicked}
							clickfunc={(e) => props.clicked(e)}
							submit={props.submit}
							btns={prompts[j].btns}
						/>
					);
				}
				if (prompts[j].response !== undefined) {
					if (prompts[j].response.key === activePrompt) {
						promptContainers.push(
							<RibbonButton
								activePrompt={activePrompt}
								classes="responseButton ribbonButton btn"
								name={prompts[j].response.mainBtn.key}
								key={prompts[j].response.key}
								value={prompts[j].response.mainBtn.value}
								title={prompts[j].response.mainBtn.tooltip}
								btns={prompts[j].response.btns}
								search={prompts[j].response.mainBtn.search}
								clicked={props.clicked}
								clickfunc={(e) => props.clicked(e)}
								submit={props.submit}
							/>
						);
					}
				}
				if (prompts[j].double !== undefined) {
					if (prompts[j].double.key === activePrompt) {
						promptContainers.push(
							<RibbonButton
								activePrompt={activePrompt}
								classes="doubleButton ribbonButton btn"
								name={prompts[j].double.mainBtn.key}
								key={prompts[j].double.key}
								value={prompts[j].double.mainBtn.value}
								title={prompts[j].double.mainBtn.tooltip}
								btns={prompts[j].double.btns}
								search={prompts[j].double.mainBtn.search}
								clicked={props.clicked}
								clickfunc={(e) => props.clicked(e)}
								submit={props.submit}
							/>
						);
					}
				}
			}
		}
	}/*
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
	}*/
  	return promptContainers;
};

export default ribbon;