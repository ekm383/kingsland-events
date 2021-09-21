import UI from "./UI.js";
import { db, querySnapshot } from "./firebase.js";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Home Page

const iconLogo = document.querySelector("body > nav > div > a:nth-child(1)");
iconLogo.addEventListener("click", () => {
  var refresh =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.pushState({ path: refresh }, "", refresh);
  location.reload();
});

// Show Login Navigation View
const loginNavLink = document.querySelector(
  "body > nav > div > a:nth-child(5)"
);
loginNavLink.addEventListener("click", () => {
  let viewSignIn = document.querySelector("body > form:nth-child(9)");
  const ui = new UI();
  ui.showView(viewSignIn);
});

// Show Sign In View
const signInLink = document.querySelector(
  "body > form:nth-child(10) > div:nth-child(6) > p > a"
);
signInLink.addEventListener("click", () => {
  let viewSignIn = document.querySelector("body > form:nth-child(9)");
  const ui = new UI();
  ui.showView(viewSignIn);
});

// Show Sign Up View
const signUpLink = document.querySelector(
  "body > form:nth-child(9) > div:nth-child(5) > p > a"
);
signUpLink.addEventListener("click", () => {
  let viewSignUp = document.querySelector("body > form:nth-child(10)");
  const ui = new UI();
  ui.showView(viewSignUp);
});

// Show Profile View
const profile = document.querySelector("body > nav > div > a:nth-child(3)");
profile.addEventListener("click", () => {
  let viewUserDetails = document.querySelector(
    "body > div.col-md-6.text-center.col-lg"
  );
  const ui = new UI();
  ui.showView(viewUserDetails);

  const email = localStorage.getItem("email");
  document.querySelector(
    "body > div.col-md-6.text-center.col-lg > div > p:nth-child(1)"
  ).innerText = email;

  let data = querySnapshot;
  const userId = localStorage.getItem("id");

  const typeInfo = document.querySelector(
    "body > div.col-md-6.text-center.col-lg > div > p.infoType"
  );

  let eventsArray = [];
  data.forEach((item) => {
    const event = item.data();
    if (event.organizer == userId) {
      eventsArray.push(item);

      document.querySelector(
        ".eventList"
      ).innerHTML += `<li>${event.name}</li>`;
    }
  });
  typeInfo.innerText = eventsArray.length;
});

// Show Organize Event
const organizeEvent = document.querySelector(
  "body > nav > div > a:nth-child(2)"
);
organizeEvent.addEventListener("click", () => {
  let viewOrganizeEvent = document.querySelector("body > form:nth-child(6)");
  const ui = new UI();
  ui.showView(viewOrganizeEvent);
});

// Show Create first Event View
const firstEventbutton = document.querySelector(
  "body > div.container > div > div > div.error-template > div.actions > a"
);
firstEventbutton.addEventListener("click", () => {
  let viewOrganizeEvent = document.querySelector("body > form:nth-child(6)");
  const ui = new UI();
  ui.showView(viewOrganizeEvent);
});

/**
 * Read data from Firestore and format into HTML
 * @param {*} data
 */
export function eventSetup(data) {
  const eventsHolder = document.querySelector("#eventsHolder");
  data.forEach((doc) => {
    const event = doc.data();
    let div = `
        <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden eventPlaceholder">
            <div class="my-3 p-3">
              <h2 class="display-5">${event.name}</h2>
            </div>
            <div>
              <div class="img">
                <img
                  class="eventPicture"
                  src="${event.image}"
                />
              </div>
              <a data-id="${doc.id}" href="#" class="eventDetails">Details</a>
            </div>
          </div>
      `;
    eventsHolder.innerHTML += div;
  });
  setUrlParam();
}

