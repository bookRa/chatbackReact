import React from 'react';
import ButtonContainer from './ButtonContainer';

const indexCard = (props) => {
	return (
		<div className="indexCard">
			{props.btns !== undefined ? (
	    		<ButtonContainer title={props.title} clicked={props.clicked} btns={props.btns} />
	  		) : (
	    		<h2>{props.title}</h2>
	  		)}
		</div>
	)
};

export default indexCard;