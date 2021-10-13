export function createMenu() {
  const { pathname } = document.location;
  // console.log(pathname);

  const container = document.querySelector(".nav-container");

  container.innerHTML = `<div class="nav">
                              <a href="/" class="${
                                pathname === "/" ? "active" : ""
                              }">Home</a>
                              <a href="favourites.html" class="${
                                pathname === "/favourites.html" ? "active" : ""
                              }">Favourites</a>
                          </div>`;
}