function setUrlParam() {
  // Bind ID to details button
  const details = document.querySelectorAll(".eventDetails");
  details.forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      let viewEventDetails = document.querySelector(
        "body > div.row.event-details"
      );

      const ui = new UI();
      ui.showView(viewEventDetails);

      var refresh =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?arg=${id}`;
      window.history.pushState({ path: refresh }, "", refresh);
      eventDetails(querySnapshot);
    });
  });
}

// /**
//  * Read data from Firestore and format into HTML for Event Details
//  * @param {*} data
//  */
function eventDetails(data) {
  // Get URL param
  let eventId = window.location.search;
  eventId = eventId.substr(5);

  //Get Observer from Storage
  const email = localStorage.getItem("email");

  const eventDetails = document.querySelector(".event-details");
  data.forEach((doc) => {
    if (doc.id == eventId) {
      const event = doc.data();
      const div = `
        <div class='col-md-12 text-center overflow-hidden'>
          <img
            class='details-img'
            src='${event.image}'
          />
          <div class='my-3 p-3'>
            <h2 class='display-5'>${event.name}</h2>
            <p class='infoType'>Description:</p>
            <p class='event-description'>${event.description}</p>
            <p class='infoType'>
              Date: <small>${event.date}</small>
            </p>
            <p class='infoType'>
              Peope interested in: <small>${event.interested}</small>
            </p>
            <p class='infoType'>
              Organizer: <small>${email}</small>
            </p>
          </div>
          <a href='#' data-id="${doc.id}" id="editEvent" class='btn btn-primary btn-lg'>
            Edit the event
          </a>
          <a href='#' data-id="${doc.id}" id="deleteEvent" class='btn btn-danger btn-lg'>
            Close the event
          </a>
          <a href='#' data-id="${doc.id}" id="joinEvent" class='btn btn-info btn-lg'>
            Join the event
          </a>
        </div>
        `;
      eventDetails.innerHTML += div;
    }
  });
  deleteEvent();
  joinEvent();
  updateEvent();
}

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
    Toastify({
      text: "Added New Event!",
      backgroundColor:
        "linear-gradient(90deg, rgba(100,255,115,1) 0%, rgba(37,235,53,1) 100%)",
      duration: 1000,
    }).showToast();
    setTimeout(() => {
      location.reload();
    }, 1500);
  } catch (error) {
    Toastify({
      text: error,
      backgroundColor:
        "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
      duration: 3000,
    }).showToast();
  }
});

/**
 * Delete Document from Firestore
 */
function deleteEvent() {
  const closeEvent = document.querySelector("#deleteEvent");
  closeEvent.addEventListener("click", async (e) => {
    const id = e.target.getAttribute("data-id");
    try {
      await deleteDoc(doc(db, "events", id));

      Toastify({
        text: "Successfully deleted event!",
        backgroundColor:
          "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
        duration: 1000,
      }).showToast();
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      Toastify({
        text: error,
        backgroundColor:
          "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
        duration: 3000,
      }).showToast();
    }
  });
}

/**
 * Update Interested count in FIrestore
 */
function joinEvent() {
  const join = document.querySelector("#joinEvent");
  join.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");

    let data = querySnapshot;
    data.forEach(async (item) => {
      if (item.id === id) {
        const event = item.data();
        let inc = event.interested + 1;

        try {
          const interested = doc(db, "events", id);
          await updateDoc(interested, {
            interested: inc,
          });

          Toastify({
            text: "Joined Event!",
            backgroundColor:
              "linear-gradient(90deg, rgba(100,255,115,1) 0%, rgba(37,235,53,1) 100%)",
            duration: 1000,
          }).showToast();
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (error) {
          Toastify({
            text: error,
            backgroundColor:
              "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
            duration: 3000,
          }).showToast();
        }
      }
    });
  });
}

/**
 * Update Event in FIrestore
 */
function updateEvent() {
  const update = document.querySelector("#editEvent");
  update.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");

    let viewEditEvent = document.querySelector("body > form:nth-child(7)");
    const ui = new UI();
    ui.showView(viewEditEvent);

    let editEventName =
      document.getElementsByTagName("form")[1].childNodes[3].childNodes[1];
    let editDate =
      document.getElementsByTagName("form")[1].childNodes[5].childNodes[1];
    let editDescription =
      document.getElementsByTagName("form")[1].childNodes[7].childNodes[1];
    let editImage =
      document.getElementsByTagName("form")[1].childNodes[9].childNodes[1];

    let data = querySnapshot;
    data.forEach((item) => {
      if (item.id === id) {
        const event = item.data();
        editEventName.value = event.name;
        editDate.value = event.date;
        editDescription.value = event.description;
        editImage.value = event.image;
      }
    });
  });

  updateHandler();
}

function updateHandler() {
  const submitButton = document.getElementsByTagName("form")[1].childNodes[13];
  submitButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      // Get URL param
      let eventId = window.location.search;
      eventId = eventId.substr(5);

      let editEventName =
        document.getElementsByTagName("form")[1].childNodes[3].childNodes[1];
      let editDate =
        document.getElementsByTagName("form")[1].childNodes[5].childNodes[1];
      let editDescription =
        document.getElementsByTagName("form")[1].childNodes[7].childNodes[1];
      let editImage =
        document.getElementsByTagName("form")[1].childNodes[9].childNodes[1];

      const updateEvent = doc(db, "events", eventId);
      await updateDoc(updateEvent, {
        name: editEventName.value,
        date: editDate.value,
        description: editDescription.value,
        image: editImage.vlaue,
      });

      Toastify({
        text: "Updated Event!",
        backgroundColor:
          "linear-gradient(90deg, rgba(100,255,115,1) 0%, rgba(37,235,53,1) 100%)",
        duration: 1000,
      }).showToast();
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      Toastify({
        text: error,
        backgroundColor:
          "linear-gradient(90deg, rgba(255,115,100,1) 0%, rgba(235,143,37,1) 100%)",
        duration: 3000,
      }).showToast();
    }
  });
}
