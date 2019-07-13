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
      episodes_test: {},
      isLoading: true
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
          episodes_test: data,
          isLoading: false
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
  //convert date to "Month Year"
  convert(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2);
    return [date.getFullYear(), month].join("-");
  }

  convertFull(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    const { episodes_test, isLoading } = this.state;

    var arr = [];
    Object.keys(episodes_test).forEach(function(key) {
      arr.push(episodes_test[key]);
    });

    if (isLoading) {
      return <div>is loading...</div>;
    } else {
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
            {arr.map(item => (
              <div
                key={item.dr.name}
                label={item.dr.name}
                value={item.hic.name}
              >
                <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={this.convert(item.episode.start_date)}
                    iconStyle={{
                      background: "rgb(33, 150, 243)",
                      color: "#fff"
                    }}
                    position={"left"}
                  >
                    <h5 className="vertical-timeline-element-title">
                      {item.hic.name}
                    </h5>
                    <ul>
                      <div>
                        {item.episode.is_active ? (
                          <div>
                            <li>{this.convertFull(item.episode.start_date)}</li>
                          </div>
                        ) : (
                          <div>
                            <li>
                              {this.convertFull(item.episode.start_date)} to{" "}
                              {this.convertFull(item.episode.end_date)}
                            </li>
                          </div>
                        )}
                      </div>

                      <li>{item.dr.specialty}</li>
                      <li>Dr.{item.dr.name}</li>
                    </ul>
                  </VerticalTimelineElement>
                </VerticalTimeline>
              </div>
            ))}
          </Element>
        </Fragment>
      );
    }
  }
}
export default Episodes;
