import React from 'react';
//import classes from './Ribbon.css';

const ribbonButton = (props) => {
	return (
		<button className="ribbonButton btn">
			{props.name}
		</button>
	)
};


export default ribbonButton;