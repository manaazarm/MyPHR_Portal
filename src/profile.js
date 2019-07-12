import React, { Component } from "react";
import "./App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContainer, TabPane, TabContent } from "react-bootstrap";
import { userService } from "./service";
import BasicInfo from "./Edit/basicInfo";
import EditProfile from "./Edit/editProfile";
import EditContact from "./Edit/editContact";
import EditCaregivers from "./Edit/editCaregivers";

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
      physician: [],
      phoneInfo: [],
      emailInfo: []
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser")),
      basicInfo: JSON.parse(localStorage.getItem("basicInfo"))
    });

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
          physician: data[0]
        })
      );

    //user from real api
    console.log("user:" + localStorage.getItem("oneUser"));
    console.log("basic info:" + localStorage.getItem("basicInfo"));
    console.log("physician:" + localStorage.getItem("physician"));
    localStorage.setItem("addressInfo", this.state.addressInfo);
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
                <BasicInfo />
              </TabPane>
              <TabPane eventKey="second">
                <EditProfile />
              </TabPane>
              <TabPane eventKey="third">
                <EditContact />
              </TabPane>
              <TabPane eventKey="fourth">
                <EditCaregivers />
              </TabPane>
              <TabPane eventKey="fifth">
                <div>
                  <div>
                    <p>
                      <strong>Family Physicians</strong>{" "}
                    </p>
                    <ul>
                      <li>
                        <strong> Name:</strong> {physician.physician_name}
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
