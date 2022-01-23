import { Weather, urlGenerator } from "./http";
import { Animate } from "./animation";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import "../styles/main.scss";
import "../styles/controls.scss";
import "../styles/weather.scss";

const fetchButton = document.querySelector("[data-fetch-button]");
const cityInput = document.querySelector("[data-city-input]");
const tempUnitSwitch = document.querySelectorAll("input[type='checkbox']");
const weatherOutput = document.querySelector("[data-weather-output]");
const cityOutput = document.querySelector("[data-city]");
const descriptionOutput = document.querySelector("[data-description-section]");
const imageOutput = document.querySelector("[data-image-section]");
const animationOutput = document.querySelector("[data-animation-output]");

let tempUnit = "Fahrenheit";

/* window.onload = displayDefaultWeather(); */

fetchButton.addEventListener("click", displayWeather);
tempUnitSwitch.forEach(input => input.addEventListener("click", setTempUnit));

function displayDefaultWeather() {
    displayWeather(event);
}

function setTempUnit(event) {
    const checked = event.target.checked;
    checked ? tempUnit = "Celsius" : tempUnit = "Fahrenheit";
    displayWeather();
}


async function displayWeather() {
    /* event.preventDefault(); */

    const userInput = getUserInput();
    const genUrl = urlGenerator.build(userInput);
    const weatherData = await Weather.pullDataLocation(genUrl);
    
    if(!weatherData) return;

    const tempMin = Math.round(weatherData.main.temp_min);
    const tempMax = Math.round(weatherData.main.temp_max);
    const tempUnit = userInput.degree.substring(0, 1);
    weatherOutput.innerText = `Min: ${tempMin}º${tempUnit} \| Max: ${tempMax}º${tempUnit}`;
    cityOutput.innerText = `City: ${weatherData.name}`;

    const descSection = {};
    descSection.humidity = weatherData.main.humidity + "%";
    descSection.pressure = weatherData.main.pressure + "Hg";
    descSection.windSpeed = weatherData.wind.speed + "mph";
    descSection.weatherInformation = weatherData.weather[0].description;
    displayDescription(descSection);

    const imageSection = {};
    imageSection.mainWeather = weatherData.weather[0].main;
    imageSection.image = weatherData.weather[0].icon;
    displayImageSection(imageSection);

    console.log(weatherData.weather[0].main);

    Animate.setBackground(animationOutput, descSection.weatherInformation);
}

function displayDescription(data) {
    const regex = /([A-Z][a-z]*)/g;

    clearContainer(descriptionOutput);
    for (let [key, value] of Object.entries(data)) {
        key = (key.substring(0, 1).toUpperCase() + key.substring(1, key.length)).match(regex).join(" ");
        if (typeof(value) === "string") {
            value = value.substring(0, 1).toUpperCase() + value.substring(1, value.length);
        }
        const header = document.createElement("h4");
        const desc = document.createElement("p");
        header.innerText = key;
        desc.innerText = value;
        descriptionOutput.appendChild(header);
        descriptionOutput.appendChild(desc);
    }
}

function displayImageSection(data) {
    const urlImage = `http://openweathermap.org/img/wn/${data.image}@4x.png`;
    clearContainer(imageOutput);
    const header = document.createElement("h3");
    const image = document.createElement("img");
    image.src = urlImage;
    header.innerText = data.mainWeather;
    console.log(data.image);
    imageOutput.appendChild(header);
    imageOutput.appendChild(image);
}

function clearContainer(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function getUserInput() {
    const userInput = {};
    userInput.city = getCityInput();
    userInput.degree = tempUnit;
    return userInput;
}

function getCityInput() {
    let city = "London";
    city = cityInput.value ? cityInput.value : city;
    return city;
}


document.onkeydown = (e) => {
    if(e.code === "Enter") {
        displayWeather(e);
    }
};

export {displayDefaultWeather};