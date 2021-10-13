import { getExistingFavs } from "./utils/favFunctions.js";
import { createMenu } from "./components/createMenu.js";
import clearButton from "./components/clearButton.js";

const favourites = getExistingFavs();
createMenu();
clearButton();

const articleContainer = document.querySelector(".article-container");

if (favourites.length === 0) {
  articleContainer.innerHTML = "No favourites yet";
}

favourites.forEach((favourite) => {
  articleContainer.innerHTML += `<div class="card">
                                    <div class="card-body">
                                        <div class="article">
                                        <i class="fa fa-heart"></i>
                                            <h4>${favourite.title}</h4>
                                        </div>
                                    </div>
                                </div>`;
});

// console.log(favourites);
