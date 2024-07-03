let searchInput = document.getElementById("search")

// 
let todayDay = document.getElementById("today-day");
let todayDate = document.getElementById("today-date");
let searchCity = document.getElementById("search-city");
let degreeNum = document.getElementById("degree-num");
let degreeIcon = document.getElementById("degree-icon");
let condition = document.getElementById("condition");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");
let windDirection = document.getElementById("wind-direction");
// 

let nextDayDate = document.getElementById("next-day-date");
let nextDayIcon = document.getElementById("next-day-icon");
let tomorrowDegreeMax = document.getElementById("tomorrow-degree-max");
let tomorrowDegreeMin = document.getElementById("tomorrow-degree-min");
let tomorrowWeatherCondition = document.getElementById("tomorrow-weather-condition");
// 
let afterTomorrowDate = document.getElementById("after-tomorrow-date");
let afterTomorrowIcon = document.getElementById("after-tomorrow-icon");
let afterTomorrowDegreeMax = document.getElementById("after-tomorrow-degree-max");
let afterTomorrowDegreeMin = document.getElementById("after-tomorrow-degree-min");
let afterTomorrowCondition = document.getElementById("after-tomorrow-condition");


async function getweather(cityName) {
    let myreq = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fcda5ddb344641ceac570653240107&q=${cityName}&days=3`)
    let weatherData = await myreq.json()
    return weatherData
}

function displayTodayWeather(data) {
    let date = new Date()
    todayDay.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
    todayDate.innerHTML = date.getDate() + date.toLocaleDateString("en-US", { month: "long" });
    searchCity.innerHTML = data.location.name;
    degreeNum.innerHTML = data.current.temp_c + "<sup>o</sup>C";
    degreeIcon.setAttribute("src", data.current.condition.icon);
    condition.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    windSpeed.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir
}

function displayTomorrowWeather(data) {
    let tomorrowDate = new Date(data.forecast.forecastday[1].date)
    nextDayDate.innerHTML = tomorrowDate.toLocaleDateString("en-US", { weekday: "long" })
    nextDayIcon.setAttribute("src", data.forecast.forecastday[1].day.condition.icon);
    tomorrowDegreeMax.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    tomorrowDegreeMin.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
     tomorrowWeatherCondition.innerHTML = data.forecast.forecastday[1].day.condition.text

}
function displayDayAfter(data) {
    let afterDate = new Date(data.forecast.forecastday[2].date)
    afterTomorrowDate.innerHTML = afterDate.toLocaleDateString("en-US", { weekday: "long" })
    afterTomorrowIcon.setAttribute("src", data.forecast.forecastday[2].day.condition.icon);
    afterTomorrowDegreeMax.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    afterTomorrowDegreeMin.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
     afterTomorrowCondition.innerHTML = data.forecast.forecastday[2].day.condition.text
}

async function start(city="cairo") {
    let weatherInfo = await getweather(city)
    if(!weatherInfo.error){
        displayTodayWeather(weatherInfo)
        displayTomorrowWeather(weatherInfo)
        displayDayAfter(weatherInfo)
    }
}

start()

searchInput.addEventListener("keyup" , function(){
    start(searchInput.value)
})