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

/**
 * dahsboard page
 * hard coded currently
 * no implementation on api side
 */

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      caregiver: {},
      error: null
    };
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
