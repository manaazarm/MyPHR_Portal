import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import Profile from "./profile";
import Episodes from "./episodes";
import Alerts from "./alerts";
import photo from "./photo.png";
import LoginForm from "./login";
import * as serviceWorker from "./serviceWorker";
import { Route, NavLink, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <div className="app">
      <div className="body">
        <Route exact path="/login" component={() => <LoginForm />} />
      </div>
    </div>
    <div className="App">
      <header className="App-header" />
      <body>
        <div class="row">
          <div class="column1">
            <img src={photo} alt="Photo" />

            <h3>Roya Juliani</h3>

            <div class="editor">
              <a href="#news">Edit Primary Information</a>
              <a href="#news">Notice of Name Change</a>
              <a href="#news">Change Contact Information</a>
              <a href="/login">Sign Out</a>
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
              <Route path="/profile" component={Profile} eventKey="1" />
              <Route path="/episodes" component={Episodes} />
              <Route path="/alerts" component={Alerts} />
              <Route path="/login" component={LoginForm} />
            </div>
          </div>
        </div>
      </body>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
