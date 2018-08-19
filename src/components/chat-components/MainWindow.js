import React from "react";
import Ribbon from "./Ribbon";
import ChatBubble from "./ChatBubble";
//import Slider from "./Slider";

const mainWindow = props => {
  // console.log(props.clicked);
  //<Slider id="preMoodSlider" />
  //<div id="moodHelper">How troubled do you feel?</div>
  return (
    <div className="mainWindow">
      <div id="chatWindow">
        {props.messages ? (
          Object.keys(props.messages).map((key, index) => {
            // console.log(key, index);
            return (
              <ChatBubble
                username={props.messages[key].senderName}
                message={props.messages[key].msg}
                key={key}
                class="message"
              />
            );
          })
        ) : (
          <div>Nothing here yet</div>
        )}
      </div>
      <div id="ribbon" className="ribbon">
        <Ribbon
          prompts={props.prompts}
          activePrompts={props.activePrompts}
          finishedPrompts={props.finishedPrompts}
          clicked={e => props.clicked(e)}
        />
      </div>
      <textarea id="chatText" onKeyDown={props.enter} />
    </div>
  );
};

export default mainWindow;

// REcap: I have it set up where state is gathering the messages from dev_chat_id on the db. then it's mapping each of those msgs to a div, and throwing it into mainwindow. Now I have to change the append message so that it plays nicely with this.
