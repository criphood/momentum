import { state } from './settings.js';

const quotes = document.querySelector('.quotes'),
    quote = quotes.querySelector('.quote'),
    author = quotes.querySelector('.author'),
    quoteChanger = quotes.querySelector('.change-quote');

let counter = 0;

const randomArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let randomNum = function() {
    return (Math.random() * 9).toFixed();
}

counter = randomNum();

function getQuotes(num) {
    fetch(`https://raw.githubusercontent.com/criphood/stage1-tasks/assets/quotes/quotes-${state.language}.json`)
        .then(res => res.json())
        .then(data => {
            quote.textContent = data[num].text;
            author.textContent = data[num].author;
        })
}

quoteChanger.addEventListener('click', () => {
    counter++;
    if (counter == 10) counter = 0;
    getQuotes(counter);
});

export { getQuotes, quotes, randomNum, counter }