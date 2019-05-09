import React, { Component, Fragment } from "react";
import "./App.css";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Scroll from "react-scroll";

var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

class Episodes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "home"
    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function() {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    return (
      <Fragment className="timeline-space">
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            height: "600px",
            overflow: "scroll",
            marginBottom: "100px",
            border: "0.1px solid grey"
          }}
        >
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="May 2018"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            >
              <h5 className="vertical-timeline-element-title">Dynacare Labs</h5>
              <ul>
                <li>2018-05-30</li>
                <li>Blood test</li>
                <li>Requesting physician: Dr.Helen Spie</li>
              </ul>
              <h5 className="vertical-timeline-element-title">Dynacare Labs</h5>
              <ul>
                <li>2018-05-07</li>
                <li>Blood test</li>
                <li>Requesting physician: Dr.Helen Spie</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="April 2018"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              position={"left"}
            >
              <h5 className="vertical-timeline-element-title">Dynacare Labs</h5>
              <ul>
                <li>2018-04-30</li>
                <li>Blood test</li>
                <li>Requesting physician: Dr.Helen Spie</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="March 2018"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            >
              <h5 className="vertical-timeline-element-title">Dynacare Labs</h5>
              <ul>
                <li>2018-03-30</li>
                <li>Blood test</li>
                <li>Requesting physician: Dr.Helen Spie</li>
              </ul>
              <h5 className="vertical-timeline-element-title">Dynacare Labs</h5>
              <ul>
                <li>2018-03-07</li>
                <li>Blood test</li>
                <li>Requesting physician: Dr.Helen Spie</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="Feburary 2018"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              position={"left"}
            />
          </VerticalTimeline>
        </Element>
      </Fragment>
    );
  }
}

export default Episodes;
