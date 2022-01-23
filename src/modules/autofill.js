const APP_ID = "Q2D6IPEUOW";
const API_KEY = "6f9937dd7a65b1b74fd39f1a349ed030";

var places = require('places.js');

var placesAutocomplete = places({
  appId: APP_ID,
  apiKey: API_KEY,
  container: document.querySelector('[data-city-input]')
});


export {placesAutocomplete};