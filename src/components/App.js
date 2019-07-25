import React, { Component } from "react";
import "../App.css";
import Gallery from "react-grid-gallery";
import { userService } from "../service";

const IMAGES = [
  {
    src: "https://i.ibb.co/vDTckxF/Heart-Rates.jpg",
    thumbnail: "https://i.ibb.co/vDTckxF/Heart-Rates.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 204,
    caption: "Heart Rates"
  },

  {
    src: "https://i.ibb.co/tHw0XfM/Steps-Graph.jpg",
    thumbnail: "https://i.ibb.co/tHw0XfM/Steps-Graph.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    caption: "Steps"
  }
];

/*home page */
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      caregiver: {},
      error: null
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser"))
      //basicInfo: JSON.parse(localStorage.getItem("basicInfo"))
    });

    /***
     * real api calls
     * contactInfo JSON format has error when printing
     */

    userService
      .getBasicInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).user_id,
        JSON.parse(localStorage.getItem("oneUser")).token
      )
      .then(data => this.setState({ basicInfo: data }));
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
          contactInfo: data
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
          physician: data
        })
      );
  }
  render() {
    return (
      <div
        style={{
          position: "relative",
          height: "600px",
          overflow: "scroll",
          marginBottom: "100px",
          border: "0.1px solid white"
        }}
      >
        <h1>Today's Activities</h1>
        <Gallery images={IMAGES} />
      </div>
    );
  }
}
export default App;
