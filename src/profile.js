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
      addressInfo: [],
      physician: {},
      phoneInfo: [],
      emailInfo: []
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

    /***
     * real api calls
     * contactInfo JSON format has error when printing
     */
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
      .then(data =>
        this.setState({
          addressInfo: data[0][1],
          phoneInfo: data[1][1],
          emailInfo: data[2][1]
        })
      );

    userService
      .getCaregiver(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data => this.setState({ caregiver: data }));

    userService
      .getPhysician(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data =>
        this.setState({
          physician: data[Object.keys(data)[0]]["dr"]
        })
      );

    //user from real api
    console.log("oneUser:" + localStorage.getItem("oneUser"));
    console.log("basic info:" + localStorage.getItem("basicInfo"));
    console.log("ppp:" + localStorage.getItem("physician"));
  }

  render() {
    const {
      basicInfo,
      addressInfo,
      phoneInfo,
      emailInfo,
      caregiver,
      healthProfile,
      physician
    } = this.state;

    console.log("physician is:" + JSON.stringify(physician));

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
                  {" "}
                  <strong>
                    {basicInfo.firstname} {basicInfo.surname}
                  </strong>
                </p>
                <p>
                  <strong>Date of Birth:</strong> {basicInfo.dob}
                </p>
                <p>
                  {" "}
                  <strong>Gender: </strong>
                  {basicInfo.gender}
                </p>
                <p>
                  {" "}
                  <strong>Service Language: </strong>{" "}
                  {basicInfo.service_language}
                </p>
                <p>
                  {" "}
                  <strong>Last Access:</strong>
                  {basicInfo.last_access_date}
                </p>
              </TabPane>
              <TabPane eventKey="second">
                <p>
                  {" "}
                  <strong>Dietary Regimen: </strong>
                  {basicInfo.dietary_regimen}
                </p>
                <p>
                  {" "}
                  <strong>Advance Directives:</strong>{" "}
                  {basicInfo.advance_directives}
                </p>
                <p>
                  <strong>Active Diagnosis: </strong>
                </p>
                <div>
                  {healthProfile.map((m, index) => (
                    <div>
                      {m.diagnosing_healthcare_provider_id == "" ? (
                        <div />
                      ) : (
                        <div>
                          <li> >></li>
                          <li> diagnosed on: </li>
                          <li> diagnosed by: </li>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p>
                  <strong>Allergies: </strong>
                </p>
                <div>
                  {healthProfile.map((m, index) => (
                    <div>
                      {m.is_allergy ? (
                        <div>
                          <li> </li>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  ))}
                </div>
                <p>
                  <strong>Risk and Safety Codes: </strong>
                </p>
                <div>
                  {healthProfile.map((h, index) => (
                    <div>
                      {h.is_risk_and_safety_issue ? (
                        <div> >>{h.name}</div>
                      ) : (
                        <div />
                      )}
                    </div>
                  ))}
                </div>
              </TabPane>
              <TabPane eventKey="third">
                <p>
                  {addressInfo.map(a => (
                    <div>
                      <strong>Home Address:</strong> {a.unit_number}{" "}
                      {a.street_name} {a.street_type}, {a.city}, {a.country},{" "}
                      {a.postal_code}{" "}
                    </div>
                  ))}
                </p>
                <div />
                <p>
                  <strong>Mailing Address:</strong>
                </p>
                <p>
                  <strong>Other Address:</strong>{" "}
                </p>
                <p>
                  {phoneInfo.map(p => (
                    <div>
                      <strong>Cell Phone:</strong> {p.number}
                    </div>
                  ))}
                </p>
                <p>
                  <strong>Home Phone: </strong>
                </p>
                <p>
                  <strong>Email: </strong>
                  {emailInfo}
                </p>
              </TabPane>
              <TabPane eventKey="fourth">
                <div>
                  {caregiver.map((careg, index) => (
                    <div>
                      {careg.is_primary_caregiver ? (
                        <div>
                          <p>
                            <strong>Primary Contact:</strong>{" "}
                          </p>
                          <ul>
                            <li>
                              <strong>Name: </strong>
                              {careg.firstname} {careg.surname}
                            </li>
                            <li>
                              <strong> Relationship:</strong>{" "}
                              {careg.relationship}
                            </li>
                            <li>
                              <strong> Home Address:</strong>{" "}
                            </li>
                            <li>
                              <strong> Mailing Address:</strong>{" "}
                            </li>
                            <li>
                              <strong> Cell Phone:</strong>{" "}
                            </li>
                            <li>
                              <strong> Home Phone:</strong>{" "}
                            </li>
                            <strong> Email:</strong>{" "}
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
                              Name: {careg.firstname} {careg.surname}
                            </li>
                            <li>
                              <strong> Relationship:</strong>{" "}
                              {careg.relationship}{" "}
                            </li>
                            <li>
                              <strong> Home Address:</strong>{" "}
                            </li>
                            <li>
                              <strong> Mailing Address:</strong>{" "}
                            </li>
                            <li>
                              <strong> Cell Phone:</strong>{" "}
                            </li>
                            <li>
                              <strong> Home Phone:</strong>{" "}
                            </li>
                            <li>
                              <strong> Email:</strong>{" "}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabPane>
              <TabPane eventKey="fifth">
                <div>
                  {physician.specialty == "Family Medicine" ? (
                    <div>
                      <p>
                        <strong>Family Physicians:</strong>{" "}
                      </p>
                      <ul>
                        <li>
                          <strong> Name:</strong> {physician.name}
                        </li>
                        <li>
                          <strong> Address:</strong>{" "}
                        </li>
                        <li>
                          <strong> Phone:</strong>{" "}
                        </li>
                      </ul>
                      <p />
                      <p>
                        <strong>Neurologist:</strong>{" "}
                      </p>
                      <ul>
                        <li>
                          <strong> Name:</strong>{" "}
                        </li>
                        <li>
                          <strong> Address:</strong>{" "}
                        </li>
                        <li>
                          <strong> Phone:</strong>{" "}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Family Physicians:</strong>
                      </p>
                      <ul>
                        <li> Name: </li>
                        <li> Address: </li>
                        <li> Phone: </li>
                      </ul>
                      <p />
                      <p>Neurologist: </p>
                      <ul>
                        <li> Name: </li>
                        <li> Address: </li>
                        <li> Phone: </li>
                      </ul>
                    </div>
                  )}
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    );
  }
}

export default Profile;
