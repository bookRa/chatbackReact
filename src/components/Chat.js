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
      finishedPrompts: [],
      selectedButtons: []
    };
  }

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
    if (button.classList.contains("ribbonButton")) {
      var card = document.querySelector(".indexCard");
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
      }
      button.classList.add("hidden");
      textarea.value += button.value;
    } else if (button.classList.contains("cardButton")) {
      if (button.classList.contains("pressed")) {
        button.classList.remove("pressed");
        var index = this.state.selectedButtons.indexOf(button.value);
        this.state.selectedButtons.splice(index, 1);
      } else {
        button.classList.add("pressed");
        this.state.selectedButtons.push(button.value);
      }
      console.log(this.state.selectedButtons);
    }
  };

  exitIndexCard() {
    var selectedButtons = document.querySelectorAll(".pressed");
    for (var i = 0; i < selectedButtons.length; i++) {
      var button = selectedButtons[i];
      button.classList.remove("pressed");
    }
    var card = document.querySelector(".indexCard");
    card.classList.add("hidden");
  }

  submitIndexCard() {
    this.exitIndexCard();
    var textarea = document.getElementById("chatText");
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
        if (
          msg.includes(this.state.prompts[0].keyword) &&
          !this.state.finishedPrompts.includes(this.state.prompts[0].key)
        ) {
          this.state.finishedPrompts.push(this.state.prompts[0].key);
          this.state.activePrompts.push(this.state.prompts[1].key);
        } else if (
          msg.includes(this.state.prompts[1].keyword) &&
          !this.state.finishedPrompts.includes(this.state.prompts[1].key)
        ) {
          this.state.finishedPrompts.push(this.state.prompts[1].key);
          this.state.activePrompts.push(this.state.prompts[2].key);
        } else if (
          this.state.prompts[2].keyword &&
          !this.state.finishedPrompts.includes(this.state.prompts[2].key)
        ) {
          this.state.finishedPrompts.push(this.state.prompts[2].key);
          this.state.activePrompts.push(this.state.prompts[3].key);
        } else if (
          this.state.prompts[3].keyword &&
          !this.state.finishedPrompts.includes(this.state.prompts[3].key)
        ) {
          this.state.finishedPrompts.push(this.state.prompts[3].key);
          this.state.activePrompts.push(this.state.prompts[4].key);
        } else if (
          this.state.prompts[4].keyword &&
          !this.state.finishedPrompts.includes(this.state.prompts[4].key)
        ) {
          this.state.finishedPrompts.push(this.state.prompts[4].key);
          this.state.activePrompts.push(this.state.prompts[5].key);
        } else if (
          this.state.finishedPrompts.length ===
          this.state.prompts.length - 1
        ) {
          this.state.finishedPrompts.push(this.state.prompts[5].key);
        }
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
                clicked={this.addText}
                submit={e => this.submitIndexCard()}
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
