const apiKey = '09201f10b59146afa34173458231503';
const inputLocation = document.querySelector('input');
const divTime = document.querySelector('.container-time');
const divTemperature = document.querySelector('.container-temperature');

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
    

    const city = inputLocation.value;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}}`).then(response => response.json()).then(json =>{
    const timeCondition = json.current.condition.text;
    const timeIcon = json.current.condition.icon;
    const temperatureCelsius = json.current.temp_c;
    const temperraturerFahrenheit = json.current.temp_f;
    const windSpeed = json.current.wind_kph;
    console.log(json);
    console.log(temperatureCelsius)

    const imgTimeIcon = document.createElement('img');
    imgTimeIcon.src = timeIcon;
    divTime.appendChild(imgTimeIcon);

    const spanTimeDescription = document.createElement('span');
    spanTimeDescription.innerHTML = timeCondition;
    spanTimeDescription.classList.add('time-condition');
    divTime.appendChild(spanTimeDescription);

    divTemperature.innerHTML = `${temperatureCelsius}°`;

    // const spanTemperatureCelsius = document.createElement('span');
    // spanTemperatureCelsius.innerHTML = 
    // spanTemperatureCelsius.classList.add('temperature')
    // divTime.appendChild(spanTemperatureCelsius);

    



})



})

