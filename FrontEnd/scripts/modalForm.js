// Import de tout les éléments nécessaires
import { modal, modalForm, closeModal, populateModal } from "./modal.js";
import { userAuth } from "./admin.js";
import { fetchWorks, populateGallery } from "./worksData.js";

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

// Verification des champs du formulaire
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
async function sendForm(event) {
  event.preventDefault();
  const formData = new FormData();
  formData.append("title", addTitleInput.value);
  formData.append("category", addCategoryInput.value);
  formData.append("image", imageUpload.files[0]);

  await sendNewWork(formData);
  closeModal();

  await fetchWorks();
  populateGallery();
  populateModal();
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

// Fonction envoi d'un nouveau travail au backend
async function sendNewWork(formData) {
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${userAuth.token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut: ${response.status}`);
  }
}
