// Import de tout les éléments nécessaires
import { modal } from "./modal.js";
import { modalForm } from "./modal.js";

const openFormBtn = document.querySelector("#addPhotoBtn");
const backModalBtn = document.querySelector(".backModal");

const imageUpload = document.querySelector("#image-upload");
const imagePreviewDiv = document.querySelector(".image-preview");
const uploadElement = document.querySelectorAll(".uploadElement");
const imagePreview = document.createElement("img");

const addTitleInput = document.querySelector("#title");
const addCategoryInput = document.querySelector("#category");
const addPhotoBtn = document.querySelector("#validAddBtn");
const form = document.querySelector(".form");
let newWork = {};

// Ouverture et fermeture de la modal
function openModalForm() {
  modal.style.display = "none";
  modalForm.style.display = "block";
  checkForm();
}

function backModal() {
  modal.style.display = "block";
  modalForm.style.display = "none";
}

openFormBtn.addEventListener("click", openModalForm);
backModalBtn.addEventListener("click", backModal);

// Gestion de la preview d'image et de l'upload
imageUpload.addEventListener("change", () => {
  if (imagePreview.src !== null) {
    imagePreviewDiv.innerHTML = "";
    updateForm();
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imagePreview.src = reader.result;
    imagePreview.id = "image-preview";
    imagePreviewDiv.appendChild(imagePreview);
    updateForm();
    checkForm();
  });
  reader.readAsDataURL(imageUpload.files[0]);
});

function updateForm() {
  if (imagePreview.src) {
    uploadElement.forEach((element) => {
      element.style.display = "none";
      imagePreviewDiv.classList.remove("hide");
    });
  } else {
    imagePreviewDiv.classList.add("hide");
  }
}

updateForm();

// verification des champs du formulaire
let valid = false;
function checkForm() {
  const error = document.querySelector("#error");
  if (
    addTitleInput.value.length > 0 &&
    addCategoryInput.value.length > 0 &&
    imagePreview.src
  ) {
    error.classList.add("hide");
    addPhotoBtn.style.backgroundColor = "#1d6154";
    valid = true;
  } else {
    valid = false;
    error.classList.remove("hide");
    addPhotoBtn.style.backgroundColor = "grey";
  }
  return valid;
}

addTitleInput.addEventListener("input", () => {
  checkForm();
});

// Envoi des données du formulaire
function sendForm(event) {
  event.preventDefault();
  newWork.title = addTitleInput.value;
  newWork.imageUrl = imagePreview.src;
  newWork.category = addCategoryInput.value;
  console.log(newWork);
}

form.addEventListener("submit", (event) => {
  if (checkForm() === true) {
    sendForm(event);
  } else {
    throw new Error("Veuillez remplir tous les champs et insérer une image");
  }
});

addPhotoBtn.addEventListener("click", (event) => {
  if (checkForm() === true) {
    sendForm(event);
  } else {
    throw new Error("Veuillez remplir tous les champs et insérer une image");
  }
});
