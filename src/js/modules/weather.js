import { state } from './settings.js';

const weather = document.querySelector('.weather'),
    weatherIcon = weather.querySelector('.weather-icon'),
    temperature = weather.querySelector('.temperature'),
    weatherDescription = weather.querySelector('.weather-description'),
    city = weather.querySelector('.city'),
    wind = weather.querySelector('.wind'),
    humidity = weather.querySelector('.humidity');


async function getWeather(placement) {
    if (localStorage.getItem('city') != null) {
        placement = localStorage.getItem('city');
    } else {
        placement = 'Moscow';
    }

    city.value = placement;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${placement}&lang=${state.language}&appid=3fb26fa64f4c21f5ea740704f2123439&units=metric`,
        res = await fetch(url),
        data = await res.json();

        if (data.message !== undefined) {
            if (state.language === 'en') {
                alert('Input correct city name');
            } else {
                alert('Введите корректное название города');
            }
        }

    let windSpeed,
        measure,
        wet;

    if (state.language === 'en') {
        windSpeed = 'Wind speed';
        measure = 'm/s';
        wet = 'Humidity';
    } else {
        windSpeed = 'Скорость ветра';
        measure = 'м/с';
        wet = 'Влажность';
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${windSpeed}: ${data.wind.speed.toFixed(0)} ${measure}`;
    humidity.textContent = `${wet}: ${data.main.humidity.toFixed(0)}%`;
}

city.addEventListener('change', () => {
    localStorage.setItem('city', city.value);
    getWeather(city.value);
});

export { getWeather, weather, city }