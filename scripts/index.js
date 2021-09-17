import UI from "./UI.js";

// Home Page
const iconLogo = document.querySelector("body > nav > div > a:nth-child(1)");
iconLogo.addEventListener("click", () => {
  location.reload();
});

// Login Navigation Event Listener
const loginNavLink = document.querySelector(
  "body > nav > div > a:nth-child(5)"
);
loginNavLink.addEventListener("click", () => {
  let viewSignIn = document.querySelector("body > form:nth-child(9)");
  const ui = new UI();
  ui.showView(viewSignIn);
});

// Sign In Event Listener
const signInLink = document.querySelector(
  "body > form:nth-child(10) > div:nth-child(6) > p > a"
);
signInLink.addEventListener("click", () => {
  let viewSignIn = document.querySelector("body > form:nth-child(9)");
  const ui = new UI();
  ui.showView(viewSignIn);
});

// Sign Up Event Listener
const signUpLink = document.querySelector(
  "body > form:nth-child(9) > div:nth-child(5) > p > a"
);
signUpLink.addEventListener("click", () => {
  let viewSignUp = document.querySelector("body > form:nth-child(10)");
  const ui = new UI();
  ui.showView(viewSignUp);
});

// Show Profile
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

// Create first Event
const firstEventbutton = document.querySelector(
  "body > div.container > div > div > div.error-template > div.actions > a"
);
firstEventbutton.addEventListener("click", () => {
  let viewOrganizeEvent = document.querySelector("body > form:nth-child(6)");
  const ui = new UI();
  ui.showView(viewOrganizeEvent);
});

// Get Firebase Data
export const eventSetup = (data) => {
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
          <a href="#" class="eventDetails">More</a>
        </div>
      </div>
  `;
    eventsHolder.innerHTML += div;
  });
};
