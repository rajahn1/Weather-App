const apiKey = '09201f10b59146afa34173458231503';
const api = axios.create({
    baseURL: `https://api.weatherapi.com/v1/`,
    timeout: 10000,
    headers: {'content-type': 'application/json'}
  });

function getCity(city) {
    const response = api.get(`current.json?key=${apiKey}&q=${city}`);
    return response;
};

function getForecast(city) {
    const response = api.get(`forecast.json?key=${apiKey}&q=${city}}`)
    return response;
}
const inputLocation = document.querySelector('input');
const divTime = document.querySelector('.container-time');
const divTemperature = document.querySelector('.container-temperature');
const imgTimeIcon = document.querySelector('.time-img');
const spanTimeDescription = document.querySelector('.time-condition');
const locationIcon = document.querySelector('.icon-location');
const cityName = document.querySelector('.city');
const localData = document.querySelector('.data');
const windSpan = document.querySelector('.wind span');
const humiditySpan = document.querySelector('.humidity span');
const rainSpan = document.querySelector('.rain span');

const forecastContainer = document.querySelector('.forecast-container');
const forecastTemp = document.querySelectorAll('.forecast-temp');
const forecastImg = document.querySelectorAll('.forecast-img');
const forecastHour = document.querySelectorAll('.forecast-hour');

forecastContainer.style.display = 'none';

cityName.innerHTML = 'Search';

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
    let city = inputLocation.value;

    async function searchCity(){
    try {
        const { data } = await getCity(city);
        if (data.error) {
            alert(data.error.message);
            imgTimeIcon.src = './assets/not-found-icon.png';
            spanTimeDescription.innerHTML = 'No time for this';
            divTemperature.innerHTML = '404°';
            localData.innerHTML = 'April 15, 1452';
            windSpan.innerHTML = '';
            humiditySpan.innerHTML = '';
            rainSpan.innerHTML = '';
            cityName.innerHTML = 'Konoha';
            forecastContainer.style.display = 'none';
            return;
        }

    const timeCondition = data.current.condition.text;
    const timeIcon = data.current.condition.icon;
    const temperatureCelsius = parseInt(data.current.temp_c);
    const temperraturerFahrenheit = data.current.temp_f;
    const windSpeed = data.current.wind_kph;
    const humidity = data.current.humidity;
    const precip = data.current.precip_mm;
    let cityData = data.location.localtime;

    cityData = new Date(cityData).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
      console.log(cityData);
    
    cityName.innerHTML = data.location.name;
    imgTimeIcon.src = timeIcon;
    spanTimeDescription.innerHTML = timeCondition;
    divTemperature.innerHTML = `${temperatureCelsius}°C`;
    localData.innerHTML = cityData;
    windSpan.innerHTML = `${windSpeed} km/h`;
    humiditySpan.innerHTML = `${humidity} %`;

    inputLocation.value = '';
    } catch (error) {
        console.log(error)
    }
}
searchCity();

    async function searchForecast() {
        try {
            const {data} = await getForecast(city);
            const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;
    rainSpan.innerHTML = `${rainChance}%`;

    const hour = data.location.localtime;
    let actualHour = new Date(hour).toLocaleTimeString([],{hour: "2-digit"});

    let nextHour = Number(actualHour) + 1;
    if (actualHour == 23) {
        nextHour = 0;
    }

    for(let i= 0; i < forecastHour.length; i++) {
        let hourIndex = nextHour + i;
        
        if (hourIndex === 24) {
            hourIndex = 0;
        }
        if (hourIndex === 25) {
            hourIndex = 1;
        }
        if (hourIndex === 26) {
            hourIndex = 2;
        }

        let specificHour = data.forecast.forecastday[0].hour[hourIndex];

        forecastTemp[i].innerHTML = `${Math.round(specificHour.temp_c)}°C`;
        forecastImg[i].src = specificHour.condition.icon;
        forecastHour[i].innerHTML = hourIndex < 10 ? `0${Number(hourIndex)}:00` : `${Number(hourIndex)}:00`;
        }
        forecastContainer.style.display = 'flex';
    } catch (error) {
        console.log(error)
        }
    }
    searchForecast();
})