const axios = require("axios");

// An asynch method to get ConvoID
export const getConvoId = () => {
  return axios.post("https://chatbackfullstacktest.herokuapp.com/match", {
    self: "omar",
    partner: null,
    conversation: null
  });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(10);
  //   }, 1000);
  // });
};
