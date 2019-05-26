import React, { Component } from "react";
import "./App.css";

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
  fetchUsers(id) {
    // Where we're fetching data from
    fetch(`https://5cdc6232069eb30014202d8e.mockapi.io/caregivers/${id}`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          caregiver: data,
          isLoading: false
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchUsers(12);
  }

  render() {
    const { isLoading, caregiver, error } = this.state;
    return (
      <div>
        <h1>Today's Activities</h1>

        {!isLoading ? (
          c => {
            return (
              <div key={caregiver.id}>
                <p>City: {caregiver.name}</p>
                <p>Postal Code: {caregiver.relationship}</p>
                <hr />
              </div>
            );
          }
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}
export default App;
