import React, { Component } from "react";
import "./App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContainer, TabPane, TabContent } from "react-bootstrap";
import { userService } from "./service";

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      address: {},
      c: {},
      caregiver: [],
      isLoading: true,
      healthProfile: [],
      client: {},
      basicInfo: {},
      contactInfo: []
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser")),
      basicInfo: JSON.parse(localStorage.getItem("basicInfo"))
    });

    //mock api calls
    /*
    userService
      .getAddress(JSON.parse(localStorage.getItem("user")).id)
      .then(data => this.setState({ address: JSON.parse(data) }));
     
*/
    userService
      .getCaregivers(JSON.parse(localStorage.getItem("oneUser")).client_id)
      .then(data => this.setState({ c: JSON.parse(data) }));

    //real api calls
    userService
      .getHealthProfile(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token
      )
      .then(data => this.setState({ healthProfile: data }));

    userService
      .getContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        1,
        JSON.parse(localStorage.getItem("oneUser")).token
      )
      .then(data => this.setState({ contactInfo: data }));

    userService
      .getCaregiver(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data => this.setState({ caregiver: data }));

    //user from real api
    console.log("oneUser:" + localStorage.getItem("oneUser"));
    console.log("basic info:" + localStorage.getItem("basicInfo"));
  }

  render() {
    const {
      user,
      basicInfo,
      contactInfo,
      address,
      c,
      caregiver,
      healthProfile
    } = this.state;
    //console.log("contact info is:" + contactInfo[0]);
    return (
      <TabContainer id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="first"
                >
                  Basic Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="second"
                >
                  Health Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="third"
                >
                  Contact Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="fourth"
                >
                  Caregivers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="fifth"
                >
                  Physicians
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <TabContent class="tab-content">
              <TabPane eventKey="first">
                <p>
                  {basicInfo.firstname} {basicInfo.surname}
                </p>
                <p>Date of Birth: {basicInfo.dob}</p>
                <p>Gender: {basicInfo.gender}</p>
                <p>Service Language: {basicInfo.service_language}</p>
                <p>Last Access: {basicInfo.last_access_date}</p>
              </TabPane>
              <TabPane eventKey="second">
                <p>Dietary Regimen: {basicInfo.dietary_regimen}</p>
                <p>Advance Directives: {basicInfo.advance_directives}</p>
                <p>Active Diagnosis: </p>
                <li> >></li>
                <li> diagnosed on: </li>
                <li> diagnosed by: </li>
                <p>Allergies: </p>

                <div>
                  {healthProfile.map((m, index) => (
                    <div>
                      {m.is_allergy ? (
                        <div>
                          <li> >> </li>
                        </div>
                      ) : (
                        <li>null</li>
                      )}
                    </div>
                  ))}
                </div>
                <p>Risk and Safety Codes: </p>
                <div>
                  {healthProfile.map((h, index) => (
                    <div>
                      {h.is_risk_and_safety_issue ? (
                        <div>
                          <li> >> {h.name}</li>
                        </div>
                      ) : (
                        <li>null</li>
                      )}
                    </div>
                  ))}
                </div>
              </TabPane>
              <TabPane eventKey="third">
                <p>
                  Home Address: {address.street_number}, {address.city},{" "}
                  {address.country}, {address.postal_code}
                </p>
                <p>
                  Mailing Address:{address.street_number}, {address.city},{" "}
                  {address.country}, {address.postal_code}
                </p>
                <p>Other Address: null</p>
                <p>Cell Phone: {address.cell_phone}</p>
                <p>Home Phone: {address.home_phone}</p>
                <p>Email: {address.email}</p>
              </TabPane>
              <TabPane eventKey="fourth">
                <div>
                  {caregiver.map((careg, index) => (
                    <div>
                      {careg.is_primary_caregiver ? (
                        <div>
                          <p>Primary Contact: </p>
                          <li>
                            {" "}
                            Name: {careg.firstname} {careg.surname}
                          </li>
                          <li> Relationship: {careg.relationship}</li>
                          <li> Home Address: </li>
                          <li> Mailing Address: </li>
                          <li> Cell Phone: </li>
                          <li> Home Phone: </li>
                          <li> Email: </li>
                        </div>
                      ) : (
                        <div>
                          <p>Second Contact: </p>
                          <li>
                            {" "}
                            Name: {careg.firstname} {careg.surname}
                          </li>
                          <li> Relationship:{careg.relationship} </li>
                          <li> Home Address: </li>
                          <li> Mailing Address: </li>
                          <li> Cell Phone: </li>
                          <li> Home Phone: </li>
                          <li> Email: </li>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabPane>
              <TabPane eventKey="fifth">
                <p>Family Physicians: </p>
                <li> Name: </li>
                <li> Address: </li>
                <li> Phone: </li>
                <p>Neurologist: </p>
                <li> Name: </li>
                <li> Address: </li>
                <li> Phone: </li>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    );
  }
}

export default Profile;
