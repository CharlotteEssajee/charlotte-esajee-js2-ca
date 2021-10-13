import { getArticles } from "../index.js";

export function searchArticles(items) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    console.log(event);

    // filter by title
    const searchValue = event.target.value.trim().toLowerCase();
    const filteredArticles = items.filter(function (article) {
      if (article.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    console.log(filteredArticles);
    getArticles(filteredArticles);
  };
}
