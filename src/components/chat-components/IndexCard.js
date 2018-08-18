import React from 'react';
import ButtonContainer from './ButtonContainer';
import "./IndexCard.css"

const indexCard = (props) => {
	return (
		<div className="indexCard hidden">
			{props.btns !== undefined ? (
				<div className="indexContainer">
					<h3>{props.title}</h3>
					<div className="buttonContainer">
		    			<ButtonContainer title={props.title} clicked={props.clicked} btns={props.btns} />
		    		</div>
	    		</div>
	  		) : (
	    		<div className="indexContainer">
	    			<h3>{props.title}</h3>
	    		</div>
	  		)}
		</div>
	)
};

export default indexCard;