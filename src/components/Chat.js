import React, { Component } from "react";
import MainWindow from "./chat-components/MainWindow";
//import StageHandler from "./chat-components/StageHandler";
import { withRouter } from "react-router-dom";
import { PROMPTS } from "../constants/prompts";
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
      convoId: myConvId || "dev_chat_02",
      partner: props.location.state.partner,
      messages: {},
      user: {},
      activePrompts: ["concerns"],
      finishedPrompts: []
    };
  }

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
    if (button.classList.contains("ribbonButton")) {
      var tooltip = button.querySelector("span");
      // console.log(button);
      // console.log(tooltip.classList);
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

        //repetitive logic below-- could be made more dynamic?
        if (
          msg.includes("concern") &&
          !this.state.finishedPrompts.includes("concerns")
        ) {
          this.state.finishedPrompts.push("concerns");
          this.state.activePrompts.push("thoughts");
        } else if (
          (msg.includes("thought") || msg.includes("think")) &&
          !this.state.finishedPrompts.includes("thoughts")
        ) {
          this.state.finishedPrompts.push("thoughts");
          this.state.activePrompts.push("feelings");
        } else if (
          msg.includes("feel") &&
          !this.state.finishedPrompts.includes("feelings")
        ) {
          this.state.finishedPrompts.push("feelings");
          this.state.activePrompts.push("wants");
        } else if (
          msg.includes("feel") &&
          !this.state.finishedPrompts.includes("wants")
        ) {
          this.state.finishedPrompts.push("wants");
          this.state.activePrompts.push("strategies");
        } else if (
          msg.includes("try") &&
          !this.state.finishedPrompts.includes("strategies")
        ) {
          this.state.finishedPrompts.push("strategies");
          this.state.activePrompts.push("closer");
        } else if (
          this.state.finishedPrompts.length ===
          this.state.prompts.length - 1
        ) {
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
                partnerName={this.state.partner}
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

export default withRouter(Chat);
