import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";

class EditCaregiverContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(
      localStorage.getItem("caregiverContactInfo")
    );
    this.state = {
      caregiverAddresses: clientToEdit[0][1],
      caregiverPhones: clientToEdit[1][1],
      caregiverEmails: clientToEdit[2][1],
      homeAddress: {},
      mailingAddress: {},
      otherAddress: {},
      homePhone: {},
      cellPhone: {},

      //new input values:
      newMA: {},
      newOA: {},
      newHP: {},
      newCP: {},
      newEmail: {},
      newHA: {},
      errors: {}
    };
    this.handleHAChange = this.handleHAChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleMAChange = this.handleMAChange.bind(this);
    this.handleHPChange = this.handleHPChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const ha = this.state.caregiverAddresses.filter(
      word => word.type == "home"
    );
    if (ha.length != 0) {
      this.setState({ homeAddress: ha[0].address, newHA: ha[0].address });
    } else {
      this.setState({ homeAddress: ha[0], newHA: ha[0] });
    }

    const ma = this.state.caregiverAddresses.filter(
      word => word.type == "mailing"
    );
    if (ma.length != 0) {
      this.setState({ mailingAddress: ma[0].address, newMA: ma[0].address });
    } else {
      this.setState({ mailingAddress: ma[0], newMA: ma[0] });
    }

    const oa = this.state.caregiverAddresses.filter(
      word => word.type == "other"
    );
    if (oa.length != 0) {
      this.setState({ otherAddress: oa[0].address, newOA: oa[0].address });
    } else {
      this.setState({ otherAddress: oa[0], newOA: oa[0] });
    }

    const cp = this.state.caregiverPhones.filter(word => word.type == "cell");
    if (cp.length != 0) {
      this.setState({
        cellPhone: "+" + cp[0].country_code + " " + cp[0].number,
        newCP: "+" + cp[0].country_code + " " + cp[0].number
      }); ///IF Differnet code????????
    } else {
      this.setState({ cellPhone: cp[0], newCP: cp[0] }); ///IF Differnet code????????
    }

    const hp = this.state.caregiverPhones.filter(word => word.type == "home");
    if (hp.length != 0) {
      this.setState({
        homePhone: "+" + hp[0].country_code + " " + hp[0].number,
        newHP: "+" + hp[0].country_code + " " + hp[0].number
      });
    } else {
      this.setState({ homePhone: hp[0], newHP: hp[0] });
    }

    this.setState({ newEmail: this.state.caregiverEmails });
  }
  //handle phone number change
  handlePhoneChange(value) {
    this.setState({
      newCP: value
    });
  }
  handleHPChange(value) {
    this.setState({
      newHP: value
    });
  }
  //handle addresses change
  handleMAChange(event) {
    this.setState({ newMA: event.target.value });
  }
  handleOAChange(event) {
    this.setState({ newOA: event.target.value });
  }
  handleHAChange(event) {
    this.setState({ newHA: event.target.value });
  }

  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  ID = JSON.parse(localStorage.getItem("oneUser")).client_id;
  handleSubmit() {
    //mailing address
    if (this.state.newMA == this.state.mailingAddress) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newMA,
        "mailing",
        this.props.is_primary
      );
      this.setState({ mailingAddress: this.state.newMA });
    }

    //other address
    if (this.state.newOA == this.state.otherAddress) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newOA,
        "other"
      );
      this.setState({ otherAddress: this.state.newOA });
    }

    //cell phone
    if (this.state.newCP == this.state.cellPhone) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newCP,
        "cell"
      );
      this.setState({ cellPhone: this.state.newCP });
    }
    //home phone
    if (this.state.newHP == this.state.homePhone) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newHP,
        "home"
      );
      this.setState({ homePhone: this.state.newHP });
    }

    //email
    if (this.state.newEmail == this.state.emailInfo) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "email",
        this.state.newEmail,
        "main"
      );
      this.setState({ emailInfo: this.state.newEmail });
    }
  }

  render() {
    return (
      <div>
        <li>
          <strong> Home Address: </strong>{" "}
          <input
            placeholder="home address"
            value={this.state.newHA || ""}
            onChange={this.handleHAChange}
          />
        </li>
        <li>
          <strong> Mailing Address:</strong>{" "}
          <input
            placeholder="mailing address"
            value={this.state.newMA || ""}
            onChange={this.handleMAChange}
          />
        </li>
        <li>
          <strong>Cell Phone: </strong>
          <input
            placeholder="cell phone"
            value={this.state.newCP || ""}
            onChange={this.handlePhoneChange}
          />
        </li>
        <li>
          <strong> Home Phone:</strong>{" "}
          <input
            placeholder="home phone"
            value={this.state.newHP || ""}
            onChange={this.handleHPChange}
          />
        </li>
        <strong> Email:</strong>
        <input
          type="email"
          value={this.state.newEmail}
          onChange={this.handleEChange}
        />
      </div>
    );
  }
}

export default EditCaregiverContact;
