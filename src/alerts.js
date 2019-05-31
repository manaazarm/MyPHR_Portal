import React, { Component } from "react";
import "./App.css";

class Alerts extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div class="alert-links">
        <a href="#news">Configure a new alert</a>

        <a href="#news">Edit alerts</a>

        <br />

        <h5>Active Alerts:</h5>
      </div>
    );
  }
}

export default Alerts;
