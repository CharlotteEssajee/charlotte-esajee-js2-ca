import { getUsername } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

// create navbar.
export function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".nav-container");

  const username = getUsername();

  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }">Login</a>  `;

  // if login is successfull, hide login in navbar, and display welcome back message.
  if (username) {
    authLink = `<a href="add.html" class="${
      pathname === "/add.html" ? "active" : ""
    }">Add products</a>
                <button id="logout">Logout ${username}</button>`;
  }

  container.innerHTML = `<div class="nav">
                            <a href="/" class="${
                              pathname === "/" || pathname === "/index.html"
                                ? "active"
                                : ""
                            }">Home</a>
                            <a href="/favourites.html" class="${
                              pathname === "/favourites.html" ? "active" : ""
                            }">Favourites</a>
                           ${authLink}
                        </div>`;

  logoutButton();
}
