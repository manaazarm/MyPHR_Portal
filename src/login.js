import React from "react";
import "./App.css";
import { userService } from "./service";

class LoginForm extends React.Component {
  // Using a class based component here because we're accessing DOM refs
  constructor(props) {
    super(props);
    userService.logout();
    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSignIn(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, returnUrl } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    //this.setState({ loading: true });
    userService.login(username, password).then(
      user => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        this.props.history.push(from);
      },
      error => this.setState({ error, loading: false })
    );
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <form onSubmit={this.handleSignIn}>
        <h3 style={{ textAlign: "center" }}>Sign in</h3>
        <p>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            ref="username"
            placeholder="enter you username"
          />
        </p>
        <p>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            ref="password"
            placeholder="enter password"
          />
        </p>
        <p style={{ textAlign: "center" }}>
          <button disabled>Send Authentication Code</button>
        </p>
        <p style={{ textAlign: "center" }}>
          <button disabled>Answer Security Questions</button>
        </p>
        <p style={{ textDecoration: "underline" }}>
          Forgot your username or password?
        </p>
        <input style={{ textAlign: "center" }} type="submit" value="Login" />
        <p style={{ textAlign: "center", textDecoration: "underline" }}>
          Sign Up
        </p>
      </form>
    );
  }
}

export default LoginForm;
