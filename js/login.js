let username = document.querySelector("#username");
let password = document.querySelector("#password");

let loginBtn = document.querySelector("#sign_in");

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", login);

function login(e) {
  e.preventDefault();
  console.log("enter");
  if (username.value === "" || password.value === "") {
    alert("Please enter data");
  } else {
    if (
      getUser &&
      getUser.trim() === username.value.trim() &&
      getPassword &&
      getPassword === password.value.trim()
    ) {
      console.log("yes");
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      console.log("no");
    }
  }
}
