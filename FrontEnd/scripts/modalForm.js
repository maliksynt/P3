import { modal } from "./modal.js";
import { modalForm } from "./modal.js";

const openFormBtn = document.querySelector("#addPhotoBtn");
const backModalBtn = document.querySelector(".backModal");

function openModalForm() {
  modal.style.display = "none";
  modalForm.style.display = "block";
}

function backModal() {
  modal.style.display = "block";
  modalForm.style.display = "none";
}

openFormBtn.addEventListener("click", () => {
  openModalForm();
});

backModalBtn.addEventListener("click", () => {
  backModal();
});
