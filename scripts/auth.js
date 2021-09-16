import UI from "./UI.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOM6ruVDca0p3lwpT-Bh0Th2kbK4Ae92Y",
  authDomain: "kingsland-events.firebaseapp.com",
  projectId: "kingsland-events",
  appId: "1:985445105023:web:0f5bc83e7e8e90597dee4a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth, (user) => {
  const ui = new UI();
  if (user) {
    // User signed in
    const { uid, email } = user;
    console.log(email, uid);
    ui.hideViews();
    document.querySelector("body > nav > div > a:nth-child(3)").innerHTML =
      email;
    document.querySelector("body > nav > div > a:nth-child(5)").innerHTML = "";
  } else {
    ui.hideViews();
    ui.viewHeader();
    ui.viewEventsHolder("display: none");
    document.querySelector("body > nav > div > a:nth-child(2)").innerHTML = "";
    document.querySelector("body > nav > div > a:nth-child(3)").innerHTML = "";
    document.querySelector("body > nav > div > a:nth-child(4)").innerHTML = "";
    console.log("No User");
  }
});

/**
 * Sign up handler
 */
const signUpHandler = document.getElementsByTagName("form")[3];
signUpHandler.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  const ui = new UI();

  let email =
    document.getElementsByTagName("form")[3].childNodes[3].childNodes[1].value;
  let password =
    document.getElementsByTagName("form")[3].childNodes[5].childNodes[1].value;
  let passwordMatch =
    document.getElementsByTagName("form")[3].childNodes[7].childNodes[1].value;

  //   let emailRegex = /^[A-Za-z]\w{2,25}$/g;
  const emailLabel =
    document.getElementsByTagName("form")[3].childNodes[3].lastElementChild;
  if (email == "") {
    ui.showAlert(emailLabel, "Not a valid email");
    isValid = false;
  } else {
    ui.resetAlert(emailLabel, "email");
    isValid = true;
  }

  //   let passwordRegex = /^[A-Za-z]\w{5,25}$/g;
  const passwordLabel =
    document.getElementsByTagName("form")[3].childNodes[5].lastElementChild;
  if (password == "") {
    ui.showAlert(passwordLabel, "Password should be 6 characters long");
    isValid = false;
  } else {
    ui.resetAlert(passwordLabel, "Password");
    isValid = true;
  }

  const passMatchLabel =
    document.getElementsByTagName("form")[3].childNodes[7].lastElementChild;
  if (password !== passwordMatch) {
    ui.showAlert(passMatchLabel, "Password does not match");
    isValid = false;
  } else {
    ui.resetAlert(passMatchLabel, "Re-Password");
    isValid = true;
  }

  if (isValid) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
});

/**
 * Logout Handler
 */
const logoutButton = document.querySelector(
  "body > nav > div > a:nth-child(4)"
);
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      Toastify({
        text: "Successfully logged out!",
        backgroundColor:
          "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
        duration: 1000,
      }).showToast();
      setTimeout(() => {
        location.reload();
      }, 1500);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**
 * Sign in handler
 */
const signInHandler = document.getElementsByTagName("form")[2];
signInHandler.addEventListener("submit", (e) => {
  e.preventDefault();

  let email =
    document.getElementsByTagName("form")[2].childNodes[3].childNodes[1].value;
  let password =
    document.getElementsByTagName("form")[2].childNodes[5].childNodes[1].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      Toastify({
        text: "Successfully logged in!",
        backgroundColor:
          "linear-gradient(90deg, rgba(100,255,115,1) 0%, rgba(37,235,53,1) 100%)",
        duration: 1000,
      }).showToast();
      setTimeout(() => {
        location.reload();
      }, 1500);
    })
    .catch((error) => {
      Toastify({
        text: "Incorrect credentials, try again.",
        backgroundColor:
          "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
        duration: 3000,
      }).showToast();
      document.getElementsByTagName(
        "form"
      )[2].childNodes[3].childNodes[1].value = "";
      document.getElementsByTagName(
        "form"
      )[2].childNodes[5].childNodes[1].value = "";
      console.log(error);
    });
});
