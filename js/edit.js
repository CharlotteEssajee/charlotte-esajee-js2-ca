import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./components/products/deleteButton.js";
import displayMessage from "./components/displayMessage.js";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const articleUrl = baseUrl + "/articles/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
  try {
    const response = await fetch(articleUrl);
    const article = await response.json();

    title.value = article.title;
    author.value = article.author;
    summary.value = article.summary;
    idInput.value = article.id;

    deleteButton(article.id);

    console.log(article);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();
  const idValue = idInput.value;

  if (
    titleValue.length === 0 ||
    authorValue.length === 0 ||
    summaryValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }

  updateProduct(titleValue, authorValue, summaryValue, idValue);
}

async function updateProduct(title, author, summary, id) {
  const url = baseUrl + "/articles/" + id;
  const data = JSON.stringify({
    title: title,
    author: author,
    summary: summary,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      displayMessage("success", "Product updated", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
