import React from "react";
import "../../App.css";
import { userService } from "../../service";
import { ButtonToolbar, Button } from "react-bootstrap";

/* component */
// With edit page that allows service lanuage changle
class BasicInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    const clientToEdit = JSON.parse(localStorage.getItem("basicInfo"));
    const caregiverToEdit = JSON.parse(localStorage.getItem("caregiver"));

    this.state = {
      basic: {
        client_id: clientToEdit.client_id,
        firstname: clientToEdit.firstname,
        surname: clientToEdit.surname,
        dob: clientToEdit.dob,
        gender: clientToEdit.gender,
        last_access_date: clientToEdit.last_access_date,
        service_language: clientToEdit.service_language,
        hcn: clientToEdit.hcn,
        name: clientToEdit.name,
        start_date: clientToEdit.start_date
      },
      isEditBasic: false,
      newLanguage: clientToEdit.service_language,
      caregiver: caregiverToEdit,
      caregiverPID: ""
    };

    this.editCancel = this.editCancel.bind(this);
    this.editBasic = this.editBasic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //primary caregiver
    const result = this.state.caregiver.filter(word => word.is_primary == true);
    var d = [];
    for (let i = 0; i < result.length; i++) {
      d.push(result[i].client_id);
    }

    this.setState({
      caregiverPID: d
    });

    //save primary caregiver in local storage
    userService
      .getCaregiverContactInfo(
        JSON.parse(localStorage.getItem("oneUser")).client_id,
        JSON.parse(localStorage.getItem("oneUser")).token,
        1,
        this.state.caregiverPID
      )

      .then(data => {
        this.setState({
          caregiverAddresses: data[0][1],
          caregiverPhones: data[1][1],
          caregiverEmails: data[2][1]
        });
      });
  }
  editBasic() {
    this.setState({
      isEditBasic: true
    });
  }
  editCancel() {
    this.setState({
      isEditBasic: false
    });
  }
  handleChange(event) {
    this.setState({
      /*
      basic: {
        ...this.state.basic,
        service_language: event.target.value
      },
      */
      newLanguage: event.target.value
    });
  }
  TOKEN = JSON.parse(localStorage.getItem("oneUser")).token;
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isEditBasic: false
    });
    userService.updateLanguage(
      this.state.basic.client_id,
      this.TOKEN,
      this.state.newLanguage
    );
  }
  render() {
    const {
      firstname,
      surname,
      dob,
      gender,
      last_access_date,
      service_language
    } = this.state.basic;
    return (
      <div>
        {!this.state.isEditBasic ? (
          <div>
            <p>
              {" "}
              <strong>
                {firstname} {surname}
              </strong>
            </p>
            <p>
              <strong>Date of Birth:</strong> {dob}
            </p>
            <p>
              {" "}
              <strong>Gender: </strong>
              {gender}
            </p>
            <p>
              {" "}
              <strong>Service Language: </strong> {service_language}
            </p>
            <p>
              {" "}
              <strong>Last Access: </strong>
              {last_access_date}
            </p>

            <Button variant="secondary" onClick={this.editBasic}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <p>
              <strong>
                {firstname} {surname}
              </strong>
            </p>
            <p>
              <strong>Date of Birth:</strong> {dob}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Service Language:</strong>{" "}
              <select
                value={this.state.newLanguage}
                onChange={this.handleChange}
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </p>
            <p>
              <strong>Last Access:</strong> {last_access_date}
            </p>
            <ButtonToolbar>
              <Button
                style={{ right: 20 }}
                variant="secondary"
                onClick={this.handleSubmit}
              >
                Save
              </Button>
              <Button variant="secondary" onClick={this.editCancel}>
                Cancel
              </Button>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  }
}

export default BasicInfo;
