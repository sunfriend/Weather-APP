import variables from "../styles/variables.module.scss";
let MersenneTwister = require('mersenne-twister');
let generator = new MersenneTwister();

const Animate = (() => {

    const setBackground = (container, weatherType) => {

        const weatherData = [
            {clear: variables.clearDay, sun: true},
            {cloud: variables.cloudyDay, sun: true},
            {storm: variables.stormyDay, sun: false},
            {rain: variables.rainyDay, sun: false},
            {snow: variables.snowyDay, sun: false},
            {mist: variables.mistyDay, sun: false},
            {fog: variables.foggyDay, sun: false}
        ];

        clearElements(container);

        const weather = regexWeather(weatherType);
        const sun = makeSun();
        for (let key of weatherData) {
            const skyKey = Object.keys(key)[0];
            const sunKey = Object.keys(key)[1];
            if (skyKey === weather) {
                container.style.background = `${key[skyKey]}`;
                if (key[sunKey]) {
                    container.appendChild(sun);
                };
                const clouds = getFinalClouds(skyKey);
                if (clouds) {
                    container.appendChild(clouds);
                }
            }
            console.log(key[sunKey]);
        }
    };

    function randomCloud() {
        const random = Math.round(generator.random() + 1);
        return `cloud-${random}`;
    }

    function regexWeather(type) {
        const typeReg = /(clear|cloud|rain|thunderstorm|snow|mist|fog)/gi;
        return type.match(typeReg).toString();
    }

    function makeSun() {
        const sun = document.createElement("div");
        sun.classList.add("sun");
        return sun;
    }

    function getClouds() {
        const clouds = document.createElement("div");
        clouds.classList.add("clouds-container");
        for (let i = 1; i <= 10; i++) {
            const cloud = document.createElement("div");
            cloud.classList.add(`altitude-${i}`);
            cloud.classList.add(randomCloud());
            clouds.appendChild(cloud);
        }   
        return clouds;
    }

    function getSnowflakes() {
        const snoflakes = document.createElement("div");

        for (let i = 0; i < 4; i++) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snow");
            snoflakes.appendChild(snowflake);
        }
        return snoflakes;
    }

    function getRainClouds(extreme) {
        let clouds = getClouds();
        const cloudsArray = Array.from(clouds.children);
        clearElements(clouds);
        cloudsArray.map(cloud => {
            const rain = document.createElement("div");
            rain.classList.add("rain");
            cloud.classList.add("rainy");
            if (extreme === "thunderstorm") {
                cloud.classList.add("thunderstorm");
            }
            cloud.appendChild(rain);
            clouds.appendChild(cloud);
        });
        return clouds;
    }

    function getSnowClouds() {
        let clouds = getClouds();
        const cloudsArray = Array.from(clouds.children);
        clearElements(clouds);
        cloudsArray.map(cloud => {
            cloud.appendChild(getSnowflakes());
            clouds.appendChild(cloud);
        });
        return clouds;
    }

    function getFinalClouds(type) {
        switch (type) {
            case "cloud": {
                return getClouds();
            }
            case "rain": {
                return getRainClouds();
            }
            case "thunderstorm": {
                return getRainClouds("thunderstorm")
            } 
            case "snow": {
                return getSnowClouds();
            }

            default : {
                console.log("no weather found");
                break;
            }
        }
    }

    function clearElements(container) {
        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    return {setBackground};
})();

export {Animate};