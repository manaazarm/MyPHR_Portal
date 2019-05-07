import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <body>
          <div class="row">
            <div class="column1">
              <img src="logo.svg" height="42" width="42" />
              <h2>Roya Juliani</h2>

              <div class="editor">
                <a href="#news">Edit Primary Information</a>
                <a href="#news">Notice of Name Change</a>
                <a href="#news">Change Contact Information</a>
              </div>
            </div>

            <div class="column2">
              <div class="topnav">
                <a class="active" href="#home">
                  Dashboard
                </a>
                <a href="#news">Profile</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
              </div>
              <h1>Today's Activities</h1>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default Home;
