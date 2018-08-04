// import { axios } from "axios";
const axios = require("axios");

export const testFunc = () => {
  axios
    .post("https://chatbackfullstacktest.herokuapp.com/users", {
      gender: "Male",
      preferredGenderOfPartner: "Male",
      age: 23,
      username: "yyy",
      uid: "13a"
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));
};
