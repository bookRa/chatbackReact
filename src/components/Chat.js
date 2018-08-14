import React, { Component } from "react";
import MainWindow from "./chat-components/MainWindow";
//import StageHandler from "./chat-components/StageHandler";
import "./Chat.css";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import { auth } from "../firebase/firebase"; //Just TEMPORARY DO NOT EXPOSE AUTH() TO THIS COMPONENT

class Chat extends Component {

  /* Kyler: This prompts collection has to be stored in a seperate file, in ./constants for now */
  state = {
    prompts: [
      {
        key: "concerns",
        btns: [
          {
            key: "I'm concerned...",
            value: "I'm concerned that ",
            tooltip: "Share a concern that's causing stress, worry, or low mood"
          }
        ]
      },
      {
        key: "thoughts",
        btns: [
          {
            key: "I'm thinking...",
            value: "I'm thinking ",
            tooltip: "Find a type of thought that fits your state of mind"
          },
          {
            key: "an all or nothing thought",
            value: "an all or nothing thought that ",
            tooltip:
              "Simplifying into two extremes (e.g. either all good/all bad)"
          },
          {
            key: "a blaming thought",
            value: "a blaming thought thought ",
            tooltip: "Faulting a single source for all the trouble"
          },
          {
            key: "a mind reading thought",
            value: "a mind reading thought that ",
            tooltip: "Assuming you know people’s reasons or judgments"
          },
          {
            key: "an overgeneralizing thought",
            value: "an overgeneralizing thought that ",
            tooltip:
              "Thinking all incidents will be exactly like the one incident"
          },
          {
            key: "a personalizing thought",
            value: "a personalizing thought that ",
            tooltip: "Thinking a bad outcome results from a bad in you"
          },
          {
            key: "a worst case scenario thought",
            value: "a worst case scenario thought that ",
            tooltip: "Believing the worst is going to happen"
          }
        ]
      },
      {
        key: "feelings",
        btns: [
          {
            key: "I'm feeling...",
            value: "I'm feeling ",
            tooltip: "Find the feelings caused by your thoughts"
          },
          { key: "angry", value: "angry " },
          { key: "anxious", value: "anxious " },
          { key: "apathetic", value: "apathetic " },
          { key: "ashamed", value: "ashamed " },
          { key: "bewildered", value: "bewildered " },
          { key: "bored", value: "bored " },
          { key: "confused", value: "confused " },
          { key: "critical", value: "critical " },
          { key: "depressed", value: "depressed " },
          { key: "discouraged", value: "discouraged " },
          { key: "distant", value: "distant " },
          { key: "embarrassed", value: "embarrassed " },
          { key: "frustrated", value: "frustrated " },
          { key: "guilty", value: "guilty " },
          { key: "hateful", value: "hateful " },
          { key: "helpless", value: "helpless " },
          { key: "hostile", value: "hostile " },
          { key: "hurt", value: "hurt " },
          { key: "inadequate", value: "inadequate " },
          { key: "inferior", value: "inferior " },
          { key: "insecure", value: "insecure " },
          { key: "insignificant", value: "insignificant " },
          { key: "irritated", value: "irritated " },
          { key: "isolated", value: "isolated " },
          { key: "jealous", value: "jealous " },
          { key: "lonely", value: "lonely " },
          { key: "mad", value: "mad " },
          { key: "overwhelmed", value: "overwhelmed " },
          { key: "rejected", value: "rejected " },
          { key: "remorseful", value: "remorseful " },
          { key: "sad", value: "sad " },
          { key: "sarcastic", value: "sarcastic " },
          { key: "scared", value: "scared " },
          { key: "selfish", value: "selfish " },
          { key: "sleepy", value: "sleepy " },
          { key: "stupid", value: "stupid " },
          { key: "submissive", value: "submissive " },
          { key: "tired", value: "tired " }
        ]
      },
      {
        key: "wants",
        btns: [
          {
            key: "I want to feel...",
            value: "I want to feel ",
            tooltip: "Find the feelings that you want your thoughts to cause"
          },
          { key: "amused", value: "amused " },
          { key: "appreciated", value: "appreciated " },
          { key: "aware", value: "aware " },
          { key: "cheerful", value: "cheerful " },
          { key: "confident", value: "confident " },
          { key: "content", value: "content " },
          { key: "creative", value: "creative " },
          { key: "daring", value: "daring " },
          { key: "discerning", value: "discerning " },
          { key: "energetic", value: "energetic " },
          { key: "excited", value: "excited " },
          { key: "fascinated", value: "fascinated " },
          { key: "hopeful", value: "hopeful " },
          { key: "important", value: "important " },
          { key: "intimate", value: "intimate " },
          { key: "joyful", value: "joyful " },
          { key: "loving", value: "loving " },
          { key: "nurturing", value: "nurturing " },
          { key: "optimistic", value: "optimistic " },
          { key: "peaceful", value: "peaceful " },
          { key: "pensive", value: "pensive " },
          { key: "playful", value: "playful " },
          { key: "powerful", value: "powerful " },
          { key: "proud", value: "proud " },
          { key: "relaxed", value: "relaxed " },
          { key: "respected", value: "respected " },
          { key: "responsive", value: "responsive " },
          { key: "secure", value: "secure " },
          { key: "sensuous", value: "sensuous " },
          { key: "serene", value: "serene " },
          { key: "successful", value: "successful " },
          { key: "thankful", value: "thankful " },
          { key: "thoughtful", value: "thoughtful " },
          { key: "trusting", value: "trusting " },
          { key: "valuable", value: "valuable " },
          { key: "worthwhile", value: "worthwhile " }
        ]
      },
      {
        key: "strategies",
        btns: [
          {
            key: "I'll try...",
            value: "I'll try ",
            tooltip: "Share one thing you'll try"
          },
          {
            key: "an action strategy",
            value: "an action strategy of ",
            tooltip: "A plan, behavior, timeline, or difference in your body"
          },
          {
            key: "a mindful strategy",
            value: "a mindful strategy of ",
            tooltip: "A new thought, reflection, or state of mind"
          },
          {
            key: "a social strategy",
            value: "a social strategy of ",
            tooltip:
              "Reaching out to supportive people, or changing your social scene"
          }
        ]
      },
      {
        key: "closer",
        btns: [
          {
            key: "Thank you!",
            value: "Thank you! ",
            tooltip: "Thank your partner in your own words"
          }
        ]
      }
    ],
    messages: {},
    user: {},
    activePrompts: ["concerns"],
    finishedPrompts: []
  };

