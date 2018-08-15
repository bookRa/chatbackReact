import React from "react";
import { db } from "firbase";

class CHAT_NEW extends React.Component {
  constructor(props) {
    // the Convo ID is one of the props it will be recieving.
    super(props);
    this.state = {
      //This array of message Objects will be constantly updated based on the realtime DB
      convoID: "klnwli23234hr",
      authUser: props.authUser, //this user Object will be available from a higher-level component
      messages: [
        {
          senderId: "w928rjh2",
          senderName: "Joe",
          timeStamp: "2352498",
          text: "Hey what's up"
        },
        {
          senderId: "skfn243iht",
          senderName: "Mary",
          timeStamp: "235224352",
          text: "Not much u"
        }
      ]
      //...other state props we'll add eventually
    };
  }

  componentDidMount() {
    db.subscribeToDatabase(this.state.convoID); //will fetch messages as they appear
  }

  sendMessage = text => {
    //Every time user clicks send or presses enter. this fires.
    const { authUser, convoID } = this.state;
    msgObj = {
      senderId: authUser.uid,
      senderName: authUser.displayName,
      timeStamp: Date.now(),
      text: text
    };
    db.postMessage(msgObj, convoID);
  };

  render() {
    /* ..All the UI components and subcomponents of chat 
        Main Differences:
        the part that displays the chat looks like this:
    */

    {
      this.state.messages.map(message => {
        return <ChatBubble props={message} />; //you can also include some helper props like:
        return (
          <ChatBubble
            props={message}
            isMe={message.senderId === this.state.authUser.uid}
          />
        ); //determine if the bubble is left/green or right/white or whatever
        //... and unpack the rest of the props (date,text, sendername in the ChatBubble component definition)
      });
    }
    /* And the textbox, upon sending: */
    <form onSubmit={this.sendMessage} />;
  }
}
