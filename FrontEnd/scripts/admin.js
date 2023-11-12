// Import de tout les éléments nécessaires
let activePage = window.location.pathname;
const navBar = document.querySelectorAll("#navbar a");
const contactBtn = document.querySelector("#contact");
const logoutBtn = document.querySelector("#logoutBtn");
const loginBtn = document.querySelector("#loginBtn");
const filters = document.querySelector(".filters");
export const editBtn = document.querySelector(".edit");
const header = document.querySelector("header");
const editBar = document.querySelector(".editbar");
export let userAuth = {
  userId: "",
  token: "",
};

// Fonction pour ajouter la classe "bold" au lien actif
navBar.forEach((link) => {
  if (link.href.includes(activePage)) {
    contactBtn.classList.remove("bold");
    loginBtn.classList.remove("bold");
    link.classList.add("bold");
    logoutBtn.classList.remove("bold");
  } else {
    link.classList.remove("bold");
    contactBtn.classList.remove("bold");
    logoutBtn.classList.remove("bold");
  }
});

// Fonction pour vérifier si l'utilisateur est connecté
export const adminAuth = function () {
  if (sessionStorage.getItem("token") !== null) {
    userAuth.token = sessionStorage.getItem("token");
    userAuth.userId = sessionStorage.getItem("userId");
    return true;
  } else {
    return false;
  }
};

// Fonction pour gérer le DOM selon la connexion de l'utilisateur
if (adminAuth() === true) {
  logoutBtn.classList.remove("hide");
  loginBtn.parentElement.classList.add("hide");
  if (filters) {
    filters.classList.add("hide");
    editBtn.classList.remove("hide");
    editBar.classList.remove("hide");
  }
  header.classList.add("headeredit");
} else {
  logoutBtn.parentElement.classList.add("hide");
  loginBtn.parentElement.classList.remove("hide");
  if (filters) {
    filters.classList.remove("hide");
    editBtn.classList.add("hide");
    editBar.classList.add("hide");
  }
  header.classList.remove("headeredit");
}

// Deconnexion de l'utilisateur
logoutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  window.location.href = "index.html";
});