  //subscribes to the firebase convoid upon loading **ID HARDCODED FOR NOW**
  componentDidMount() {
    this.setState({ user: auth.currentUser });
    console.log("MountedChat");
    let storeMsgsAsState = snap => {
      this.setState({ messages: snap.val() });
      //   console.log(snap.val());
    };
    db.convoSubscribe("dev_chat_01", storeMsgsAsState);
  }

  addText = event => {
    var button = event.target;
    if (button.classList.contains("ribbonButton")) {
      var tooltip = button.querySelector("span");
      console.log(button);
      console.log(tooltip.classList)
      if (tooltip.classList.contains("invisible") && tooltip.innerHTML !== "") {
        tooltip.classList.remove("invisible");
      } else {
        var textarea = document.getElementById("chatText");
        button.classList.add("hidden");
        textarea.value += button.value;
      }
    }
  };

  enterChat = event => {
    var moodHelper = document.getElementById("moodHelper");
    var preMoodSlider = document.getElementById("preMoodSlider");
    var textarea = document.getElementById("chatText");
    var ribbon = document.getElementById("ribbon");
    if (!moodHelper.classList.contains("hidden")) {
      moodHelper.classList.add("hidden");
      preMoodSlider.classList.add("hidden");
      event.target.classList.add("hidden");
      textarea.classList.remove("hidden");
      ribbon.classList.remove("hidden");
    }
  };

  appendMessage = data => {
    //data = splitString(data, "");
    var chatWindow = document.getElementById("chatWindow");
    var msg = document.createElement("div");
    msg.classList.add("message");
    msg.innerHTML = data;
    chatWindow.appendChild(msg);
    //chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  sendMessage = event => {
    var textarea = document.getElementById("chatText");
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      var msg = textarea.value;
      if (msg !== "") {
        db.postMsg(msg, this.state.user.uid, this.state.user.displayName);

        //repetitive logic below-- could be made more dynamic?
        if (msg.includes("concern") && !this.state.finishedPrompts.includes("concerns")) {
          this.state.finishedPrompts.push("concerns");
          this.state.activePrompts.push("thoughts");
        } else if ((msg.includes("thought") || msg.includes("think")) && !this.state.finishedPrompts.includes("thoughts")) {
          this.state.finishedPrompts.push("thoughts");
          this.state.activePrompts.push("feelings");
        } else if (msg.includes("feel") && !this.state.finishedPrompts.includes("feelings")) {
          this.state.finishedPrompts.push("feelings");
          this.state.activePrompts.push("wants");
        } else if (msg.includes("feel") && !this.state.finishedPrompts.includes("wants")) {
          this.state.finishedPrompts.push("wants");
          this.state.activePrompts.push("strategies");
        } else if (msg.includes("try") && !this.state.finishedPrompts.includes("strategies")) {
          this.state.finishedPrompts.push("strategies");
          this.state.activePrompts.push("closer");
        } else if (this.state.finishedPrompts.length === this.state.prompts.length - 1) {
          this.state.finishedPrompts.push("closer");
        }
        // append message to chat window (right side)
        // this.appendMessage(msg);
        // send message to server
        // socket.emit("send message", msg);
        textarea.value = "";
      }
    } else if (event.which === 8) {
      var buttons = document.querySelectorAll(".ribbonButton.hidden");
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.classList.remove("hidden");
      }
    }
  };

  render() {
    //<StageHandler clicked={this.enterChat} />
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            // <Navbar />
            <div className="chat">
              <MainWindow
                messages={this.state.messages}
                prompts={this.state.prompts}
                activePrompts={this.state.activePrompts}
                finishedPrompts={this.state.finishedPrompts}
                clicked={this.addText}
                enter={e => this.sendMessage(e)}
              />
            </div>
          ) : (
            <h1> Loading User </h1>
          )
        }
      </AuthUserContext.Consumer>
    );
    //return React.createElement('div', {classkey: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default Chat;
