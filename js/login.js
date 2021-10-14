import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

// call/add navbar.
createMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  // if username or password length = 0, display warning message.
  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "Invalid values", ".message-container");
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  // url we require to do login.
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // console.log(json);

    if (json.user) {
      // displaying message when successfully logged in.
      //displayMessage("success", "Successfully logged in", ".message-container");

      saveToken(json.jwt);
      saveUser(json.user);

      // redirect user to index when successfully logged in.
      location.href = "/";
    }

    // if login fails, display warning message.
    if (json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }

    // console.log(json);
  } catch (error) {
    //console.log(error);
  }
}
