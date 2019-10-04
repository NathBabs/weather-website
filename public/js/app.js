console.log('Client side javascript is loaded');

/* fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});
 */
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorMessage = document.querySelector(".error");
const successMessage = document.querySelector(".success");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  errorMessage.innerHTML = 'loading message...';
  successMessage.innerHTML = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
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