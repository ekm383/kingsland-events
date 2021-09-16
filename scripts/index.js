import UI from "./UI.js";

// Login Navigation Event Listener
const loginNavLink = document.querySelector(
  "body > nav > div > a:nth-child(5)"
);
loginNavLink.addEventListener("click", () => {
  const ui = new UI();
  ui.viewHeader("none");
  ui.viewSignIn("block");
  ui.viewSignUp("none");
});

// Sign In Event Listener
const signInLink = document.querySelector(
  "body > form:nth-child(10) > div:nth-child(6) > p > a"
);
signInLink.addEventListener("click", () => {
  const ui = new UI();
  ui.viewHeader("none");
  ui.viewSignIn("block");
  ui.viewSignUp("none");
});

// Sign Up Event Listener
const signUpLink = document.querySelector(
  "body > form:nth-child(9) > div:nth-child(5) > p > a"
);
signUpLink.addEventListener("click", () => {
  const ui = new UI();
  ui.viewHeader("none");
  ui.viewSignUp("block");
  ui.viewSignIn("none");
});
