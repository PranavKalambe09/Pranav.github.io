// Api to access the weather information
const api = {
    key: "96cc5485ddbb6b0b9dca89f784a4e2ad",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Accept the input city
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// Function to set the city as input for api
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);// Pass the funtion which will fetch the results
    }
}

// Function to fetch the information from the api and display it
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)// Api link
        .then(weather => {
            return weather.json();// JSON file containing weather information
        }).then(displayResults);
}

// Function which fetches individual data and defines the format in which the weather information will be displayed
function displayResults(weather) {
    console.log(weather);

    // Fethces the city and the country information
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Fetches the date 
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // Fetches the temperature and rounds it using Math object
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    // Fethces the weather element
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // Fethces the mininimum and maximum temperatures and rounds it
    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}