export default class UI {
  navigation(className) {
    let eventLink = document.querySelector("body > nav > div > a:nth-child(2)");
    let usernameLink = document.querySelector(
      "body > nav > div > a:nth-child(3)"
    );
    let logoutLink = document.querySelector(
      "body > nav > div > a:nth-child(4)"
    );
    eventLink.classList.remove(className);
    usernameLink.classList.remove(className);
    logoutLink.classList.remove(className);
  }

  viewHeader(classProperty) {
    let leftHeader = document.querySelector(
      "body > div.d-md-flex.flex-md-equal.w-100.my-md-3.pl-md-3 > div.col-md-7"
    );
    let rightHeader = document.querySelector(
      "body > div.d-md-flex.flex-md-equal.w-100.my-md-3.pl-md-3 > div.col-md-5"
    );
    leftHeader.style.display = `${classProperty}`;
    rightHeader.style.display = `${classProperty}`;
  }

  view404(classProperty) {
    let container = document.querySelector("body > div.container");
    container.style.display = `${classProperty}`;
  }

  viewEventsHolder(classProperty) {
    let container = document.getElementById("eventsHolder");
    container.style.display = `${classProperty}`;
  }

  viewOrganizeEvent(classProperty) {
    let container = document.querySelector("body > form:nth-child(6)");
    container.style.display = `${classProperty}`;
  }

  viewEditEvent(classProperty) {
    let container = document.querySelector("body > form:nth-child(7)");
    container.style.display = `${classProperty}`;
  }

  viewEventDetails(classProperty) {
    let container = document.querySelector("body > div.row.event-details");
    container.style.display = `${classProperty}`;
  }

  viewSignIn(classProperty) {
    let container = document.querySelector("body > form:nth-child(9)");
    container.style.display = `${classProperty}`;
  }

  viewSignUp(classProperty) {
    let container = document.querySelector("body > form:nth-child(10)");
    container.style.display = `${classProperty}`;
  }

  viewUserDetails(classProperty) {
    let container = document.querySelector(
      "body > div.col-md-6.text-center.col-lg"
    );
    container.style.display = `${classProperty}`;
  }

  showAlert(label, message) {
    label.innerText = `${message}`;
    label.style.color = "red";
  }

  resetAlert(label, text) {
    label.innerText = `${text}`;
    label.style.color = "black";
  }
}
