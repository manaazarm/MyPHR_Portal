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

//the page loads slow 

//Add loop for episodes
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
      episode_4: {},
      episodes_test: {},
      test: [],
      t: [],
      document_id: {}
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.iterateEpisodes = this.iterateEpisodes.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("oneUser")),
      basicInfo: JSON.parse(localStorage.getItem("basicInfo")),
      t: [],
      test: []
    });

    userService
      .getEpisodes(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1
      )
      .then(data =>
        this.setState({
          episodes_test: data,

          episode_1_dr: data[Object.keys(data)[0]]["dr"],
          episode_1_hic: data[Object.keys(data)[0]]["hic"],
          episode_1: data[Object.keys(data)[0]]["episode"],

          episode_2_dr: data[Object.keys(data)[1]]["dr"],
          episode_2_hic: data[Object.keys(data)[1]]["hic"],
          episode_2: data[Object.keys(data)[1]]["episode"],

          episode_3_dr: data[Object.keys(data)[2]]["dr"],
          episode_3_hic: data[Object.keys(data)[2]]["hic"],
          episode_3: data[Object.keys(data)[2]]["episode"],

          episode_4_dr: data[Object.keys(data)[3]]["dr"],
          episode_4_hic: data[Object.keys(data)[3]]["hic"],
          episode_4: data[Object.keys(data)[3]]["episode"]
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

  iterateEpisodes() {
    var episodes_test = JSON.stringify(this.state.episodes_test);
    
    for (let i = 0; i < 4; i++) {
      //test[i] = Object.keys(episodes_test)[i];
      //<Object.keys(episodes_test).length

      return (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="October 2017"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          position={"left"}
        >
          <h5 className="vertical-timeline-element-title">
            {episodes_test[Object.keys(episodes_test)[i]["hic"]].name}
          </h5>
          <ul>
            <div>
              {episodes_test[Object.keys(episodes_test)[i]]["episode"]
                .is_active ? (
                <div>
                  <li>
                    {
                      episodes_test[Object.keys(episodes_test)[i]]["episode"]
                        .start_date
                    }
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    {
                      episodes_test[Object.keys(episodes_test)[i]]["episode"]
                        .start_date
                    }{" "}
                    -{" "}
                    {
                      episodes_test[Object.keys(episodes_test)[i]]["episode"]
                        .end_date
                    }
                  </li>
                </div>
              )}
            </div>

            <li>
              {episodes_test[Object.keys(episodes_test)[i]]["dr"].specialty}
            </li>
            <li>
              Dr.{episodes_test[Object.keys(episodes_test)[i]]["dr"].name}
            </li>
          </ul>
        </VerticalTimelineElement>
      );
    }
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
      episode_4_hic,

      episodes_test,

      test,
      t,
      episodes_dr,
      episodes_hic,
      episodes
    } = this.state;

    //console.log("ooooooo:" + JSON.stringify(episodes_test[document_id]));
    //console.log("iiiii:" + JSON.stringify(t[0]));
    console.log(
      "jjjj:" + JSON.stringify(episodes_test[Object.keys(episodes_test)[0]])
    );
    console.log(
      "test object keys for second layer:" + Object.keys(episodes_test)
    );

    //TO BE FIXED!!!!!!!
    //console.log("pppp:" +JSON.stringify(episodes_test[Object.keys(episodes_test)[0]]["dr"]) );

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
