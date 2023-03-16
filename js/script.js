const apiKey = '09201f10b59146afa34173458231503';
const inputLocation = document.querySelector('input');
const divTime = document.querySelector('.container-time');
const divTemperature = document.querySelector('.container-temperature');
const imgTimeIcon = document.querySelector('.time-img');
const spanTimeDescription = document.querySelector('.time-condition');
const locationIcon = document.querySelector('.icon-location');
const cityName = document.querySelector('.city');
const data = document.querySelector('.data');
const windSpan = document.querySelector('.wind span');
const humiditySpan = document.querySelector('.humidity span');
const rainSpan = document.querySelector('.rain span');


locationIcon.addEventListener('click', (event) => {
    inputLocation.style.display = 'flex';
})

inputLocation.addEventListener('blur', (event) => {
    inputLocation.style.border = 'unset';
    inputLocation.setAttribute('placeholder','digite sua cidade..');
})

inputLocation.addEventListener('focus', (event) => {
    inputLocation.removeAttribute('placeholder');
})

inputLocation.addEventListener('keypress', (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.key !== 'Enter') {
        inputLocation.value += event.key;
        return;
    }

    inputLocation.style.display = 'none';
    cityName.innerHTML = inputLocation.value;
    const city = inputLocation.value;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}}`).then(response => response.json()).then(json =>{
    const timeCondition = json.current.condition.text;
    const timeIcon = json.current.condition.icon;
    const temperatureCelsius = json.current.temp_c;
    const temperraturerFahrenheit = json.current.temp_f;
    const windSpeed = json.current.wind_kph;
    let cityData = json.location.localtime;

    cityData = new Date(cityData).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });

    imgTimeIcon.src = timeIcon;
    spanTimeDescription.innerHTML = timeCondition;
    divTemperature.innerHTML = `${temperatureCelsius}°`;
    data.innerHTML = cityData;
    windSpan.innerHTML = `${windSpeed} km/h`;

    inputLocation.value = '';
    console.log(json);
})
})

let city = 'london';

fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}}`).then(response => response.json()).then(json => {

    const specificDay = json.forecast.forecastday[0].day;
    const maxTemp = parseInt(specificDay.maxtemp_c);
    const minTemp = parseInt(specificDay.mintemp_c);

})

