import { getExistingFavs } from "../utils/favFunctions.js";

export default function clearButton() {
  const clearFaves = document.querySelector("#clear");

  clearFaves.addEventListener("click", clearList);

  function clearList() {
    localStorage.clear("favourites");

    getExistingFavs([]);
  }
}
