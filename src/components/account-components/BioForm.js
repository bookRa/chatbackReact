import React from "react";
import "./BioForm.css";
import { db } from "../../firebase";

//TODO: Pulls initial state from database component did mount
const INITIAL_STATE = {
  myGender: "",
  prefGender: {},
  myAge: 0
  // Gonna leave these out for now because that is more of Auth metadata...
  // username: "Default",
  // uid: "Default"
};
export default class BioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log("You pressed");
    db.updateProfile(this.props.userId, this.state);
    // console.log(this.props.user);
  };

  formChange = e => {
    //coordinate between form and state
    let val;
    if (e.target.name === "myGender") {
      // console.log(e.target.id);
      val = e.target.id;
      this.setState({ myGender: val });
    } else if (e.target.name === "myAge") {
      // console.log(e.target.value);
      val = e.target.value;
      this.setState({ myAge: val });
    } else if (e.target.name === "prefGender") {
      let currPrefs = this.state.prefGender;
      currPrefs[e.target.id] = e.target.checked;
      val = currPrefs;
      this.setState({ prefGender: val });
    }
    // console.log(this.state);
  };

  // TODO: 3rd party React UI libraries
  render() {
    return (
      <div>
        <h2>Tell a bit about yoursel!</h2>
        <p>It will help us find you the best match</p>
        <form onChange={this.formChange} onSubmit={this.handleSubmit}>
          <fieldset>
            <legend> Your Gender </legend>

            <input type="radio" id="male" name="myGender" />
            <label htmlFor="male">male</label>

            <input type="radio" id="female" name="myGender" />
            <label htmlFor="female">female</label>

            <input type="radio" id="non-binary" name="myGender" />
            <label htmlFor="non-binary">non-binary</label>
          </fieldset>
          <fieldset>
            <legend> Preferred Gender of Conversation Partner </legend>

            <input type="checkbox" id="pref-dc" name="prefGender" />
            <label htmlFor="pref-dc">I don't care</label>

            <input type="checkbox" id="pref-male" name="prefGender" />
            <label htmlFor="pref-male">male</label>

            <input type="checkbox" id="pref-female" name="prefGender" />
            <label htmlFor="pref-female">female</label>

            <input type="checkbox" id="pref-non-binary" name="prefGender" />
            <label htmlFor="pref-non-binary">non-binary</label>
          </fieldset>
          <br />
          <fieldset>
            <legend>Age</legend>
            <input type="number" name="myAge" min="1" />
          </fieldset>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
