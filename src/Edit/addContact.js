import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button } from "react-bootstrap";

/*edit components */
class AddContact extends React.Component {
  render() {
    return (
      <div>
        <p>
          <strong>New Contact:</strong>{" "}
        </p>
        <ul>
          <li>
            {" "}
            <strong>Name:</strong> <input placeholder="firstname" />{" "}
            <input placeholder="surname" />
          </li>
          <li>
            <strong> Relationship:</strong>{" "}
            <select>
              <option value="father">father</option>
              <option value="mother">mother</option>
            </select>
          </li>
          <li>
            <strong> Home Address:</strong>{" "}
            <input placeholder="street number" />, <input placeholder="city" />
            , <input placeholder="country" />,{" "}
            <input placeholder="postal code" />
          </li>

          <li>
            <strong> Mailing Address:</strong>{" "}
            <input placeholder="street number" />, <input placeholder="city" />
            , <input placeholder="country" />,{" "}
            <input placeholder="postal code" />
          </li>
          <li>
            <strong> Cell Phone:</strong> <input placeholder="(000)-000-0000" />
          </li>
          <li>
            <strong> Home Phone:</strong> <input placeholder="(000)-000-0000" />
          </li>
          <li>
            <strong> Email:</strong>{" "}
            <input type="email" placeholder="name@example.com" />
          </li>
        </ul>
      </div>
    );
  }
}

export default AddContact;
