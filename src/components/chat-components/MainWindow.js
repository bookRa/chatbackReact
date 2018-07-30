import React from 'react';
import Ribbon from './Ribbon';
import Slider from './Slider';

const mainWindow = (props) => {
	console.log(props.clicked)
	return (
		<div className="mainWindow">
			<div className="moodHelper">
				How troubled do you feel?
			</div>
			<div className="chatWindow">
				<Slider />
			</div>
			<div className="ribbon">
				<Ribbon  prompts={props.prompts} clicked={props.clicked}/>
			</div>
			<textarea id="chatText"></textarea>
		</div>
	)
};

export default mainWindow;