import { getExistingFavs } from "./utils/favFunctions.js";
import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import { doFetch } from "./data/doFetch.js";

const articleUrl = baseUrl + "/articles";
createMenu();

let mainArticles = [];
const articleContainer = document.querySelector(".article-container");
const favourites = getExistingFavs();
const search = document.querySelector(".search");

search.onkeyup = function (event) {
  const searchValue = event.target.value.trim().toLowerCase();
  const filteredArticles = mainArticles.filter(function (article) {
    if (article.title.toLowerCase().startsWith(searchValue)) {
      return true;
    }
  });
  generateHtml(filteredArticles);
};

export function generateHtml(articles) {
  let cssClass = "far";
  // check through favs array
  // does the article id exist in the favs array
  const doesObjectExist = favourites.find(function (fav) {
    return parseInt(fav.id) === articles.id;
  });

  // if is in the array, change the style of the i element
  if (doesObjectExist) {
    cssClass = "fa";
  }
  articleContainer.innerHTML = "";
  articles.forEach((article) => {
    articleContainer.innerHTML += `
      <div class="card">
        <div class="card-body">
            <div class="article">
            <i class="${cssClass} fa-heart" data-id="${article.id}" data-title="${article.title}"></i>
              <a href="edit.html?id=${article.id}">  
                <h4>${article.title}</h4>
                <p class="card-author">${article.author}</p>
                <p class="card-summary">${article.summary}</p>
              </a>
            </div>
        </div>
      </div>`;
  });

  const favButtons = document.querySelectorAll(".article i");

  favButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
}

function handleClick() {
  this.classList.toggle("fa");
  this.classList.toggle("far");

  const id = this.dataset.id;
  const title = this.dataset.title;

  const currentFavs = getExistingFavs();

  const articleExists = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (articleExists === undefined) {
    const article = { id: id, title: title };
    currentFavs.push(article);
    saveFavs(currentFavs);
  } else {
    const newFavs = currentFavs.filter((fav) => fav.id !== id);
    saveFavs(newFavs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

async function init() {
  console.log("init called");
  mainArticles = await doFetch(articleUrl);
  generateHtml(mainArticles);
}

init();
