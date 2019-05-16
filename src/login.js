import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import Home from "./home";
import App from "./App";

class LoginForm extends React.Component {
  // Using a class based component here because we're accessing DOM refs

  handleSignIn(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password);
  }

  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3 style={{ textAlign: "center" }}>Sign in</h3>
        <p>
          Username:{" "}
          <input type="text" ref="username" placeholder="enter you username" />
        </p>
        <p>
          Password:{" "}
          <input type="password" ref="password" placeholder="enter password" />
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    // the initial application state
    this.state = {
      user: null
    };
  }

  // App "actions" (functions that modify state)
  signIn(username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)

    this.setState({
      user: {
        username,
        password
      }
    });
  }
  signOut() {
    // clear out user from state
    this.setState({ user: null });
  }

  render() {
    // Here we pass relevant state to our child components
    // as props. Note that functions are passed using `bind` to
    // make sure we keep our scope to App
    return (
      <div>
        {this.state.user ? (
          <Home user={this.state.user.username} />
        ) : (
          <LoginForm onSignIn={this.signIn.bind(this)} />
        )}
      </div>
    );
  }
}

ReactDOM.render(Login, document.getElementById("root"));

export default Login;
