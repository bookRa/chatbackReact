import React, { Component } from "react";
import MainWindow from "./chat-components/MainWindow";
//import StageHandler from "./chat-components/StageHandler";
import { withRouter } from "react-router-dom";
import { PROMPTS } from "../constants/prompts";
import { RESPONSES } from "../constants/responses";
import "./Chat.css";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import { auth } from "../firebase/firebase"; //Just TEMPORARY DO NOT EXPOSE AUTH() TO THIS COMPONENT

class Chat extends Component {
  constructor(props) {
    super(props);
    // console.log("props");
    // console.log(props);
    let myConvId = props.location.state.convoId;
    this.state = {
      prompts: PROMPTS,
      activePrompts: ["concerns"],
      finishedPrompts: [],
      responses: RESPONSES,
      activeResponses: [],
      finishedResponses: [],
      convoId: myConvId || "dev_chat_02",
      partner: props.location.state.partner || "unknown",
      messages: {},
      user: {},
      selectedButtons: []
      };
  }
  /* Kyler: This prompts collection has to be stored in a seperate file, in ./constants for now */
  state = {
    prompts: [
      {
        key: "concerns",
        keyword: "concern",
        mainBtn: {
          key: "I'm concerned...",
          value: "I'm concerned that ",
          tooltip: "Share a concern that's causing stress, worry, or low mood"
        }
      },
      {
        key: "thoughts",
        keyword: "think",
        mainBtn: {
            key: "I'm thinking...",
            value: "I'm thinking ",
            tooltip: "Find a type of thought that fits your state of mind"
        },
        btns: [
          {
            key: "An all or nothing thought",
            value: "an all or nothing thought that ",
            tooltip:
              "Simplifying into two extremes (e.g. either all good/all bad)"
          },
          {
            key: "A blaming thought",
            value: "a blaming thought that ",
            tooltip: "Faulting a single source for all the trouble"
          },
          {
            key: "A mind reading thought",
            value: "a mind reading thought that ",
            tooltip: "Assuming you know people’s reasons or judgments"
          },
          {
            key: "An overgeneralizing thought",
            value: "an overgeneralizing thought that ",
            tooltip:
              "Thinking all incidents will be exactly like the one incident"
          },
          {
            key: "A personalizing thought",
            value: "a personalizing thought that ",
            tooltip: "Thinking a bad outcome results from a bad in you"
          },
          {
            key: "A worst case scenario thought",
            value: "a worst case scenario thought that ",
            tooltip: "Believing the worst is going to happen"
          }
        ]
      },
      {
        key: "feelings",
        keyword: "feel",
        mainBtn: {
          key: "I'm feeling...",
          value: "I'm feeling ",
          tooltip: "Find the feelings caused by your thoughts"
        },
        btns: [
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
        keyword: "feel",
        mainBtn: {
          key: "I want to feel...",
          value: "I want to feel ",
          tooltip: "Find the feelings that you want your thoughts to cause"
        },
        btns: [
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
        keyword: "try",
        mainBtn: {
          key: "I'll try...",
          value: "I'll try ",
          tooltip: "Share one thing you'll try"
        },
        btns: [
          {
            key: "An action strategy",
            value: "an action strategy of ",
            tooltip: "A plan, behavior, timeline, or difference in your body"
          },
          {
            key: "A mindful strategy",
            value: "a mindful strategy of ",
            tooltip: "A new thought, reflection, or state of mind"
          },
          {
            key: "A social strategy",
            value: "a social strategy of ",
            tooltip:
              "Reaching out to supportive people, or changing your social scene"
          }
        ]
      },
      {
        key: "closer",
        mainBtn: {
          key: "Thank you!",
          value: "Thank you! ",
          tooltip: "Thank your partner in your own words"
        }
      }
    ],
    responses: [
      {
        key: "concernsResponse",
        keyword: "concern",
        btn: {
          key: "You're concerned...",
          value: "You're concerned that ",
          tooltip: "Summarize their concern in your own words"
        }
      },
      {
        key: "thoughtsResponse",
        keyword: "think",
        btn: {
          key: "You're thinking...",
          value: "You're thinking that ",
          tooltip: "Summarize their thought in your own words"
        }
      },
      {
        key: "feelingsResponse",
        keyword: "feel",
        btn: {
          key: "You're feeling...",
          value: "You're feeling like ",
          tooltip: "Summarize their feelings in your own words"
        }
      }
    ],
    messages: {},
    user: {},
    activePrompts: ["concerns"],
    finishedPrompts: [],
    activeResponses: [],
    finishedResponses: [],
    selectedButtons: []
  };

  //subscribes to the firebase convoid upon loading **ID HARDCODED FOR NOW**
  componentDidMount() {
    this.setState({ user: auth.currentUser });
    console.log("MountedChat");
    // console.log(this.state.convoId);
    // console.log(this.props);
    let storeMsgsAsState = snap => {
      this.setState({ messages: snap.val() });
      //   console.log(snap.val());
    };
    db.convoSubscribe(this.state.convoId, storeMsgsAsState);
  }

  addText = event => {
    var button = event.target;
    var textarea = document.getElementById("chatText");
    if (button.tagName === "B") {
      button = event.target.parentElement;
    }
    if (button.classList.contains("cardButton")) {
      if (button.classList.contains("pressed")) {
        button.classList.remove("pressed");
        var index = this.state.selectedButtons.indexOf(button.value);
        this.state.selectedButtons.splice(index, 1);
      } else {
        button.classList.add("pressed");
        this.state.selectedButtons.push(button.value);
      }
    } else {
      var card = document.getElementById(button.id + "Card");
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
      }
      button.classList.add("hidden");
      textarea.value += button.value;
    }
  };
  /*
  enterChat() {
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
  };*/

  exitIndexCard(e) {
    var selectedButtons = document.querySelectorAll(".pressed");
    for (var i = 0; i < selectedButtons.length; i++) {
      var button = selectedButtons[i];
      button.classList.remove("pressed");
    }
    var card = null;
    if (e.target.classList.contains("submitBtn")) {
      card = e.target.parentElement.parentElement;
    } else {
      card = e.target.parentElement;
    }
    card.classList.add("hidden");
  }

  submitIndexCard(e) {
    this.exitIndexCard(e);
    var textarea = document.getElementById("chatText")
    for (var j = 0; j < this.state.selectedButtons.length; j++) {
      var value = this.state.selectedButtons[j];
      if (this.state.selectedButtons.length === 1) {
        textarea.value += value.toLowerCase();
      } else if (this.state.selectedButtons.length === 2) {
        if (j === 0) {
          textarea.value += value.toLowerCase() + "and ";
        } else {
          textarea.value += value.toLowerCase();
        }
      } else {
        if (j < this.state.selectedButtons.length - 2) {
          textarea.value +=
            value.toLowerCase().substring(0, value.length - 1) + ", ";
        } else if (j === this.state.selectedButtons.length - 2) {
          textarea.value +=
            value.toLowerCase().substring(0, value.length - 1) + ", and ";
        } else {
          textarea.value += value.toLowerCase();
        }
      }
    }
    this.setState({ selectedButtons: [] });
  }

  sendMessage = event => {
    var textarea = document.getElementById("chatText");
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      var msg = textarea.value;
      if (msg !== "") {
        db.postMsg(
          this.state.convoId,
          msg,
          this.state.user.uid,
          this.state.user.displayName
        );
        //repetitive prompt progression logic below-- could be made more dynamic?
        var text = msg.toLowerCase();
        if (text.includes(this.state.prompts[0].keyword) &&
            !text.includes("you") &&
            !this.state.finishedPrompts.includes(this.state.prompts[0].key)) {
          this.state.finishedPrompts.push(this.state.prompts[0].key);
          this.state.activePrompts.splice(0, 1);
          this.state.activePrompts.push(this.state.prompts[1].key);
        } else if (text.includes(this.state.prompts[1].keyword) &&
            !text.includes("you") &&
            !this.state.finishedPrompts.includes(this.state.prompts[1].key)) {
          this.state.finishedPrompts.push(this.state.prompts[1].key);
          this.state.activePrompts.splice(0, 1);
          this.state.activePrompts.push(this.state.prompts[2].key);
        } else if (text.includes(this.state.prompts[2].keyword) &&
            !text.includes("you") &&
            !this.state.finishedPrompts.includes(this.state.prompts[2].key)) {
          this.state.finishedPrompts.push(this.state.prompts[2].key);
          this.state.activePrompts.splice(0, 1);
          this.state.activePrompts.push(this.state.prompts[3].key);
        } else if (text.includes(this.state.prompts[3].keyword) &&
            !text.includes("you") &&
            !this.state.finishedPrompts.includes(this.state.prompts[3].key)) {
          this.state.finishedPrompts.push(this.state.prompts[3].key);
          this.state.activePrompts.splice(0, 1);
          this.state.activePrompts.push(this.state.prompts[4].key);
        } else if (text.includes(this.state.prompts[4].keyword) &&
            !this.state.finishedPrompts.includes(this.state.prompts[4].key)) {
          this.state.finishedPrompts.push(this.state.prompts[4].key);
          this.state.activePrompts.splice(0, 1);
          this.state.activePrompts.push(this.state.prompts[5].key);
        } else if (this.state.finishedPrompts.length === this.state.prompts.length - 1) {
          this.state.finishedPrompts.push(this.state.prompts[5].key);
          this.state.activePrompts.splice(0, 1);
        }
        // <------ BELOW IS FOR DEV / TESTING PURPOSES ONLY -------->
        if (text.includes(this.state.responses[0].keyword) &&
            text.includes("you") &&
            !this.state.finishedResponses.includes(this.state.responses[0].key)) {
          this.state.finishedResponses.push(this.state.responses[0].key);
          this.state.activeResponses.splice(0, 1);
          this.state.activeResponses.push(this.state.responses[1].key)
        } else if (text.includes(this.state.responses[1].keyword) &&
            text.includes("you") &&
            !this.state.finishedResponses.includes(this.state.responses[1].key)) {
          this.state.finishedResponses.push(this.state.responses[1].key);
          this.state.activeResponses.splice(0, 1);
          this.state.activeResponses.push(this.state.responses[2].key)
        } else if (text.includes(this.state.responses[2].keyword) &&
            text.includes("you") &&
            !this.state.finishedResponses.includes(this.state.responses[2].key)) {
          this.state.finishedResponses.push(this.state.responses[2].key);
          this.state.activeResponses.splice(0, 1);
        } 
        console.log(this.state.activeResponses);
        // append message to chat window (right side)
        // this.appendMessage(msg);
        // send message to server
        // socket.emit("send message", msg);
        textarea.value = "";
      }
    } else if (event.which === 8 || event.which === 46) {
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
                partnerName={this.state.partner}
                messages={this.state.messages}
                prompts={this.state.prompts}
                activePrompts={this.state.activePrompts}
                finishedPrompts={this.state.finishedPrompts}
                responses={this.state.responses}
                activeResponses={this.state.activeResponses}
                finishedResponses={this.state.finishedResponses}
                clicked={this.addText}
                submit={e => this.submitIndexCard(e)}
                enter={e => this.sendMessage(e)}
                user={this.state.user}
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

export default withRouter(Chat);
