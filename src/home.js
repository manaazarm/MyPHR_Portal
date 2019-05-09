import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import Profile from "./profile";
import Episodes from "./episodes";
import Alerts from "./alerts";
import photo from "./photo.png";
import { PropsRoute, PublicRoute, PrivateRoute } from "react-router-with-props";
import {
  Route,
  NavLink,
  Link,
  BrowserRouter as Router
} from "react-router-dom";

class Home extends Component {
  render() {
    console.log(this.props);
    let userName = this.props.user;
    console.log("test name:" + userName);
    return (
      <Router>
        <div className="App">
          <header className="App-header" />
          <body>
            <div class="row">
              <div class="column1">
                <img src={photo} alt="Photo" />

                <h3>{this.props.user}</h3>

                <div class="editor">
                  <a href="#news">Edit Primary Information</a>
                  <a href="#news">Notice of Name Change</a>
                  <a href="#news">Change Contact Information</a>
                  <a href="/login">Sign out</a>
                </div>
              </div>

              <div class="column2">
                <nav class="topnav">
                  <NavLink
                    to="/dashboard"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    {" "}
                    Profile
                  </NavLink>
                  <NavLink
                    to="/episodes"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    {" "}
                    Episodes
                  </NavLink>
                  <NavLink
                    to="/alerts"
                    className="nav-style"
                    activeClassName="selectedLink"
                  >
                    {" "}
                    Alerts
                  </NavLink>
                </nav>

                <div class="main-place">
                  <Route exact path="/dashboard" component={App} />
                  <Route
                    path="/profile"
                    render={props => (
                      <Profile {...props} user={this.props.user} />
                    )}
                  />
                  <Route path="/episodes" component={Episodes} />
                  <Route path="/alerts" component={Alerts} />
                </div>
              </div>
            </div>
          </body>
        </div>
      </Router>
    );
  }
}

export default Home;
