import React from "react";

export default class BioForm extends React.Component {
  INIT = {
    gender: "Default",
    preferredGenderOfPartner: "Deffault",
    age: 23,
    username: "Default",
    uid: "Default"
  };

  handleSubmit = () => {
    console.log("You pressed");
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }
  // TODO: 3rd party React UI libraries
  render() {
    return (
      <div>
        <h2>Tell a bit about yoursel!</h2>
        <p>It will help us find you the best match</p>
        <form action="">
          First name: <br />
          <input type="text" /> <br />
          Last Name: <br />
          <input type="text" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
