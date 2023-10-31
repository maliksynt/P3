async function fetchData() {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Impossible de charger les données JSON", error);
  }
}

const gallery = document.querySelector(".gallery");
const works = await fetchData();
const figure = document.querySelector("figure");
const image = document.querySelector("img");
const figcaption = document.querySelector("figcaption");
const filterButtons = document.querySelectorAll(".filterBtn");

works.forEach((work) => {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  image.src = work.imageUrl;
  image.setAttribute("alt", work.title);
  figure.category = work.category.name;
  figcaption.innerText = work.title;
  figure.classList.add("workfigure");
  figure.appendChild(image);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
});

function filterCategory(e) {
  const allFigures = document.querySelectorAll(".workfigure");
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  allFigures.forEach((figure) => {
    if (figure.category === e.target.dataset.name || e.target.dataset.name === "Tous") {
      figure.classList.remove("hide");}
    else {
      figure.classList.add("hide");}
    });
}

filterButtons.forEach(button => button.addEventListener('click', filterCategory));