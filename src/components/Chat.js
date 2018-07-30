import React, { Component } from "react";
import Navbar from "./chat-components/Navbar";
import MainWindow from "./chat-components/MainWindow";
import StageHandler from "./chat-components/StageHandler";

class Chat extends Component {
	state = {
	    prompts: [
	      	{key: 'thoughts', btns: [
	      			{key: "an all or nothing thought", value: "an all or nothing thought that ", tooltip: "Simplifying into two extremes (e.g. either all good/all bad)"},
	      			{key: "a blaming thought", value: "a blaming thought thought ", tooltip: "Faulting a single source for all the trouble"},
	      			{key: "a mind reading thought", value: "a mind reading thought that ", tooltip: "Assuming you know people’s reasons or judgments"},
	      			{key: "an overgeneralizing thought", value: "an overgeneralizing thought that ", tooltip: "Thinking all incidents will be exactly like the one incident"},
	      			{key: "a personalizing thought", value: "a personalizing thought that ", tooltip: "Thinking a bad outcome results from a bad in you"},
	      			{key: "a worst case scenario thought", value: "a worst case scenario thought that ", tooltip: "Believing the worst is going to happen"}
	      		]
	      	},
	      	{key: 'feelings', btns: [
	      			{key: "angry", value: "angry "},
		      		{key: "anxious", value: "anxious "},
		      		{key: "apathetic", value: "apathetic "},
		      		{key: "ashamed", value: "ashamed "},
		      		{key: "bewildered", value: "bewildered "},
		      		{key: "bored", value: "bored "},
		      		{key: "confused", value: "confused "},
		      		{key: "critical", value: "critical "},
		      		{key: "depressed", value: "depressed "},
		      		{key: "discouraged", value: "discouraged "},
		      		{key: "distant", value: "distant "},
		      		{key: "embarrassed", value: "embarrassed "},
		      		{key: "frustrated", value: "frustrated "},
		      		{key: "guilty", value: "guilty "},
		      		{key: "hateful", value: "hateful "},
		      		{key: "helpless", value: "helpless "},
		      		{key: "hostile", value: "hostile "},
		      		{key: "hurt", value: "hurt "},
		      		{key: "inadequate", value: "inadequate "},
		      		{key: "inferior", value: "inferior "},
		      		{key: "insecure", value: "insecure "},
		      		{key: "insignificant", value: "insignificant "},
		      		{key: "irritated", value: "irritated "},
		      		{key: "isolated", value: "isolated "},
		      		{key: "jealous", value: "jealous "},
		      		{key: "lonely", value: "lonely "},
		      		{key: "mad", value: "mad "},
		      		{key: "overwhelmed", value: "overwhelmed "},
		      		{key: "rejected", value: "rejected "},
		      		{key: "remorseful", value: "remorseful "},
		      		{key: "sad", value: "sad "},
		      		{key: "sarcastic", value: "sarcastic "},
		      		{key: "scared", value: "scared "},
		      		{key: "selfish", value: "selfish "},
		      		{key: "sleepy", value: "sleepy "},
		      		{key: "stupid", value: "stupid "},
		      		{key: "submissive", value: "submissive "},
		      		{key: "tired", value: "tired "}
	      		]
	      	},
	      	{key: 'wants', btns: [
		      		{key: "amused", value: "amused "},
		      		{key: "appreciated", value: "appreciated "},
		      		{key: "aware", value: "aware "},
		      		{key: "cheerful", value: "cheerful "},
		      		{key: "confident", value: "confident "},
		      		{key: "content", value: "content "},
		      		{key: "creative", value: "creative "},
		      		{key: "daring", value: "daring "},
		      		{key: "discerning", value: "discerning "},
		      		{key: "energetic", value: "energetic "},
		      		{key: "excited", value: "excited "},
		      		{key: "fascinated", value: "fascinated "},
		      		{key: "hopeful", value: "hopeful "},
		      		{key: "important", value: "important "},
		      		{key: "intimate", value: "intimate "},
		      		{key: "joyful", value: "joyful "},
		      		{key: "loving", value: "loving "},
		      		{key: "nurturing", value: "nurturing "},
		      		{key: "optimistic", value: "optimistic "},
		      		{key: "peaceful", value: "peaceful "},
		      		{key: "pensive", value: "pensive "},
		      		{key: "playful", value: "playful "},
		      		{key: "powerful", value: "powerful "},
		      		{key: "proud", value: "proud "},
		      		{key: "relaxed", value: "relaxed "},
		      		{key: "respected", value: "respected "},
		      		{key: "responsive", value: "responsive "},
		      		{key: "secure", value: "secure "},
		      		{key: "sensuous", value: "sensuous "},
		      		{key: "serene", value: "serene "},
		      		{key: "successful", value: "successful "},
		      		{key: "thankful", value: "thankful "},
		      		{key: "thoughtful", value: "thoughtful "},
		      		{key: "trusting", value: "trusting "},
		      		{key: "valuable", value: "valuable "},
		      		{key: "worthwhile", value: "worthwhile "}
	      		]
	      	},
	      	{key: 'strategies', btns: [
	      			{key: "an action strategy", value: "an action strategy of ", tooltip: "A plan, behavior, timeline, or difference in your body"},
	      			{key: "a mindful strategy", value: "a mindful strategy of ", tooltip: "A new thought, reflection, or state of mind"},
	      			{key: "a social strategy", value: "a social strategy of ", tooltip: "Reaching out to supportive people, or changing your social scene"}
	      		]
	      	},
	      	{key: 'closer', btns: [
	      			{key: "Thank you!", value: "Thank you! ", tooltip: "Thank your partner in your own words"}
	      		]
	      	}
	    ]
  	}

  	sayHi = () => {
    	console.log("Hi");
  	}

  	jQuery('[data-toggle="tooltip"]').tooltip({
      trigger : 'hover'
    });

  	render() {
	    return (
	    	<div className="chat">
	        	<Navbar />
	        	<MainWindow prompts={this.state.prompts} clicked={this.sayHi}/>
	        	<StageHandler />
	        </div>
	    );
    	//return React.createElement('div', {classkey: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  	}
}

export default Chat;