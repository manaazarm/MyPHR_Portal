import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";
import AddContact from "./addContact";
import CaregiverContact from "./caregiverContact";

/* component for displaying & editing Caregivers */
//Two api calls, one for name and relationship, the other for contact info

class EditCaregivers extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("caregiver"));
    const caregiverToEdit = JSON.parse(
      localStorage.getItem("caregiverContactInfo")
    );
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
      errors: "",
      //break caregivers' contact info down to address, phone and email
      id1: clientToEdit.filter(word => word.is_primary == true)[0].client_id,
      id2: clientToEdit.filter(word => word.is_primary == false)[0].client_id
    };
    this.editCancel = this.editCancel.bind(this);
    this.editCaregivers = this.editCaregivers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addContact = this.addContact.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.handleChangeP = this.handleChangeP.bind(this);
    this.handleChangeS = this.handleChangeS.bind(this);
  }

  componentDidMount() {
    /* edit name or relationship */

    //primary contact
    const result = this.state.caregiver.filter(word => word.is_primary == true);
    var t = [];
    var r = [];

    for (let i = 0; i < result.length; i++) {
      t.push(result[i].name);
      r.push(result[i].relationship);
    }

    this.setState({
      primaryName: t,
      primaryRelationship: r,
      newPN: t,
      newPR: r
    });

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

    this.setState({
      secondName: t2,
      secondRelationship: r2,
      newSPN: t2,
      newSPR: r2
    });
    this.setState({});

    /* get caregivers' contact info */

    //primary
    userService
      .getCaregiverContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1,
        this.state.id1
      )

      .then(data => {
        if (data[1][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homePhone: data[1][1].filter(word => word.type == "home")[0].number,
            newHP: data[1][1].filter(word => word.type == "home")[0].number
          });
        } else {
          this.setState({
            homePhone: data[1][1].filter(word => word.type == "home")[0],
            newHP: data[1][1].filter(word => word.type == "home")[0]
          });
        }

        if (data[1][1].filter(word => word.type === "cell").length != 0) {
          this.setState({
            cellPhone: data[1][1].filter(word => word.type == "cell")[0].number,
            newCP: data[1][1].filter(word => word.type == "cell")[0].number
          });
        } else {
          this.setState({
            cellPhone: data[1][1].filter(word => word.type == "cell")[0],
            newCP: data[1][1].filter(word => word.type == "cell")[0]
          });
        }

        if (data[0][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homeAddress: data[0][1].filter(word => word.type == "home")[0]
              .address,
            newHA: data[0][1].filter(word => word.type == "home")[0].address
          });
        } else {
          this.setState({
            homeAddress: data[0][1].filter(word => word.type == "home")[0],
            newHA: data[0][1].filter(word => word.type == "home")[0]
          });
        }
        if (data[0][1].filter(word => word.type === "mailing").length != 0) {
          this.setState({
            mailingAddress: data[0][1].filter(word => word.type == "mailing")[0]
              .address,
            newMA: data[0][1].filter(word => word.type == "mailing")[0].address
          });
        } else {
          this.setState({
            mailingAddress: data[0][1].filter(
              word => word.type == "mailing"
            )[0],
            newMA: data[0][1].filter(word => word.type == "mailing")[0]
          });
        }

        this.setState({
          email: data[2][1],
          newEmail: data[2][1]
        });
      });

    //second:
    userService
      .getCaregiverContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1,
        this.state.id2
      )

      .then(data => {
        if (data[1][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homePhone2: data[1][1].filter(word => word.type == "home")[0]
              .number,
            newHP2: data[1][1].filter(word => word.type == "home")[0].number
          });
        } else {
          this.setState({
            homePhone2: data[1][1].filter(word => word.type == "home")[0],
            newHP2: data[1][1].filter(word => word.type == "home")[0]
          });
        }

        if (data[1][1].filter(word => word.type === "cell").length != 0) {
          this.setState({
            cellPhone2: data[1][1].filter(word => word.type == "cell")[0]
              .number,
            newCP2: data[1][1].filter(word => word.type == "cell")[0].number
          });
        } else {
          this.setState({
            cellPhone2: data[1][1].filter(word => word.type == "cell")[0],
            newCP2: data[1][1].filter(word => word.type == "cell")[0]
          });
        }

        if (data[0][1].filter(word => word.type === "home").length != 0) {
          this.setState({
            homeAddress2: data[0][1].filter(word => word.type == "home")[0]
              .address,
            newHA2: data[0][1].filter(word => word.type == "home")[0].address
          });
        } else {
          this.setState({
            homeAddress2: data[0][1].filter(word => word.type == "home")[0],
            newHA2: data[0][1].filter(word => word.type == "home")[0]
          });
        }
        if (data[0][1].filter(word => word.type === "mailing").length != 0) {
          this.setState({
            mailingAddress2: data[0][1].filter(
              word => word.type == "mailing"
            )[0].address,
            newMA2: data[0][1].filter(word => word.type == "mailing")[0].address
          });
        } else {
          this.setState({
            mailingAddress2: data[0][1].filter(
              word => word.type == "mailing"
            )[0],
            newMA2: data[0][1].filter(word => word.type == "mailing")[0]
          });
        }

        this.setState({
          email2: data[2][1],
          newEmail2: data[2][1]
        });
      });
  }
  componentWillMount() {}
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

  //primary contact info change
  handleChangeP(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  //second
  handleChangeS(event) {
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

    /* Primary contact info */
    //mailing address
    if (this.state.newMA == this.state.mailingAddress) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newMA,
        "mailing",
        1
      );
      this.setState({ mailingAddress: this.state.newMA });
    }

    //home address
    if (this.state.newHA == this.state.homeAddress) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newHA,
        "home",
        1
      );
      this.setState({ homeAddress: this.state.newHA });
    }

    //cell phone
    if (this.state.newCP == this.state.cellPhone) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newCP,
        "cell",
        1
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
        "home",
        1
      );
      this.setState({ homePhone: this.state.newHP });
    }

    //email
    if (this.state.newEmail == this.state.email) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "email",
        this.state.newEmail,
        "main",
        1
      );
      this.setState({ email: this.state.newEmail });
    }

    /* Second contact info */

    //mailing address
    if (this.state.newMA2 == this.state.mailingAddress2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newMA2,
        "mailing",
        0
      );
      this.setState({ mailingAddress2: this.state.newMA2 });
    }

    //home address
    if (this.state.newHA2 == this.state.homeAddress2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newHA2,
        "home",
        0
      );
      this.setState({ homeAddress2: this.state.newHA2 });
    }

    //cell phone
    if (this.state.newCP2 == this.state.cellPhone2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newCP2,
        "cell",
        0
      );
      this.setState({ cellPhone2: this.state.newCP2 });
    }
    //home phone
    if (this.state.newHP2 == this.state.homePhone2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "phone",
        this.state.newHP2,
        "home",
        0
      );
      this.setState({ homePhone2: this.state.newHP2 });
    }

    //email
    if (this.state.newEmail2 == this.state.email2) {
    } else {
      userService.editCaregiverContacts(
        this.ID,
        this.TOKEN,
        "email",
        this.state.newEmail2,
        "main",
        0
      );
      this.setState({ email2: this.state.newEmail2 });
    }

    this.setState({ isEditCaregivers: false });
  }
  render() {
    const { caregiver, isEditCaregivers, homeAddress } = this.state;
    console.log("iddddd:" + homeAddress);
    return (
      <div>
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
                      <CaregiverContact
                        id={careg.client_id}
                        isEditCaregivers={isEditCaregivers}
                      />
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
                      <CaregiverContact
                        id={careg.client_id}
                        isEditCaregivers={isEditCaregivers}
                      />
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
                      <li>
                        <strong> Home Address: </strong>{" "}
                        <input
                          placeholder="home address"
                          value={this.state.newHA || ""}
                          onChange={this.handleChangeP}
                          name="newHA"
                        />
                      </li>
                      <li>
                        <strong> Mailing Address:</strong>{" "}
                        <input
                          placeholder="mailing address"
                          value={this.state.newMA || ""}
                          onChange={this.handleChangeP}
                          name="newMA"
                        />
                      </li>
                      <li>
                        <strong>Cell Phone: </strong>
                        <input
                          placeholder="cell phone"
                          value={this.state.newCP || ""}
                          onChange={this.handleChangeP}
                          name="newCP"
                        />
                      </li>
                      <li>
                        <strong> Home Phone:</strong>{" "}
                        <input
                          placeholder="home phone"
                          value={this.state.newHP || ""}
                          onChange={this.handleChangeP}
                          name="newHP"
                        />
                      </li>
                      <strong> Email:</strong>
                      <input
                        type="email"
                        value={this.state.newEmail}
                        onChange={this.handleChangeP}
                        name="newEmail"
                      />
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
                      <li>
                        <strong> Home Address: </strong>{" "}
                        <input
                          placeholder="home address"
                          value={this.state.newHA2 || ""}
                          onChange={this.handleChangeS}
                          name="newHA2"
                        />
                      </li>
                      <li>
                        <strong> Mailing Address:</strong>{" "}
                        <input
                          placeholder="mailing address"
                          value={this.state.newMA2 || ""}
                          onChange={this.handleChangeS}
                          name="newMA2"
                        />
                      </li>
                      <li>
                        <strong>Cell Phone: </strong>
                        <input
                          placeholder="cell phone"
                          value={this.state.newCP2 || ""}
                          onChange={this.handleChangeS}
                          name="newCP2"
                        />
                      </li>
                      <li>
                        <strong> Home Phone:</strong>{" "}
                        <input
                          placeholder="home phone"
                          value={this.state.newHP2 || ""}
                          onChange={this.handleChangeS}
                          name="newHP2"
                        />
                      </li>
                      <strong> Email:</strong>
                      <input
                        type="email"
                        value={this.state.newEmail2}
                        onChange={this.handleChangeS}
                        name="newEmail2"
                      />
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
