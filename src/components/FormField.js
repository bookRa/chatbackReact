import React from 'react';

const formField = (props) => {
	return (
		<div className="group">      
	          <input
	            value={props.value}
	            onChange={props.onChange}
	            type={props.type}
	            autoFocus={props.focus}
	            required={props.req}
	          />
	          <span className="highlight"></span>
	          <span className="bar"></span>
	          <label className="form-label">{props.label}</label>
	          <span className="ps-strength"></span>
	          <span className="form-error">{props.error}</span>
        </div>
	)
};

export default formField;