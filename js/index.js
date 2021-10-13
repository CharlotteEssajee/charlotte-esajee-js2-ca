import { getExistingFavs } from "./utils/favFunctions.js";
import { baseUrl } from "./data/api.js";
import { createMenu } from "./components/createMenu.js";
import { searchArticles } from "./components/searchArticles.js";

const articleUrl = baseUrl + "/articles";
createMenu();

const articleContainer = document.querySelector(".article-container");

const favourites = getExistingFavs();

export async function getArticles() {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    // console.log(json);
    const items = json;

    json.forEach((article) => {
      let cssClass = "far";

      // check through favs array
      // does the article id exist in the favs array
      const doesObjectExist = favourites.find(function (fav) {
        // console.log(fav);

        return parseInt(fav.id) === article.id;
      });

      // console.log(doesObjectExist);

      // if is in the array, change the style of the i element
      if (doesObjectExist) {
        cssClass = "fa";
      }

      articleContainer.innerHTML += `<div class="card">
                                        <div class="card-body">
                                            <div class="article">
                                            <i class="${cssClass} fa-heart" data-id="${article.id}" data-title="${article.title}"></i>
                                                <h4>${article.title}</h4>
                                                <p class="card-author">${article.author}</p>
                                                <p class="card-summary">${article.summary}</p>
                                            </div>
                                        </div>
                                    </div>`;
    });

    searchArticles();

    const favButtons = document.querySelectorAll(".article i");

    favButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

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
  } catch (error) {
    console.log(error);
  }
}

getArticles();
