import React, { Component } from "react";
import MainWindow from "./chat-components/MainWindow";
//import StageHandler from "./chat-components/StageHandler";
import { withRouter } from "react-router-dom";
import { PROMPTS } from "../constants/prompts";
//import { RESPONSES } from "../constants/responses";
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
      convoId: myConvId || "dev_chat_02",
      partner: props.location.state.partner,
      messages: {},
      user: {},
      pushedButtons: [],
      selectedButtons: []
    };
  }

  //subscribes to the firebase convoid upon loading **ID HARDCODED FOR NOW**
  componentDidMount() {
    console.log("MountedChat");
    // console.log(this.state.convoId);
    // console.log(this.props);
    let storeMsgsAsState = snap => {
      let messageList = snap.val();
      let lastMsg =
        messageList[
          Object.keys(messageList)[Object.keys(messageList).length - 1]
        ];
      // console.log(lastMsg);
      this.setState({ user: auth.currentUser }, () => this.appendResponses(lastMsg));
      this.setState({ messages: snap.val() });
      //   console.log(snap.val());
    };
    db.convoSubscribe(this.state.convoId, storeMsgsAsState);
  }
  // appendResponses(msgObj) {
  //   console.log(msgObj);
  // }
  appendResponses(msgObj) {
    // this function is being called before user is fully mounted into State
    console.log(this.state.user);
    if (msgObj.prompt !== undefined) {
      if (msgObj.sender === this.state.user.uid || msgObj.prompt.length === 0) {
       return;
      }
      let prompts = msgObj.prompt.filter(p => !p.includes("Double")); //array of prompts from prev message
      console.log(prompts);
      //Do some logic on prompts to call up appropriate Responses, and append to this.state.activePrompts
      for (let p of prompts) {
        console.log(p);
        let ourPrompt;
        for (let lookup of PROMPTS) {
          if (lookup.key === p) {
            ourPrompt = lookup;
            break;
          }
        }
        let currPrompts = this.state.activePrompts;
        if (ourPrompt) {
          if (ourPrompt.response) {
            currPrompts.push(ourPrompt.response.key);
            this.setState({ activePrompt: currPrompts });
          }
        }   
      }
    }
  }

  addText(e) {
    var button = e.target;
    var textarea = document.getElementById("chatText");
    if (button.tagName === "B") {
      button = button.parentElement;
    } else if (button.tagName === "INPUT") {
      button = button.parentElement.parentElement;
    }
    if (button.classList.contains("cardButton")) {
      var currSelected = this.state.selectedButtons;
      if (button.classList.contains("pressed")) {
        button.classList.remove("pressed");
        var index = this.state.selectedButtons.indexOf(button);
        currSelected.splice(index, 1);
      } else {
        button.classList.add("pressed");
        currSelected.push(button);
      }
      this.setState({ selectedButtons: currSelected });
    } else {
      var card = document.getElementById(button.id + "Card");
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
      }
      button.classList.add("hidden");
      var currPushed = this.state.pushedButtons;
      currPushed.push(button.id);
      this.setState({ pushedButtons: currPushed });
      textarea.value += button.value;
    }
  }

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
    var prompt = card.id.substr(0, card.id.length - 4);
    for (var i = 0; i < this.state.prompts.length; i++) {
      var double = this.state.prompts[i].double;
      if (double !== undefined) {
        var currPrompts = this.state.activePrompts;
        if (double.key === prompt + "Double") {
          currPrompts.push(double.key);
        }
        this.setState({ activePrompts : currPrompts});
      }
    }
  }

  hideCard() {
    var cards = document.querySelectorAll(".indexCard");
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (!card.classList.contains("hidden")) {
        card.classList.add("hidden");
      }
    }
  }

  submitIndexCard(e) {
    this.exitIndexCard(e);
    var textarea = document.getElementById("chatText");
    var selectedButtons = this.state.selectedButtons;
    if (selectedButtons.length > 0) {
      var prompt =
        selectedButtons[0].parentElement.parentElement.parentElement
          .parentElement;
      prompt = prompt.id.substr(0, prompt.id.length - 4);
      var string = "";
      var tail = undefined;
      var tailPlural = undefined;
      for (var i = 0; i < this.state.prompts.length; i++) {
        var key = this.state.prompts[i].key;
        if (key === prompt) {
          tail = this.state.prompts[i].mainBtn.tail;
          tailPlural = this.state.prompts[i].mainBtn.tailPlural;
        }
      }
      for (var j = 0; j < selectedButtons.length; j++) {
        var value = selectedButtons[j].value;
        if (value === "") {
          if (selectedButtons[j].childNodes[4] !== undefined) {
            value = selectedButtons[j].childNodes[4].childNodes[0].value + " ";
          } else {
            value = selectedButtons[j].childNodes[2].childNodes[0].value + " ";
          }
        }
        if (selectedButtons.length === 1) {
          if (tail !== undefined) {
            if (tail.charAt(0) === tail.charAt(0).toUpperCase()) {
              string += value.substr(0, value.length - 1) + ". ";
            } else {
              string += value;
            }
          } else {
            string += value;
          }
        } else if (selectedButtons.length === 2) {
          if (j === 0) {
            string += value + "and ";
          } else {
            if (tail !== undefined) {
              if (tail.charAt(0) === tail.charAt(0).toUpperCase()) {
                string += value.substr(0, value.length - 1) + ". ";
              } else {
                string += value;
              }
            } else {
              string += value;
            }
          }
        } else {
          if (j < selectedButtons.length - 2) {
            string += value.substring(0, value.length - 1) + ", ";
          } else if (j === selectedButtons.length - 2) {
            string += value.substring(0, value.length - 1) + " and ";
          } else {
            if (tail !== undefined) {
              if (tail.charAt(0) === tail.charAt(0).toUpperCase()) {
                string += value.substr(0, value.length - 1) + ". ";
              } else {
                string += value;
              }
            } else {
              string += value;
            }
          }
        }
      }
      if (tail !== undefined) {
        if (tailPlural !== undefined) {
          if (selectedButtons.length === 1) {
            string += tail;
          } else {
            string += tailPlural;
          }
        } else {
          string += tail;
        }
      }
      if (textarea.value === "" || textarea.value.slice(-2) === ". ") {
        textarea.value += string.charAt(0).toUpperCase() + string.slice(1);
      } else if (textarea.value.slice(-1) === ".") {
        textarea.value +=
          " " + string.charAt(0).toUpperCase() + string.slice(1);
      } else {
        textarea.value += string;
      }
      this.setState({ selectedButtons: [] });
    }
  }

  sendMessage = event => {
    var textarea = document.getElementById("chatText");
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      var msg = textarea.value;
      if (msg !== "") {
        // checks if a prompt-button has been clicked then updates activePrompts/finishedPrompts
        // to progress to next prompt
        var prompts = this.state.prompts;
        var activePrompts = this.state.activePrompts;
        var finishedPrompts = this.state.finishedPrompts;
        for (var i = 0; i < this.state.pushedButtons.length; i++) {
          var id = this.state.pushedButtons[i];
          for (var j = 0; j < prompts.length; j++) {
            var prompt = prompts[j];
            var response = prompt.response;
            var double = prompt.double;
            if (prompt.key === id) {
              finishedPrompts.push(prompt.key);
              activePrompts.splice(activePrompts.indexOf(prompt.key), 1);
              if (response !== undefined) {
                console.log(response.key);
              }
              if (double !== undefined) {
                if (!finishedPrompts.includes(double.key)) {
                  finishedPrompts.push(double.key);
                  activePrompts.splice(activePrompts.indexOf(double.key), 1);
                }
              }
              // edge case that does not execute for the last prompt
              if (j !== prompts.length - 1) {
                activePrompts.push(prompts[j + 1].key);
              }
            }
            if (prompt.response !== undefined) {
              if (prompt.response.key === id) {
                finishedPrompts.push(id);
                activePrompts.splice(activePrompts.indexOf(id), 1);
              }
            }
            if (double !== undefined) {
              if (double.key === id) {
                if (!finishedPrompts.includes(double.key)) {
                  if (!finishedPrompts.includes(prompt.key)) {
                    finishedPrompts.push(prompt.key);
                    activePrompts.splice(activePrompts.indexOf(prompt.key), 1);
                    if (j !== prompts.length - 1) {
                      activePrompts.push(prompts[j + 1].key);
                    }
                  }
                  finishedPrompts.push(double.key);
                  activePrompts.splice(activePrompts.indexOf(double.key), 1);
                }
              }
            }
          }
        }
        db.postMsg(this.state.convoId, {
          prompt: this.state.pushedButtons,
          msg: msg,
          sender: this.state.user.uid,
          senderName: this.state.user.displayName,
          time: Date.now()
        });
        this.setState({ pushedButtons: [] });
        textarea.value = "";
      }
    } else if (event.which === 8 || event.which === 46) {
      var buttons = document.querySelectorAll(".ribbonButton.hidden");
      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.classList.remove("hidden");
      }
      this.setState({ pushedButtons: [] });
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
                clicked={e => this.addText(e)}
                submit={e => this.submitIndexCard(e)}
                focus={() => this.hideCard()}
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
