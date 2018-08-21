const axios = require("axios");

// An asynch method to get ConvoID
export const getConvoId = userName => {
  console.log("requesting convo...");
  return axios.post("https://chatbackfullstacktest.herokuapp.com/match", {
    self: userName,
    partner: null,
    conversation: null
  });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(10);
  //   }, 1000);
  // });
};
