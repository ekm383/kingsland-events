import UI from "./UI.js";
import { eventSetup, eventDetails } from "./index.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

/**
 * Firebase Config
 */
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

// Get Data from Firestore Collection
const querySnapshot = await getDocs(collection(db, "events"));

/**
 * Firebase Auth State
 */
onAuthStateChanged(auth, (user) => {
  const ui = new UI();
  if (user) {
    // User signed in
    const { uid, email } = user;
    localStorage.setItem("id", uid);
    localStorage.setItem("email", email);

    // Hide all Divs that are not selected
    ui.hideViews();

    // Send data to the DOM
    eventSetup(querySnapshot.docs);
    setTimeout(() => {
      eventDetails(querySnapshot.docs);
    }, 2000);

    // check if there are any events
    const eventsContainer = document.querySelector("#eventsHolder");
    if (eventsContainer.hasChildNodes()) {
      document
        .querySelector("body > div.container")
        .setAttribute("style", "display: none");
    } else {
      document
        .querySelector("body > div.container")
        .setAttribute("style", "display: block");
    }
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

  localStorage.removeItem("id");
  localStorage.removeItem("email");

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

/**
 * Create New Event
 */
const createEvent = document.querySelector("body > form:nth-child(6)")
  .childNodes[11];
createEvent.addEventListener("click", async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("id");

  const name = document.querySelector("body > form:nth-child(6)").childNodes[3]
    .childNodes[1].value;

  const date = document.querySelector("body > form:nth-child(6)").childNodes[5]
    .childNodes[1].value;

  const description = document.querySelector("body > form:nth-child(6)")
    .childNodes[7].childNodes[1].value;

  const image = document.querySelector("body > form:nth-child(6)").childNodes[9]
    .childNodes[1].value;
  try {
    const docRef = await addDoc(collection(db, "events"), {
      name,
      date,
      description,
      interested: 0,
      organizer: userId,
      image,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  Toastify({
    text: "Added New Event!",
    backgroundColor:
      "linear-gradient(90deg, rgba(100,255,115,1) 0%, rgba(37,235,53,1) 100%)",
    duration: 1000,
  }).showToast();
  setTimeout(() => {
    location.reload();
  }, 1500);
});

/**
 * Delete Document from Firestore
 */
