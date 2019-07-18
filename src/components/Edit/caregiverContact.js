import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";

class CaregiverContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("caregiver"));
    this.state = {
      caregiverAddresses: [],
      caregiverPhones: [],
      caregiverEmails: []
    };
  }
  componentDidMount() {
    //get caregivers' contact info

    userService
      .getCaregiverContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1,
        this.props.id
      )

      .then(data => {
        this.setState({
          caregiverAddresses: data[0][1],
          caregiverPhones: data[1][1],
          caregiverEmails: data[2][1]
        });
      });
  }

  render() {
    return (
      <div>
        <li>
          <strong> Home Address: </strong>{" "}
          {this.state.caregiverAddresses.map(p => (
            <div class="inline">
              {p.type == "home" ? <div>{p.address}</div> : <div />}
            </div>
          ))}
        </li>
        <li>
          <strong> Mailing Address:</strong>{" "}
          {this.state.caregiverAddresses.map(p => (
            <div class="inline">
              {p.type == "mailing" ? <div>{p.address}</div> : <div />}
            </div>
          ))}
        </li>
        <li>
          <strong>Cell Phone: </strong>
          {this.state.caregiverPhones.map(p => (
            <div class="inline">
              {p.type == "cell" ? <div>{p.number}</div> : <div />}
            </div>
          ))}
        </li>
        <li>
          <strong> Home Phone:</strong>{" "}
          {this.state.caregiverPhones.map(p => (
            <div class="inline">
              {p.type == "home" ? <div>{p.number}</div> : <div />}
            </div>
          ))}
        </li>
        <strong> Email:</strong> {this.state.caregiverEmails}
      </div>
    );
  }
}

export default CaregiverContact;
