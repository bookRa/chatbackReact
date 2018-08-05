import { database as db } from "./firebase";

let activeUserRef = db.ref("activeUsers/");
let profileRef = db.ref("userProfiles/");

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

//updates user profile
export const updateProfile = (uid, profileObj) => {
  return profileRef.child(uid).set(profileObj);
};
