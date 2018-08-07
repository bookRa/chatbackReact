import React from "react";
import { auth } from "../../firebase";

const PasswordChangePage = () => {
  return (
    <div>
      <h1>Password Change Page</h1>
      <PasswordChangeForm />
    </div>
  );
};

const INITIAL_STATE = {
  newPass1: "",
  newPass2: "",
  error: null
};

class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    auth
      .doPasswordUpdate(this.state.newPass1)
      .then(() => {
        alert("Your new pass is ready to go!");
        this.setState({ ...INITIAL_STATE });
      })
      .catch(e => {
        this.setState({ error: e });
      });
  };
  render() {
    const { newPass1, newPass2, error } = this.state;
    const allowed = newPass1 === newPass2;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={newPass1}
          onChange={e => this.setState({ newPass1: e.target.value })}
          placeholder="enter new password"
        />
        <input
          type="text"
          value={newPass2}
          onChange={e => this.setState({ newPass2: e.target.value })}
          placeholder="confirm new password"
        />
        <button disabled={!allowed} type="submit">
          Change Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangePage;
export { PasswordChangeForm };
