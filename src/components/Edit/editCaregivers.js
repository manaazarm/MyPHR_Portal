import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";
import AddContact from "./addContact";
import CaregiverContact from "./caregiverContact";
import EditCaregiverContact from "./editCaregiverContact";

//TO DO: After Save!!!!
/*edit components */

class EditCaregivers extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("caregiver"));
    this.state = {
      isLoading: true,
      caregiver: clientToEdit,
      isEditCaregivers: false,
      isAddContact: false,
      name: "",
      relationship: "",
      is_primary: true,
      primaryName: [],
      primaryRelationship: [],
      newPN: "",
      newPR: "",
      secondName: [],
      secondRelationship: [],
      newSPN: "",
      newSPR: "",

      //break caregivers' contact info down to address, phone and email

      caregiverAddresses: [],
      caregiverPhones: [],
      caregiverEmails: []
    };
    this.editCancel = this.editCancel.bind(this);
    this.editCaregivers = this.editCaregivers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addContact = this.addContact.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  componentDidMount() {
    var addresses = [];
    var phones = [];
    var emails = [];
    //get caregivers' contact info
    for (let i = 0; i < this.state.caregiver.length; i++) {
      userService
        .getCaregiverContactInfo(
          JSON.parse(localStorage.getItem("oneUser")).client_id,
          JSON.parse(localStorage.getItem("oneUser")).token,
          1,
          this.state.caregiver[i].client_id
        )

        .then(data => {
          addresses[i] = data[0][1];
          phones[i] = data[1][1];
          emails[i] = data[2][1];
        });
    }

    this.setState({
      caregiverAddresses: addresses,
      caregiverPhones: phones,
      caregiverEmails: emails
    });

    //get name and relationship without mapping in render and set state

    //primary contact
    const result = this.state.caregiver.filter(word => word.is_primary == true);
    var t = [];
    var r = [];
    for (let i = 0; i < result.length; i++) {
      t.push(result[i].name);
      r.push(result[i].relationship);
    }

    this.setState({ primaryName: t, primaryRelationship: r });
    this.setState({ newPN: t, newPR: r });

    //second contact
    const result2 = this.state.caregiver.filter(
      word => word.is_primary == false
    );
    var t2 = [];
    var r2 = [];
    for (let i = 0; i < result2.length; i++) {
      t2.push(result2[i].name);
      r2.push(result2[i].relationship);
    }

    this.setState({ secondName: t2, secondRelationship: r2 });
    this.setState({ newSPN: t2, newSPR: r2 });
  }

  editCancel() {
    this.setState({
      isEditCaregivers: false
    });
  }
  editCaregivers() {
    this.setState({
      isEditCaregivers: true
    });
  }
  addContact() {
    this.setState({
      isAddContact: true
    });
    if (this.state.isAddContact) {
      return <AddContact />;
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChange2(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  ID = JSON.parse(localStorage.getItem("oneUser")).client_id;
  handleSubmit(event) {
    event.preventDefault();
    //primary
    if (
      this.state.newPN == this.state.primaryName &&
      this.state.newPR == this.state.primaryRelationship
    ) {
    } else {
      userService.editCaregivers(
        this.ID,
        this.TOKEN,
        this.state.newPN,
        this.state.newPR,
        true
      );
    }
    //second
    if (
      this.state.newSPN == this.state.secondName &&
      this.state.newSPR == this.state.secondRelationship
    ) {
    } else {
      userService.editCaregivers(
        this.ID,
        this.TOKEN,
        this.state.newSPN,
        this.state.newSPR,
        false
      );
    }
    this.setState({ isEditCaregivers: false });
  }
  render() {
    const {
      caregiver,
      isEditCaregivers,
      primaryName,
      primaryRelationship,
      secondName,
      secondRelationship,
      caregiverAddresses,
      caregiverPhones,
      caregiverEmails
    } = this.state;
    console.log("not changable:" + secondName + secondRelationship);
    console.log("idsssss:" + JSON.stringify(caregiverPhones));
    return (
      <div>
        {this.videoUrls}
        {!isEditCaregivers ? (
          <div>
            {caregiver.map((careg, index) => (
              <div>
                {careg.is_primary ? (
                  <div>
                    <p>
                      <strong>Primary Contact:</strong>{" "}
                    </p>
                    <ul>
                      <li>
                        <strong>Name: </strong>
                        {careg.name}
                      </li>

                      <li>
                        <strong> Relationship:</strong> {careg.relationship}
                      </li>
                      <CaregiverContact id={careg.client_id} />
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Second Contact:</strong>{" "}
                    </p>
                    <ul>
                      <li>
                        {" "}
                        <strong>Name: </strong>
                        {careg.name}
                      </li>
                      <li>
                        <strong> Relationship:</strong> {careg.relationship}{" "}
                      </li>
                      <CaregiverContact id={careg.client_id} />
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <Button variant="secondary" onClick={this.editCaregivers}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            {caregiver.map((careg, index) => (
              <div>
                {careg.is_primary ? (
                  <div>
                    <p>
                      <strong>Primary Contact:</strong>{" "}
                    </p>
                    <ul>
                      <li>
                        <strong>Name: </strong>{" "}
                        <input
                          value={this.state.newPN}
                          onChange={this.handleChange}
                          name="newPN"
                        />
                      </li>
                      <li>
                        <strong> Relationship:</strong>{" "}
                        <select
                          value={this.state.newPR}
                          onChange={this.handleChange}
                          name="newPR"
                        >
                          <option value="father">father</option>
                          <option value="mother">mother</option>
                        </select>
                      </li>
                      <EditCaregiverContact is_primary={careg.is_primary} />
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Second Contact:</strong>{" "}
                    </p>
                    <ul>
                      <li>
                        <strong>Name: </strong>{" "}
                        <input
                          value={this.state.newSPN}
                          onChange={this.handleChange2}
                          name="newSPN"
                        />
                      </li>
                      <li>
                        <strong> Relationship:</strong>{" "}
                        <select
                          value={this.state.newSPR}
                          onChange={this.handleChange2}
                          name="newSPR"
                        >
                          <option value="father">father</option>
                          <option value="mother">mother</option>
                          <option value="uncle">uncle</option>
                          <option value="aunt">aunt</option>
                        </select>
                      </li>
                      <EditCaregiverContact is_primary={careg.is_primary} />
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <ButtonToolbar>
              <Button variant="secondary" onClick={this.handleSubmit}>
                Save
              </Button>
              <Button variant="secondary" onClick={this.editCancel}>
                Cancel
              </Button>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  }
}

export default EditCaregivers;
