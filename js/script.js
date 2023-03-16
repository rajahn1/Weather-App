const apiKey = '09201f10b59146afa34173458231503';
const inputLocation = document.querySelector('input');

inputLocation.addEventListener('keypress', (event) => {
    
})

fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Ijui`).then(response => response.json()).then(json =>{
    const time = json.current.condition.text;
    const timeIcon = json.current.condition.icon;
    const temperatureCelsius = json.temp_c;
    const temperraturerFahrenheit = json.temp_f;
    const windSpeed = json.wind_kph;

    console.log(timeIcon);

    console.log(json)
})