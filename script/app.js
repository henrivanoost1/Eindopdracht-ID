let email = {},
  password = {},
  signInButton;



const getDOMElements = function() {
  email.field = document.querySelector('.js-username-field');
  email.input = document.querySelector('.js-username-input');
  email.errorMessage = document.querySelector('.js-username-error-message');

  signInButton = document.querySelector('.js-sign-in-button');
};

const isValidEmailAddress = function(emailAddress) {
  // Basis manier om e-mailadres te checken.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
  return !fieldValue || !fieldValue.length;
};

const addErrors = function(formfield) {
  formfield.classList.add('has-error');
};

const removeErrors = function(formField) {
  formField.field.classList.remove('has-error');
};

const enableListeners = function() {
  email.input.addEventListener('blur', function(e) {
    const typedInput = e.target.value;
    if (!isValidEmailAddress(typedInput)) {
      if (isEmpty(typedInput)) {
        email.errorMessage.innerHTML = 'Dit veld is vereist';
      } else {
        email.errorMessage.innerHTML = 'Het emailadres is fout';
      }
      addErrors(email.field);
    } else {
      window.location.open = 'weather.html';
    }
  });

  signInButton.addEventListener('blur', function(e) {});
};

document.addEventListener('DOMContentLoaded', function() {
  handleFloatingLabel();
  getDOMElements();
  enableListeners();
});
