import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector('.feedback-form');

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

form.addEventListener('input', throttle(onInputData, 500));

form.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;
reloadPage();

function onInputData(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  else {
    console.log({ email: email.value, message: message.value });
  }

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  dataForm = {};
}