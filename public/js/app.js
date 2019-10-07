const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorMessage = document.querySelector(".error");
const successMessage = document.querySelector(".success");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  errorMessage.innerHTML = 'loading message...';
  successMessage.innerHTML = '';

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        errorMessage.innerHTML = data.error;
      } else {
        errorMessage.innerHTML = data.location;
        successMessage.innerHTML =  data.forecast;
      }
    });
  });
});