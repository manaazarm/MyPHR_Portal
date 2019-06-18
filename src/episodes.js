import React, { Component, Fragment } from "react";
import "./App.css";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Scroll from "react-scroll";
import { userService } from "./service";

var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

class Episodes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "home",
      episode_1_dr: {},
      episode_2_dr: {},
      episode_3_dr: {},
      episode_4_dr: {},
      episode_1_hic: {},
      episode_2_hic: {},
      episode_3_hic: {},
      episode_4_hic: {},
      episode_1: {},
      episode_2: {},
      episode_3: {},
      episode_4: {}
    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser")),
      basicInfo: JSON.parse(localStorage.getItem("basicInfo"))
    });

    userService
      .getEpisodes(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data =>
        this.setState({
          episode_1_dr: data["23230b0b-3c94-41f9-ac76-a5e5506b6f90"]["dr"],
          episode_1_hic: data["23230b0b-3c94-41f9-ac76-a5e5506b6f90"]["hic"],
          episode_1: data["23230b0b-3c94-41f9-ac76-a5e5506b6f90"]["episode"],

          episode_2_dr: data["2ff41f15-7249-4752-9cf7-cfa929b9a295"]["dr"],
          episode_2_hic: data["2ff41f15-7249-4752-9cf7-cfa929b9a295"]["hic"],
          episode_2: data["2ff41f15-7249-4752-9cf7-cfa929b9a295"]["episode"],

          episode_3_dr: data["8e1ddfea-d522-4d65-9d85-e20a664b5549"]["dr"],
          episode_3_hic: data["8e1ddfea-d522-4d65-9d85-e20a664b5549"]["hic"],
          episode_3: data["8e1ddfea-d522-4d65-9d85-e20a664b5549"]["episode"],

          episode_4_dr: data["99465268-49b5-4367-8d34-23032209002b"]["dr"],
          episode_4_hic: data["99465268-49b5-4367-8d34-23032209002b"]["hic"],
          episode_4: data["99465268-49b5-4367-8d34-23032209002b"]["episode"]
        })
      );

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
    const {
      episode_1_dr,
      episode_2_dr,
      episode_3_dr,
      episode_4_dr,
      episode_1,
      episode_2,
      episode_3,
      episode_4,
      episode_1_hic,
      episode_2_hic,
      episode_3_hic,
      episode_4_hic
    } = this.state;

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
              date="June 2019"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              position={"left"}
            >
              <h5 className="vertical-timeline-element-title">
                {episode_4_hic.name}
              </h5>
              <ul>
                <div>
                  {episode_4.is_active ? (
                    <div>
                      <li>{episode_4.start_date}</li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        {episode_4.start_date} - {episode_4.end_date}
                      </li>
                    </div>
                  )}
                </div>

                <li>{episode_4_dr.specialty}</li>
                <li>Dr.{episode_4_dr.name}</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="Feburary 2019"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              position={"left"}
            >
              <h5 className="vertical-timeline-element-title">
                {episode_3_hic.name}
              </h5>
              <ul>
                <div>
                  {episode_3.is_active ? (
                    <div>
                      <li>{episode_3.start_date}</li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        {episode_3.start_date} - {episode_3.end_date}
                      </li>
                    </div>
                  )}
                </div>

                <li>{episode_3_dr.specialty}</li>
                <li>Dr.{episode_3_dr.name}</li>
              </ul>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="May 2018"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              position={"left"}
            >
              <h5 className="vertical-timeline-element-title">
                {episode_2_hic.name}
              </h5>
              <ul>
                <div>
                  {episode_2.is_active ? (
                    <div>
                      <li>{episode_2.start_date}</li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        {episode_2.start_date} - {episode_2.end_date}
                      </li>
                    </div>
                  )}
                </div>

                <li>{episode_2_dr.specialty}</li>
                <li>Dr.{episode_2_dr.name}</li>
              </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="October 2017"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              position={"left"}
            >
              <h5 className="vertical-timeline-element-title">
                {episode_1_hic.name}
              </h5>
              <ul>
                <div>
                  {episode_1.is_active ? (
                    <div>
                      <li>{episode_1.start_date}</li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        {episode_1.start_date} - {episode_1.end_date}
                      </li>
                    </div>
                  )}
                </div>

                <li>{episode_1_dr.specialty}</li>
                <li>Dr.{episode_1_dr.name}</li>
              </ul>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Element>
      </Fragment>
    );
  }
}

export default Episodes;
