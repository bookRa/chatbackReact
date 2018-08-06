// import { axios } from "axios";
const axios = require("axios");

export const testFunc = () => {
  return axios.post("https://chatbackfullstacktest.herokuapp.com/users", {
    id: 80,
    gender: "Male",
    preferredGenderOfPartner: "Male",
    age: 23,
    username: "yyy",
    uid: "13a"
  });
};

export const testGet = () => {
  return axios.get("https://chatbackfullstacktest.herokuapp.com/users", {
    params: {
      uid: 124
    }
  });
};
