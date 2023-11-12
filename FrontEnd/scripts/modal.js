// Import de tout les éléments nécessaires
import { userAuth, editBtn } from "./admin.js";
import { works } from "./worksData.js";

export const modal = document.querySelector(".modal");
export const overlay = document.querySelector(".overlay");
export const closeModalBtn = document.querySelectorAll(".closeModal");
const modalGallery = document.querySelector(".modal-gallery");
export const modalForm = document.querySelector(".modalForm");


// Fonction pour ouvrir et fermer la modal
function openModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
  populateModal();
}

export function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
  modalForm.style.display = "none";
}

// Fonction pour afficher et supprimer les données dans la modal
export function populateModal() {
  modalGallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const svgTrash = document.createElement("img");
    const deleteBtn = document.createElement("button");
    image.src = work.imageUrl;
    image.setAttribute("alt", work.title);
    deleteBtn.classList.add("deleteWork");
    svgTrash.src = "assets/icons/trash-can-solid.svg";
    deleteBtn.appendChild(svgTrash);
    figure.appendChild(deleteBtn);
    figure.classList.add("workfigure");
    figure.classList.add(`id${work.id}`);
    figure.appendChild(image);
    modalGallery.appendChild(figure);

    deleteBtn.addEventListener("click", async () => {
      await fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userAuth.token}`,
        },
      }).catch((error) => {
        console.error(error);
      });

      const workToDelete = document.querySelectorAll(`.id${work.id}`);
      workToDelete.forEach((work) => {
        work.remove();
      });
    });
  });
}

editBtn.addEventListener("click", () => {
  openModal();
});

closeModalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal();
  });
});

overlay.addEventListener("click", () => {
  closeModal();
});
