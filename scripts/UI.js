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
    leftHeader.setAttribute("style", `${classProperty}`);
    rightHeader.setAttribute("style", `${classProperty}`);
  }

  viewEventsHolder(classProperty) {
    let container = document.getElementById("eventsHolder");
    container.setAttribute("style", `${classProperty}`);
  }

  hideViews() {
    let leftHeader = document.querySelector(
      "body > div.d-md-flex.flex-md-equal.w-100.my-md-3.pl-md-3 > div.col-md-7"
    );
    let rightHeader = document.querySelector(
      "body > div.d-md-flex.flex-md-equal.w-100.my-md-3.pl-md-3 > div.col-md-5"
    );
    let view404 = document.querySelector("body > div.container");
    let viewOrganizeEvent = document.querySelector("body > form:nth-child(6)");
    let viewEditEvent = document.querySelector("body > form:nth-child(7)");
    let viewEventDetails = document.querySelector(
      "body > div.row.event-details"
    );
    let viewSignIn = document.querySelector("body > form:nth-child(9)");
    let viewSignUp = document.querySelector("body > form:nth-child(10)");
    let viewUserDetails = document.querySelector(
      "body > div.col-md-6.text-center.col-lg"
    );

    let viewArray = [
      leftHeader,
      rightHeader,
      view404,
      viewOrganizeEvent,
      viewEditEvent,
      viewEventDetails,
      viewSignIn,
      viewSignUp,
      viewUserDetails,
    ];

    viewArray.forEach((view) => {
      view.setAttribute("style", "display: none");
    });
  }

  showView(name) {
    let leftHeader = document.querySelector(
      "body > div.d-md-flex.flex-md-equal.w-100.my-md-3.pl-md-3 > div.col-md-7"
    );
    let rightHeader = document.querySelector(
      "body > div.d-md-flex.flex-md-equal.w-100.my-md-3.pl-md-3 > div.col-md-5"
    );
    let view404 = document.querySelector("body > div.container");
    let viewEventsHolder = document.getElementById("eventsHolder");
    let viewOrganizeEvent = document.querySelector("body > form:nth-child(6)");
    let viewEditEvent = document.querySelector("body > form:nth-child(7)");
    let viewEventDetails = document.querySelector(
      "body > div.row.event-details"
    );
    let viewSignIn = document.querySelector("body > form:nth-child(9)");
    let viewSignUp = document.querySelector("body > form:nth-child(10)");
    let viewUserDetails = document.querySelector(
      "body > div.col-md-6.text-center.col-lg"
    );

    let viewArray = [
      leftHeader,
      rightHeader,
      view404,
      viewEventsHolder,
      viewOrganizeEvent,
      viewEditEvent,
      viewEventDetails,
      viewSignIn,
      viewSignUp,
      viewUserDetails,
    ];

    viewArray.forEach((view) => {
      if (name !== view) {
        view.setAttribute("style", "display: none");
      } else {
        view.setAttribute("style", "display: block");
      }
    });
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
