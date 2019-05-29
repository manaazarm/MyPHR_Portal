import config from "config";
import { authHeader } from "./backend";

import { Client } from "./models/client.py";
export const userService = {
  login,
  newLogin,
  logout,
  getAll,
  getAddress,
  getCaregivers,
  getComment,
  getDietaryRegimen,
  getEpisodes,
  getHealthProfile,
  getPhysicians,
  getPhoneNumber
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };
  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

//fetch from real api
function newLogin(username, password) {
  //each time fresh local storage
  localStorage.removeItem("yy");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(
    `http://localhost:5000/login?username=${username}&password=${password}`
  )
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("yy", JSON.stringify(user));
        console.log(localStorage.getItem("yy"));
      }
      return user;
    });
}
function getAddress(id) {
  return (
    fetch(`https://5cdc6232069eb30014202d8e.mockapi.io/addresses/${id}`) //must have a place to put userId
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(address => {
        localStorage.setItem("address", JSON.stringify(address));

        const c = localStorage.getItem("address");

        return c;
      })
  );
}
//https://5cdc6232069eb30014202d8e.mockapi.io/addresses/${id}

function getCaregivers(id) {
  return (
    fetch(`https://5cdc6232069eb30014202d8e.mockapi.io/caregivers/${id}`) //must have a place to put userId
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(caregiver => {
        localStorage.setItem("caregiver", JSON.stringify(caregiver));

        const c = localStorage.getItem("caregiver");
        // console.log("print caregiver:" + c);
        return c;
      })
  );
}

function getComment() {}
function getDietaryRegimen() {}
function getEpisodes() {}
function getHealthProfile() {}
function getPhysicians() {}
function getPhoneNumber() {}

function logout() {
  localStorage.removeItem("user");
  //localStorage.removeItem("address");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
