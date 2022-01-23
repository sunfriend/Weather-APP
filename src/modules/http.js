const Weather = (() => {
    const pullDataLocation = async(url) => {
        
        const fetchPromise = fetch(url, {mode: 'cors'})
        .then((response) => {
            return response.json().then(
                (json) => {
                    return response.ok ? json : Promise.reject(json.message);
                }
            );
        }).then(response => {
            document.querySelector("[error-message]").style.visibility = "hidden";
            document.querySelector(".city-input-container").style.boxShadow = "";
            return response;
        })
        .catch(error => {
            const errorMessage = `This ${error}, please check correct spelling`;
            document.querySelector("[error-message]").style.visibility = "visible";
            document.querySelector(".city-input-container").style.boxShadow = "inset 0 0 0 3px red";
            console.log(error);
        });

        return fetchPromise;
    };

    return {pullDataLocation};
})();

const urlGenerator= (() => {
    const fetchKey = "&APPID=decfbcb74752d4a66611f644913d85c9";
    const urlLink = "https://api.openweathermap.org/data/2.5/weather?q=";
    const tempCelsius = "&units=metric";
    const tempFahrenheit = "&units=imperial";

    const build = ({city, degree}) => {
        let tempUnit = degree.substring(0, 1);
        let measure = tempUnit.toLowerCase() === 'c' ? tempCelsius : tempFahrenheit;
        return `${urlLink}${city}${fetchKey}${measure}`;
    }
    return {build};
})();

export {Weather, urlGenerator};