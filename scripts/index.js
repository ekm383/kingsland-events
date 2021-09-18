import UI from "./UI.js";

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
export const eventSetup = (data) => {
  const eventsHolder = document.querySelector("#eventsHolder");
  data.forEach((doc) => {
    const event = doc.data();
    let div = `
    <div data-id=${doc.id} class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden eventPlaceholder">
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
          <a href="#" class="eventDetails">Details</a>
        </div>
      </div>
  `;
    eventsHolder.innerHTML += div;
  });

  setUrlParam();
};

const setUrlParam = () => {
  // Bind ID to details button
  const details = document.querySelectorAll(".eventDetails");
  details.forEach((el, i) => {
    el.addEventListener("click", () => {
      let viewEventDetails = document.querySelector(
        "body > div.row.event-details"
      );
      let id = details[i].parentElement.parentElement.getAttribute("data-id");
      //console.log(id);

      const ui = new UI();
      ui.showView(viewEventDetails);

      var refresh =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?arg=${id}`;
      window.history.pushState({ path: refresh }, "", refresh);
    });
  });
};

// /**
//  * Read data from Firestore and format into HTML for Event Details
//  * @param {*} data
//  */
export const eventDetails = (data) => {
  // Get URL param
  let eventId = window.location.search;
  eventId = eventId.substr(5);
  console.log(eventId);

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
      <a href='#' class='btn btn-primary btn-lg'>
        Edit the event
      </a>
      <a href='#' class='btn btn-danger btn-lg'>
        Close the event
      </a>
      <a href='#' class='btn btn-info btn-lg'>
        Join the event
      </a>
    </div>
    `;
      eventDetails.innerHTML += div;
    }
  });
};
