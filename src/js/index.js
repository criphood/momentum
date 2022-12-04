'use strict';

import * as timeModule from './modules/time.js';
import * as bgModule from './modules/bg.js';
import * as weatherModule from './modules/weather.js';
import * as quotesModule from './modules/quotes.js';
import * as audioModule from './modules/audio.js';
import * as todoModule from './modules/todo.js';
import * as settingsModule from './modules/settings.js';
import { state } from './modules/settings.js';
import { city } from './modules/weather.js';
import { randomNum} from './modules/quotes.js';

window.addEventListener('DOMContentLoaded', () => {
    timeModule.showTime(state.language);
    bgModule.setBg();
    weatherModule.getWeather(city.value);
    quotesModule.getQuotes(randomNum());
    todoModule.translateTodo();
    settingsModule.translateSettings();
});




