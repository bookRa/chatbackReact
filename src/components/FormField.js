import React from 'react';
import PwStrength from "./PasswordStrength";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

var length = 0;

function detectPwStrength(e) {
	var curLength = e.target.value.length;
	if (length !== curLength) {
		var diff = curLength - length;
		if (diff > 0) {
			for (var i = 1; i < 10; i++) {
				if (i <= curLength) {
					var box1 = document.querySelector(".pwStrength-box" + i);
					box1.classList.remove("invisible");
				}
			}
		} else {
			for (var j = length; j > curLength; j--) {
				if (j <= length && j < 10) {
					var box2 = document.querySelector(".pwStrength-box" + j);
					box2.classList.add("invisible");
				}
			}
		}
	}
	length = curLength;
}

function showPassword(e) {
	var icon = e.target;
	if (e.target.tagName === "path") {
		icon = e.target.parentElement;
	}
	var parent = icon.parentElement;
	var attr = icon.getAttribute("data-icon");
	icon.classList.add("hidden")
	if (attr === "eye") {
		var next = parent.querySelector(".fa-eye-slash");
		next.classList.remove("hidden");
	} else {
		var next = parent.querySelector(".fa-eye");
		next.classList.remove("hidden");
	}
	var parent = parent.parentElement;
	var ps = parent.querySelector("input");
	if (ps.getAttribute("type") === "password") {
		ps.setAttribute("type", "text");
	} else {
		ps.setAttribute("type", "password");
	}
}

const formField = (props) => {
	return (
		<div className="group">
			{props.bar ? (
        		<input
					value={props.value}
					onChange={props.onChange}
					type={props.type}
					autoFocus={props.focus}
					required={props.req}
					onKeyUp={e => detectPwStrength(e)}
					aria-label={props.label}
				/>
      		) : (
        		<input
					value={props.value}
					onChange={props.onChange}
					type={props.type}
					autoFocus={props.focus}
					required={props.req}
					aria-label={props.label}
				/>
      		)}
      		<label className="form-label">{props.label}</label>
			<span className="highlight"></span>
			<span className="bar"></span>
			{props.eye ? (
				<div>
					<FontAwesomeIcon
	          		icon={faEye}
	          		tabIndex="0"
	          		className="eye"
	          		onClick={(e) => showPassword(e)}
	        	/>
					<FontAwesomeIcon
		          		icon={faEyeSlash}
		          		tabIndex="0"
		          		className="eye hidden"
		          		onClick={(e) => showPassword(e)}
		        	/>
				</div>
			) : (
				<span></span>
			)}
			{props.bar ? (
        		<PwStrength />
      		) : (
        		<div></div>
      		)}
      		{props.helper !== null ? (
        		<span className="form-helper">{props.helper}</span>
      		) : (
        		<div></div>
      		)}
      		{props.error !== null ? (
        		<span className="form-helper">{props.error}</span>
      		) : (
        		<div></div>
      		)}
        </div>
	)
};

export default formField;