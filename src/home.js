import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import { userService } from "./service";
import Profile from "./profile";
import Episodes from "./episodes";
import Alerts from "./alerts";
import photo from "./photo.png";
import {
  Route,
  NavLink,
  Link,
  BrowserRouter as Router
} from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: {},
      basicInfo: {},
      
    };
  }
  componentDidMount() {
    this.setState({
      //client: JSON.parse(localStorage.getItem("client"))
    });
    userService
      .getClient(JSON.parse(localStorage.getItem("oneUser")).client_id)
      .then(data => this.setState({ client: JSON.parse(data) }));

    console.log("sssss" + localStorage.getItem("client"));

    userService
      .getBasicInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).user_id,
        JSON.parse(localStorage.getItem("oneUser")).token
      )
      .then(data => this.setState({ basicInfo: data }));

    userService
      .getEpisodes(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data =>
        this.setState({
          episodes_test: data
        })
      );
  }

  render() {
    const { client, basicInfo } = this.state;
    return (
      <Router>
        <div className="App">
          <header className="App-header" />
          <body>
            <div class="row">
              <div class="column1">
                <img src={photo} alt="Photo" />

                <h3>
                  {basicInfo.firstname} {basicInfo.surname}
                </h3>

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
                    to="/"
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
                  <Route
                    exact
                    path="/"
                    render={props => <App {...props} user={client.client_id} />}
                  />
                  <Route
                    path="/profile"
                    render={props => (
                      <Profile {...props} user={client.client_id} />
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
