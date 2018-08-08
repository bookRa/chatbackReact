import { database as db } from "./firebase";

let activeUserRef = db.ref("activeUsers/");
let profileRef = db.ref("userProfiles/");
let convoRef = db.ref("conversations/");
/* Active User-Related DB Functions */

//this is the function that will store an active user in the fb db

export const addToActiveUsers = userObj => {
  return activeUserRef.child(userObj.uid).set({
    name: userObj.userName || "unknown"
  });
};

//this function removes the user from "Active Users" upon client disconnect
export const removeFromActiveUsersOnDisconnect = userObj => {
  return activeUserRef
    .child(userObj.uid)
    .onDisconnect()
    .remove();
};

//removes from "Active Users" upon SignOut
export const removeUserOnLogout = userId => {
  return activeUserRef.child(userId).remove();
};

//will return a snapshot of active users on which we perform a callback
export const showActiveUsers = cb => {
  return activeUserRef.on("value", snapshot => {
    cb(snapshot.val());
  });
};

/* User Profile-Related DB Functions */

//updates user profile
export const updateProfile = (uid, profileObj) => {
  return profileRef.child(uid).set(profileObj);
};

//returns user profile
export const getUserProfile = uid => {
  return profileRef.child(uid).once("value");
};

/* Conversation-Related DB Functions */
const DEV_CONVO_ID = "dev_chat_01"; //Hardcoded convo id for dev purposes

//Pushes message to a conversation thread. Also appends that message to a user's chat history.
export const postMsg = (msg, id) => {
  let rightNow = Date.now();
  convoRef
    .child(DEV_CONVO_ID)
    .push({
      sender: id,
      time: rightNow,
      msg: msg
    })
    .then(pushID => {
      profileRef.child("chatHistory").push({
        time: rightNow,
        msg: msg
      });
    });
};
