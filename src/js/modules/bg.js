import { getTimeOfDay } from './time.js';
import { state, setState } from './settings.js';

const body = document.querySelector('body'),
    bg = document.querySelector('.bg'),
    slidePrev = body.querySelector('.slide-prev'),
    slideNext = body.querySelector('.slide-next'),
    tagInput = document.querySelector('.tag');

let randomNum;

getRandomNum();

addListener(slidePrev, getSlidePrev);
addListener(slideNext, getSlideNext);

tagInput.addEventListener('change', function () {
    setBg();
})

function getRandomNum() {
    randomNum = (Math.random() * (20 - 1) + 1).toFixed(0);
}

function setBg() {
    const img = new Image(),
        tag = setBgByTag(),
        bgNum = randomNum.toString().padStart(2, '0');

    if (state.photoSource == 'flickr') {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e5e47cedc1ced9d3e4f89d0918a7288&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                img.src = data.photos.photo[+bgNum].url_l;
            });
    }

    if (state.photoSource == 'unsplash') {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=JD42SN_6Xh9JFAkZ8FhBZ3aBQGuknX-ruWM7j-VhTeg`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                img.src = data.urls.regular;
            });
    }

    if (state.photoSource == 'github') {
        img.src = `https://raw.githubusercontent.com/criphood/stage1-tasks/assets/images/${tag}/${bgNum}.webp`;
    }

    removeListener(slideNext, getSlideNext);
    removeListener(slidePrev, getSlidePrev);

    img.onload = () => {
        bg.style.height = window.getComputedStyle(body).height;
        bg.style.backgroundImage = `url(${img.src})`;
        setTimeout(() => {
            addListener(slideNext, getSlideNext);
            addListener(slidePrev, getSlidePrev);
        }, 1000);
    };
    showTagInput();
    setState();
}

function setBgByTag() {
    if (!tagInput.value) {
        tagInput.value = getTimeOfDay(state.language);
        return getTimeOfDay(state.language);
    } else {
        return tagInput.value;
    }
}

function showTagInput() {
    if (state.photoSource === 'github') {
        tagInput.value = '';
        tagInput.classList.remove('active');
        tagInput.classList.add('transparent');
        tagInput.setAttribute('readonly', true);
    } else {
        tagInput.classList.remove('transparent');
        tagInput.classList.add('active');
        tagInput.removeAttribute('readonly');
        tagInput.focus();
        tagInput.selectionStart = tagInput.value.length;
    }
}

function getSlidePrev() {
    if (+randomNum >= 1) randomNum--;
    if (+randomNum < 1) randomNum = 20;
    setBg();
}

function getSlideNext() {
    if (+randomNum <= 20) randomNum++;
    if (+randomNum > 20) randomNum = 1;
    setBg();
}

function addListener(button, func) {
    button.addEventListener('click', func);
}

function removeListener(button, func) {
    button.removeEventListener('click', func);
}

export { setBg, tagInput }

