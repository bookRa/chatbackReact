import React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const PasswordForgetPage = () => {
  return (
    <div>
      <h1>Password Forget Page</h1>
      <PasswordForgetForm />
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        alert("check your email for your new pass");
      })
      .catch(error => this.setState({ error: error }));
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
