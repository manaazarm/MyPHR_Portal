import React, { Component } from "react";
import "./App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContainer, TabPane, TabContent } from "react-bootstrap";

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      users: [],
      userInformation: []
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      users: { loading: true }
    });
    // userService.getAll().then(users => this.setState({ users }));
    console.log("xxx" + localStorage.getItem("user"));
  }

  render() {
    const { user } = this.state;

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
                <p>{user.name}</p>
                <p>Date of Birth:</p>
                <p>Gender: {user.gender}</p>
                <p>Service Language: {user.language}</p>
                <p>Last Access: </p>
              </TabPane>
              <TabPane eventKey="second">
                <p>Dietary Regimen: </p>
                <p>Advance Direcrives: </p>
                <p>Active Diagnosis: </p>
                <li> >></li>
                <li> diagnosed on: </li>
                <li> diagnosed by: </li>
                <p>Allergies: </p>
                <li> >></li>
                <li> >></li>
                <p>Risk and Safety Codes: </p>
                <li> >></li>
              </TabPane>
              <TabPane eventKey="third">
                <p>Home Address: </p>
                <p>Mailing Address: </p>
                <p>Other Address: </p>
                <p>Cell Phone: </p>
                <p>Home Phone: </p>
                <p>Email: </p>
              </TabPane>
              <TabPane eventKey="fourth">
                <p>Primary Contact: </p>
                <li> Name: </li>
                <li> Relationship: </li>
                <li> Home Address: </li>
                <li> Mailing Address: </li>
                <li> Cell Phone: </li>
                <li> Home Phone: </li>
                <li> Email: </li>
                <p>Second Contact: </p>
                <li> Name: </li>
                <li> Relationship: </li>
                <li> Home Address: </li>
                <li> Mailing Address: </li>
                <li> Cell Phone: </li>
                <li> Home Phone: </li>
                <li> Email: </li>
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
