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
