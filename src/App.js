import React, { Component } from "react";
import "./App.css";

/*home page */
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      users: [],
      error: null
    };
  }
  fetchUsers() {
    // Where we're fetching data from
    fetch(`http://www.mocky.io/v2/5cdc76002d0000200cf5a79f`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          users: data,
          isLoading: false
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { isLoading, users, error } = this.state;
    return (
      <div>
        <h1>Today's Activities</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map(user => {
            const { id, name, gender } = user;
            return (
              <div key={id}>
                <p>Name: {name}</p>
                <p>Gender: {gender}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;
