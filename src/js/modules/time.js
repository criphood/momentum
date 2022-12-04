import { state, time, date, greeting } from './settings.js';

const greetingText = document.querySelector('.greeting-text'),
      name = greeting.querySelector('.name');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

function showTime() {
    const currentDate = new Date(),
        currentTime = currentDate.toLocaleTimeString(),
        currentDay = currentDate.toLocaleDateString(`${state.language}`, { weekday: 'long', month: 'long', day: 'numeric' });

    date.textContent = currentDay[0].toUpperCase() + currentDay.slice(1);
    time.textContent = currentTime;
    getTimeOfDay(state.language);
    setTimeout(showTime, 1000);
}


function getTimeOfDay(language) {
    let timesEn = ['Night', 'Morning', 'Afternoon', 'Evening', 'Night'],
        timesRu = ['ночи', 'утро', 'день', 'вечер', 'ночи'],
        timesOfDay,
        greetingRus;

    if (language === 'en') {
        name.placeholder = '[Enter name]';
        timesOfDay = timesEn;
    } else if (language === 'ru') {
        name.placeholder = '[введите имя]';
        timesOfDay = timesRu;
    }

    const hours = new Date().getHours(),
        timeOfDay = Math.floor(hours / 6);

    if (timeOfDay == 0 || timeOfDay == 4) greetingRus = 'Доброй';
    if (timeOfDay == 1) greetingRus = 'Доброе';
    if (timeOfDay == 2 || timeOfDay == 3) greetingRus = 'Добрый';

    const greetingTranslation = {
        en: `Good ${timesOfDay[timeOfDay]},`,
        ru: `${greetingRus} ${timesOfDay[timeOfDay]},`,
    }

    greetingText.innerHTML = greetingTranslation[language];

    return timesEn[timeOfDay][0].toLowerCase() + timesEn[timeOfDay].slice(1);
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

export { showTime, getTimeOfDay, time, date, greeting }