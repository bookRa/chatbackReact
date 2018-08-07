import React from 'react';
import Ribbon from './Ribbon';
import Slider from './Slider';

const mainWindow = (props) => {
	console.log(props.clicked)
	return (
		<div className="mainWindow">
			<div id="moodHelper">
				How troubled do you feel?
			</div>
			<div id="chatWindow">
				<Slider id="preMoodSlider"/>
			</div>
			<div id="ribbon" className="ribbon hidden">
				<Ribbon  prompts={props.prompts} clicked={(e) => props.clicked(e)}/>
			</div>
			<textarea id="chatText" className="hidden" onKeyDown={props.enter}></textarea>
		</div>
	)
};

export default mainWindow;