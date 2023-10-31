// async function fetchDataUser(){
// }

let email = document.querySelector("#email");
let password = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener('click', (event)=>{
    event.preventDefault();
    console.log(email.value, password.value);
})

