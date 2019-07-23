import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";

class Alerts extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      alerts: {},
      tag: []
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      client: JSON.parse(localStorage.getItem("client"))
    });

    userService.getAlerts().then(data =>
      this.setState({
        alerts: JSON.parse(data),
        tag: JSON.parse(data).tags,
        isLoading: false
      })
    );

    console.log("ggg:" + localStorage.getItem("alerts"));
  }

  render() {
    const { alerts, tag, isLoading } = this.state;

    console.log("xx" + JSON.stringify(alerts.tags));

    return (
      <div>
        <div class="alert-links">
          <a href="#news">Edit alerts</a>
        </div>
        <br />

        <h5>Active Alerts:</h5>

        {isLoading ? (
          <div>is loading...</div>
        ) : (
          <div>
            {tag.map(t => (
              <div>
                {t.type === "access_notification" ? (
                  <div>
                    <strong> ** Access Notification:</strong>
                    <ul>
                      <li>
                        You receive an email everytime a user accesses your
                        records
                      </li>
                      <li>Configured on: {t.configured_on}</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <strong> ** Activity Report:</strong>
                    <ul>
                      <li>You receive an activity report quarterly</li>
                      <li>Configured on: {t.configured_on}</li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Alerts;
