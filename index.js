/**********************************************************************
 *                    DOM's
 *******************************************************************/

const mainContainer = document.querySelector(".main_container");
const btnAvah = document.getElementById("avah");
const btnHiih = document.getElementById("hiih");

let formMessage = document.querySelector(".message");
let alertMessage = document.getElementById("alert_message");
let btnSubmit = document.querySelector(".submit");

/*************************************************************
 *                  Variabels
 * ************************************************************/

let service;
let filledLockers = new Map();
let tempArr = [];

function clearFields() {
  document.getElementById("psw").value = "";
  document.getElementById("re-psw").value = "";
}

function init() {
  formMessage.style.display = "none";
  service = undefined;
  clearFields();
}

function startApplication() {
  btnAvah.addEventListener("click", () => (service = "avah"));
  btnHiih.addEventListener("click", () => (service = "hiih"));
  document.getElementById("psw").focus();
}
function chooseLocker(lockerId) {
  if (service === "hiih") {
    if (document.getElementById(lockerId).style.backgroundColor !== "red") {
      tempArr.push(lockerId);
      window.location.href = "#form_container";
    }
  } else {
    if (document.getElementById(lockerId).style.backgroundColor === "red") {
      tempArr.push(lockerId);
      window.location.href = "#form_container";
    }
  }
}

function getLocker(lockerId) {
  let pswOne = document.getElementById("psw").value;
  let pswTwo = document.getElementById("re-psw").value;
  if (pswOne !== pswTwo) {
    formMessage.style.display = "block";
  } else {
    filledLockers.set(lockerId, pswOne);
    document.getElementById(lockerId).style.backgroundColor = "red";
    alertMessage.textContent = `Дугаар ${lockerId} Та тээшээ хийнэ үү!`;
    window.location.href = "#message_container";
    setTimeout(() => (window.location.href = "#main"), 3000);
  }
}

function backLocker(lockerId) {
  let pswOne = document.getElementById("psw").value;
  let pswTwo = document.getElementById("re-psw").value;
  if (pswOne === pswTwo) {
    if (pswOne === filledLockers.get(lockerId)) {
      filledLockers.delete(lockerId);
      document.getElementById(lockerId).style.backgroundColor = "lightgrey";
      alertMessage.textContent = `Дугаар ${lockerId}
              Та тээшээ авна уу!`;
      window.location.href = "#message_container";
      setTimeout(() => (window.location.href = "#main"), 3000);
    }
  }
}

startApplication();

mainContainer.addEventListener("click", (event) => {
  if (service !== undefined) {
    chooseLocker(event.target.id);
  }
});

btnSubmit.addEventListener("click", () => {
  if (service === "hiih") {
    getLocker(tempArr[0]);
    tempArr.splice(0, 1);
  } else {
    backLocker(tempArr[0]);
    tempArr.splice(0, 1);
  }
  init();
});
