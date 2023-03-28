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


const forecastContainer = document.querySelector('.forecast-container');
const forecastTemp = document.querySelectorAll('.forecast-temp');
const forecastImg = document.querySelectorAll('.forecast-img');
const forecastHour = document.querySelectorAll('.forecast-hour');

forecastContainer.style.display = 'none';

cityName.innerHTML = 'Lalaland';

locationIcon.addEventListener('click', (event) => {
    inputLocation.style.display = 'flex';
    inputLocation.value = '';
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
    const city = inputLocation.value;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}}`).then(response => response.json()).then(json => {

    if (json.error) {
        alert(json.error.message);
        imgTimeIcon.src = './assets/not-found-icon.png';
        spanTimeDescription.innerHTML = 'Fecho o tempo!';
        divTemperature.innerHTML = '404°';
        data.innerHTML = 'April 15, 1452';
        windSpan.innerHTML = '';
        humiditySpan.innerHTML = '';
        rainSpan.innerHTML = '';
        return;
    }
    const timeCondition = json.current.condition.text;
    const timeIcon = json.current.condition.icon;
    const temperatureCelsius = parseInt(json.current.temp_c);
    const temperraturerFahrenheit = json.current.temp_f;
    const windSpeed = json.current.wind_kph;
    const humidity = json.current.humidity;
    const precip = json.current.precip_mm;
    let cityData = json.location.localtime;
    console.log(json);

    cityData = new Date(cityData).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
    
    cityName.innerHTML = json.location.name;
    imgTimeIcon.src = timeIcon;
    spanTimeDescription.innerHTML = timeCondition;
    divTemperature.innerHTML = `${temperatureCelsius}°C`;
    data.innerHTML = cityData;
    windSpan.innerHTML = `${windSpeed} km/h`;
    humiditySpan.innerHTML = `${humidity} %`;

    inputLocation.value = '';
    
})

fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}}`).then(response => response.json()).then(json => {

    const rainChance = json.forecast.forecastday[0].day.daily_chance_of_rain;
    rainSpan.innerHTML = `${rainChance}%`;

    const specificDay = json.forecast.forecastday[0].day;
    
    const specificHour = json.forecast.forecastday[0].hour;
    const hour = json.location.localtime;
    const actualHour = new Date(hour).toLocaleTimeString([],{hour: "2-digit"})
    let firstHour;

    console.log(json);

    for (let index = 0; index < specificHour.length; index++) {
        let specificHourFormated = new Date(specificHour[index].time).toLocaleTimeString([],{hour: "2-digit"});
        if (specificHourFormated === actualHour) {
            for(let i=0; i < forecastHour.length; i++) {
                forecastHour[i].innerHTML = `${specificHourFormated}:00`;
                forecastTemp[i].innerHTML = `${specificDay.avgtemp_c} °`;
                forecastImg[i].src = specificDay.condition.icon;
            }
        }
        }
        forecastContainer.style.display = 'flex';
})
})




