const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");

// error
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
};

// success
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// valid
const checkEmail = (input) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
};

//check req
const checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
};

//check password match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, `${getFieldName(input1)} is not match`);
  }
};

// first words to uppercase
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// check length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, confirmation]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, confirmation);
});
