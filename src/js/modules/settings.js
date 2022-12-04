import { getWeather, city, weather } from './weather';
import { showTime, getTimeOfDay } from './time';
import { getQuotes, quotes, counter } from './quotes';
import { setBg, tagInput } from './bg';
import { player } from './audio';
import { translateTodo, containerTodo } from './todo';

const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    todo = document.querySelector('.todo');

// Object with global settings
let state;

if (localStorage.getItem('state') != null) {
    state = getState();
} else {
    state = {
        language: 'ru',
        photoSource: 'github',
        blocks: ['time', 'date', 'greeting', 'quotes', 'weather', 'player', 'todo']
    };
}

function setState() {
    localStorage.setItem('state', JSON.stringify(state));
}

function getState() {
    return JSON.parse(localStorage.getItem('state'));
}

// Translation Block
const langChanger = document.querySelector('.lang-changer');

showCurrentLanguage();

langChanger.addEventListener('click', () => {
    state.language = switchLanguage();
    showCurrentLanguage();
    getWeather(city.value);
    showTime();
    getQuotes(counter);
    translateTodo();
    translateSettings();
    setState();
});

function showCurrentLanguage() {
    if (state.language === 'ru') {
        langChanger.textContent = 'РУС';
    } else {
        langChanger.textContent = 'ENG';
    }
}

function switchLanguage() {
    const langPack = ['en', 'ru'];

    for (let i = 0; i < langPack.length; i++) {
        if (langPack[i] === state.language) {
            if (langPack[i] === 'en') {
                return 'ru';
            } else {
                return 'en'
            }
        }
    }
}

// Image Source Block
const photoSources = document.querySelectorAll('.source'),
    githubButton = document.querySelector('#github'),
    unsplashButton = document.querySelector('#unsplash'),
    flickrButton = document.querySelector('#flickr');

setImgButtonStyle();

photoSources.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.dataset.source == 'github') {
            tagInput.value = getTimeOfDay(state.language);
        }
        state.photoSource = e.target.dataset.source;
        setBg();
        setState();
        setImgButtonStyle();
    });
});

function chooseImgButtonStyle(button) {
    if (state.photoSource != button.dataset.source) {
        button.classList.remove('active');
        button.classList.add('transparent');
    } else {
        button.classList.remove('transparent');
        button.classList.add('active');
    }
}

function setImgButtonStyle() {
    chooseImgButtonStyle(githubButton);
    chooseImgButtonStyle(unsplashButton);
    chooseImgButtonStyle(flickrButton);
}

// Hide elements
const buttonTime = document.querySelector('.hide-time'),
    buttonDate = document.querySelector('.hide-date'),
    buttonGreeting = document.querySelector('.hide-greeting'),
    buttonQuotes = document.querySelector('.hide-quotes'),
    buttonPlayer = document.querySelector('.hide-player'),
    buttonWeather = document.querySelector('.hide-weather'),
    buttonTodo = document.querySelector('.hide-todo'),
    objects = [time, date, greeting, quotes, weather, player, todo];

const timeHeight = window.getComputedStyle(time).height,
      dateHeight = window.getComputedStyle(date).height,
      greetingHeight = window.getComputedStyle(greeting).height;

state.blocks.forEach(block => {
    objects.forEach(object => {
        if (object.matches(`.${block}`)) {
            object.classList.remove('hide');
            object.classList.add('show');
        }
    })
});

setButtonStyle(time, buttonTime);
setButtonStyle(date, buttonDate);
setButtonStyle(greeting, buttonGreeting);
setButtonStyle(quotes, buttonQuotes);
setButtonStyle(weather, buttonWeather);
setButtonStyle(player, buttonPlayer);
setButtonStyle(todo, buttonTodo);

buttonTime.addEventListener('click', () => {
    hideOrShowBlock(time);
    setButtonStyle(time, buttonTime);
});

buttonDate.addEventListener('click', () => {
    hideOrShowBlock(date);
    setButtonStyle(date, buttonDate);
});

buttonGreeting.addEventListener('click', () => {
    hideOrShowBlock(greeting);
    setButtonStyle(greeting, buttonGreeting);
});

buttonQuotes.addEventListener('click', () => {
    hideOrShowBlock(quotes);
    setButtonStyle(quotes, buttonQuotes);
});

buttonWeather.addEventListener('click', () => {
    hideOrShowBlock(weather);
    setButtonStyle(weather, buttonWeather);
});

buttonPlayer.addEventListener('click', () => {
    hideOrShowBlock(player);
    setButtonStyle(player, buttonPlayer);
});

buttonTodo.addEventListener('click', () => {
    hideOrShowBlock(todo);
    hideOrShowBlock(containerTodo);
    setButtonStyle(todo, buttonTodo);
});

function hideOrShowBlock(item) {
    if (item.matches('.hide')) {
        item.classList.remove('hide');
        item.classList.add('show');
        addToState(item);
    } else {
        item.classList.remove('show');
        item.classList.add('hide');
        deleteFromState(item);
    }
    setState();
}

function deleteFromState(item) {
    state.blocks.forEach((element, i) => {
        if (item.matches(`.${element}`)) {
            state.blocks.splice(i, 1);
        }
    })
}

function addToState(item) {
    state.blocks.push(item.classList[0]);
}

function setButtonStyle(item, button) {
    if (item.matches('.hide')) {
        button.classList.remove('active');
        button.classList.add('transparent');
    } else {
        button.classList.remove('transparent');
        button.classList.add('active');
    }
}


// Settings block

const openButton = document.querySelector('.settings-opener'),
    settings = document.querySelector('.container-settings'),
    sourceHeader = settings.querySelector('.source-header'),
    blocksHeader = settings.querySelector('.blocks-header'),
    langHeader = settings.querySelector('.lang-header'),
    modal = document.querySelector('.settings-modal');

openButton.addEventListener('click', () => {
    if (modal.matches('.show-settings')) {
        hideSettings();
    } else {
        showSettings();
    }
});

modal.addEventListener('click', (e) => {
    if (e.target == modal) hideSettings();
});

function showSettings() {
    modal.classList.remove('close-settings');
    modal.classList.add('show-settings');
    openButton.classList.remove('unrotate');
    openButton.classList.add('rotate');
}

function hideSettings() {
    modal.classList.remove('show-settings');
    modal.classList.add('close-settings');
    openButton.classList.remove('rotate');
    openButton.classList.add('unrotate');
}

// Settings Translation

function translateSettings() {
    if (state.language === 'ru') {
        sourceHeader.textContent = 'Источник фото';
        blocksHeader.textContent = 'Элементы страницы';
        langHeader.textContent = 'Язык';
        buttonTime.textContent = 'Время';
        buttonDate.textContent = 'Дата';
        buttonGreeting.textContent = 'Приветствие';
        buttonWeather.textContent = 'Погода';
        buttonPlayer.textContent = 'Аудиоплеер';
        buttonTodo.textContent = 'Менеджер задач';
        buttonQuotes.textContent = 'Цитата дня';
    } else {
        sourceHeader.textContent = 'Image Source';
        blocksHeader.textContent = 'Elements On Page';
        langHeader.textContent = 'Language';
        buttonTime.textContent = 'Time';
        buttonDate.textContent = 'Date';
        buttonGreeting.textContent = 'Greeting';
        buttonWeather.textContent = 'Weather';
        buttonPlayer.textContent = 'Player';
        buttonTodo.textContent = 'ToDo List';
        buttonQuotes.textContent = 'Quotes';
    }
}

export { state, time, date, greeting, todo, setState, translateSettings }


