import React from 'react';

const chatBubble = (props) => {
	return (
		<div className={props.class}>
			{props.username}: {props.message}
		</div>
	)
};

export default chatBubble;