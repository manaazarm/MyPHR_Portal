import React, { Component } from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button, Form, InputGroup, Col } from "react-bootstrap";
import AddressForm from "../autoAddress/AddressForm";
import AddressSuggest from "../autoAddress/AddressSuggest";
import AddressInput from "../autoAddress/AddressInput";
import axios from "axios";
import { Field, formInputData, formValidation } from "reactjs-input-validator";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

const APP_ID_HERE = "Fz8mRRSVvIpzxV6B1qa1";
const APP_CODE_HERE = "miB6oUEV_kPBGp7CQTQTAg";

const clientToEdit = JSON.parse(localStorage.getItem("contactInfo"));
/*edit components
 *auto complete addresses
 *phone number and email validators

 validate all forms when clicking save (before save)
 */
class EditContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.editContact = this.editContact.bind(this);
    this.editCancel = this.editCancel.bind(this);
    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the save button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleMAChange = this.handleMAChange.bind(this);
    this.handleHPChange = this.handleHPChange.bind(this);
    this.handleHAChange = this.handleHAChange.bind(this);

    this.handleEChange = this.handleEChange.bind(this);
  }
  getInitialState() {
    return {
      address: {
        street_number: "",
        city: "",
        state: "",
        postal_code: "",
        country: ""
      },
      isLoading: true,
      client: {},
      address: {},
      isEditContact: false,
      validated: false,
      query: "",
      locationId: "",
      isChecked: false,
      coords: {},
      data: {},

      //UPDATING........
      phoneInfo: clientToEdit[1][1],
      emailInfo: clientToEdit[2][1],
      addressInfo: clientToEdit[0][1],
      homeAddress: {},
      mailingAddress: {},
      otherAddress: {},
      homePhone: {},
      cellPhone: {},
      newEmail: {},

      //new input values:
      newHA: {},
      newMA: {},
      newOA: {},
      newHP: {},
      newCP: {},

      errors: {}
    };
  }
  componentDidMount() {
    const ha = this.state.addressInfo.filter(word => word.type == "home");
    if (ha.length != 0) {
      this.setState({ homeAddress: ha[0].address, newHA: ha[0].address });
    } else {
      this.setState({ homeAddress: ha[0], newHA: ha[0] });
    }

    const ma = this.state.addressInfo.filter(word => word.type == "mailing");
    if (ma.length != 0) {
      this.setState({ mailingAddress: ma[0].address, newMA: ma[0].address });
    } else {
      this.setState({ mailingAddress: ma[0], newMA: ma[0] });
    }

    const oa = this.state.addressInfo.filter(word => word.type == "other");
    if (oa.length != 0) {
      this.setState({ otherAddress: oa[0].address, newOA: oa[0].address });
    } else {
      this.setState({ otherAddress: oa[0], newOA: oa[0] });
    }

    const cp = this.state.phoneInfo.filter(word => word.type == "cell");
    if (cp.length != 0) {
      this.setState({
        cellPhone: "+" + cp[0].country_code + " " + cp[0].number,
        newCP: "+" + cp[0].country_code + " " + cp[0].number
      }); ///IF Differnet code????????
    } else {
      this.setState({ cellPhone: cp[0], newCP: cp[0] }); ///IF Differnet code????????
    }

    const hp = this.state.phoneInfo.filter(word => word.type == "home");
    if (hp.length != 0) {
      this.setState({
        homePhone: "+" + hp[0].country_code + " " + hp[0].number,
        newHP: "+" + hp[0].country_code + " " + hp[0].number
      });
    } else {
      this.setState({ homePhone: hp[0], newHP: hp[0] });
    }

    this.setState({ newEmail: this.state.emailInfo });
  }
  editCancel() {
    this.setState({
      isEditContact: false
    });
  }

  //disabled now
  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  //Address Query
  onQuery(event) {
    const query = event.target.value;

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: APP_ID_HERE,
          app_code: APP_CODE_HERE,
          query: query,
          maxresults: 1
        }
      })
      .then(function(response) {
        if (response.data.suggestions.length > 0) {
          const id = response.data.suggestions[0].locationId;
          const address = response.data.suggestions[0].address;
          self.setState({
            address: address,
            query: query,
            locationId: id
          });
        } else {
          const state = self.getInitialState();
          self.setState(state);
        }
      });
  }

  editContact() {
    this.setState({
      isEditContact: true
    });
  }
  //disabled now
  onClear(evt) {
    const state = this.getInitialState();
    this.setState(state);
  }

  onAddressChange(evt) {
    const id = evt.target.id;
    const val = evt.target.value;

    let state = this.state;
    state.address[id] = val;
    this.setState(state);
  }

  //handle email
  handleChange(event, inputValue, inputName, validationState, isRequired) {
    const value = (event && event.target.value) || inputValue;
    const { data } = this.state;
    data[inputName] = { value, validation: validationState, isRequired };
    this.setState({
      data
    });
    // if you want access to your form data
    const formData = formInputData(this.state.data); // eslint-disable-line no-unused-vars
    // tells you if the entire form validation is true or false
    const isFormValid = formValidation(this.state.data); // eslint-disable-line no-unused-vars
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
  handleHAChange(event) {
    this.setState({ newHA: event.target.value });
  }
  handleMAChange(event) {
    this.setState({ newMA: event.target.value });
  }
  handleOAChange(event) {
    this.setState({ newOA: event.target.value });
  }

  handleValidation() {
    let email = this.state.newEmail;

    let errors = {};
    let formIsValid = true;

    //Email
    if (!email) {
      formIsValid = false;
      errors["email"] = "Email cannot be empty";
    }

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf("@");
      let lastDotPos = email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleEChange(e) {
    this.setState({ newEmail: e.target.value });
  }

  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  ID = JSON.parse(localStorage.getItem("oneUser")).client_id;
  //when validation (clicking save button)
  onCheck(event) {
    let params = {
      app_id: APP_ID_HERE,
      app_code: APP_CODE_HERE
    };

    if (this.state.locationId.length > 0) {
      params["locationId"] = this.state.locationId;
    } else {
      params["searchtext"] =
        this.state.address.street_number +
        this.state.address.city +
        this.state.address.state +
        this.state.address.postal_code +
        this.state.address.country;
    }

    const self = this;
    axios
      .get("https://geocoder.api.here.com/6.2/geocode.json", { params: params })
      .then(function(response) {
        const view = response.data.Response.View;
        if (view.length > 0 && view[0].Result.length > 0) {
          const location = view[0].Result[0].Location;

          self.setState({
            isChecked: "true",
            locationId: "",
            query: location.Address.Label,
            address: {
              street:
                location.Address.HouseNumber + " " + location.Address.Street,
              city: location.Address.City,
              state: location.Address.State,
              postalCode: location.Address.PostalCode,
              country: location.Address.Country
            },
            coords: {
              lat: location.DisplayPosition.Latitude,
              lon: location.DisplayPosition.Longitude
            }
          });
        } else {
          self.setState({
            isChecked: true,
            coords: null
          });
        }
      })
      .catch(function(error) {
        console.log("caught failed query");
        self.setState({
          isChecked: true,
          coords: null
        });
      });

    //validate email form
    event.preventDefault();
    const isFormValid = formValidation(this.state.data);

    if (isFormValid) {
      // do anything including ajax calls
      this.setState({ callAPI: true });
    } else {
      this.setState({ callAPI: true, shouldValidateInputs: !isFormValid });
    }

    //validate phone form

    //if all validated, save data!
    if (this.state.isChecked & !this.state.coords & isFormValid) {
      alert("saved!" + this.state.data.email.value);
    }
    console.log("new address:" + JSON.stringify(this.state.address));

    //NEW: validate email format !!!
    if (!this.handleValidation()) {
    }
    //call edit apis:
    if (this.state.newHA == this.state.homeAddress) {
    } else {
      userService.editContactInfo(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newHA,
        "home"
      );
      this.setState({ homeAddress: this.state.newHA });
    }

    //mailing address
    if (this.state.newMA == this.state.mailingAddress) {
    } else {
      userService.editContactInfo(
        this.ID,
        this.TOKEN,
        "address",
        this.state.newMA,
        "mailing"
      );
      this.setState({ mailingAddress: this.state.newMA });
    }

    //other address
    if (this.state.newOA == this.state.otherAddress) {
    } else {
      userService.editContactInfo(
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
      userService.editContactInfo(
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
      userService.editContactInfo(
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
      userService.editContactInfo(
        this.ID,
        this.TOKEN,
        "email",
        this.state.newEmail,
        "main"
      );
      this.setState({ emailInfo: this.state.newEmail });
    }

    this.setState({ isEditContact: false });
  }

  //alert messages
  alert() {
    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      return (
        <div className="" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      return (
        <div className="" role="alert">
          <b>Valid Address.</b>
        </div>
      );
    }
  }
  render() {
    let result = this.alert();
    const {
      address,
      validated,

      isEditContact,
      addressInfo,
      phoneInfo,
      emailInfo,

      homeAddress,
      mailingAddress,
      otherAddress,
      cellPhone,
      homePhone,

      data,
      newHA,
      newMA,
      newOA,
      newCP,
      newHP,
      newEmail
    } = this.state;

    console.log("test MA :" + JSON.stringify(this.state.errors));
    return (
      <div>
        {!isEditContact ? (
          <div>
            <p>
              <strong>Home Address: </strong>
              {addressInfo.map(a => (
                <div class="inline">
                  {a.type == "home" ? <div> {a.address} </div> : <div />}
                </div>
              ))}
            </p>

            <p>
              <strong>Mailing Address: </strong>

              {addressInfo.map(a => (
                <div class="inline">
                  {a.type == "mailing" ? <div>{a.address}</div> : <div />}
                </div>
              ))}
            </p>
            <p>
              <strong>Other Address: </strong>
              {addressInfo.map(a => (
                <div class="inline">
                  {a.type == "other" ? <div>{a.address}</div> : <div />}
                </div>
              ))}
            </p>
            <p>
              <strong>Cell Phone: </strong>
              {phoneInfo.map(p => (
                <div class="inline">
                  {p.type == "cell" ? <div>{p.number}</div> : <div />}
                </div>
              ))}
            </p>
            <p>
              <strong>Home Phone: </strong>
              {phoneInfo.map(p => (
                <div class="inline">
                  {p.type == "home" ? <div>{p.number}</div> : <div />}
                </div>
              ))}
            </p>
            <p>
              <strong>Email: </strong>
              {emailInfo}
            </p>

            <Button variant="secondary" onClick={this.editContact}>
              Edit
            </Button>
          </div>
        ) : (
          ///////////////////////////////////////EDIT ////////////////////////////////////////
          <div>
            <form onSubmit={this.handleSubmit}>
              <p>
                <strong>Home Address:</strong>{" "}
                <input
                  class="form-control"
                  placeholder="home address"
                  value={newHA || ""}
                  onChange={this.handleHAChange}
                />
                {/**

                <AddressSuggest
                  query={this.state.query}
                  value={address.street_number}
                  onChange={this.onQuery}
                  placeholder={address.street_number}
                />
                <input placeholder="city" value={address.city} /> ,{" "}
                <input placeholder="country" value={address.country} />,{" "}
                <input placeholder="postal code" value={address.postalCode} />
                
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            onChange={this.onAddressChange}
          />
           <br />
                {result}*/}
              </p>

              <p>
                <strong>Mailing Address: </strong>
                <input
                  class="form-control"
                  placeholder="mailing address"
                  value={newMA || ""}
                  onChange={this.handleMAChange}
                />
              </p>
              <p>
                <strong>Other Address: </strong>{" "}
                <input
                  class="form-control"
                  placeholder="other address"
                  value={newOA || ""}
                  onChange={this.handleOAChange}
                />
              </p>
              <p>
                <strong>Cell Phone: </strong>
                <div>
                  <ReactPhoneInput
                    placeholder="Enter phone number"
                    defaultCountry={"ca"}
                    value={newCP || ""}
                    onChange={this.handlePhoneChange}
                  />
                </div>
              </p>

              <p>
                <strong>Home Phone: </strong>
                <div>
                  <ReactPhoneInput
                    placeholder="Enter phone number"
                    defaultCountry={"ca"}
                    value={newHP || ""}
                    onChange={this.handleHPChange}
                  />
                </div>
              </p>

              <p>
                <p>
                  <strong>Email:</strong>{" "}
                  <input
                    class="form-control"
                    type="email"
                    value={newEmail}
                    onChange={this.handleEChange}
                  />
                  <span className="error">{this.state.errors["email"]}</span>
                </p>
                <ButtonToolbar>
                  <Button variant="secondary" onClick={this.onCheck}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={this.editCancel}>
                    Cancel
                  </Button>
                </ButtonToolbar>
              </p>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default EditContact;
