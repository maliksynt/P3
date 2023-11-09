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

export const adminAuth = function () {
  if (sessionStorage.getItem("token") !== null) {
    userAuth.token = sessionStorage.getItem("token");
    userAuth.userId = sessionStorage.getItem("userId");
    return true;
  } else {
    return false;
  }
};

if (adminAuth() === true) {
  logoutBtn.classList.remove("hide");
  loginBtn.parentElement.classList.add("hide");
  filters.classList.add("hide");
  editBtn.classList.remove("hide");
  header.classList.add("headeredit");
  editBar.classList.remove("hide");
} else {
  logoutBtn.parentElement.classList.add("hide");
  loginBtn.parentElement.classList.remove("hide");
  filters.classList.remove("hide");
  editBtn.classList.add("hide");
  header.classList.remove("headeredit");
  editBar.classList.add("hide");
}

logoutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  window.location.href = "index.html";
});
