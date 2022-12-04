const playList = [
    {
        title: 'Aqua Caelestis',
        src: './assets/sounds/Aqua Caelestis.mp3',
        duration: '0:39'
    },
    {
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio Morricone.mp3',
        duration: '1:37'
    },
    {
        title: 'River Flows In You',
        src: './assets/sounds/River Flows In You.mp3',
        duration: '1:37'
    },
    {
        title: 'Summer Wind',
        src: './assets/sounds/Summer Wind.mp3',
        duration: '1:50'
    }
]

const bg = document.querySelector('.bg'),
    player = document.querySelector('.player'),
    play = player.querySelector('.play'),
    playPrev = player.querySelector('.play-prev'),
    playNext = player.querySelector('.play-next'),
    playListContainer = player.querySelector('.play-list'),
    buttonMute = player.querySelector('.mute'),
    songName = player.querySelector('.song-name'),
    progressBar = player.querySelector('#progress-bar'),
    volumeBar = player.querySelector('#volume-bar'),
    currentTime = player.querySelector('.current-time'),
    durationTime = player.querySelector('.duration-time'),
    audio = new Audio(playList[0].src);

let isPlay = false,
    playNum = 0;

playList.forEach(item => {
    const li = document.createElement('li');

    li.innerHTML = `
        <span class="play-small"></span>
        <span>${item.title}</span>
    `;
    li.classList.add('play-item');

    playListContainer.append(li);
});

playListContainer.childNodes.forEach((item, i) => {
    item.addEventListener('click', () => {
        durationTime.innerHTML = '0:00';
        updateProgressValue();
        playNum = i;

        if (item.childNodes[1].classList.contains('active')) {
            playAudio();
        } else {
            isPlay = false;
            playAudio();
            audio.currentTime = 0;
        }

        switchBtnsAndTitle();
    });
})

changeMuteIcon();
applySongName();

let interval = setInterval(updateProgressValue, 500);

audio.onended = function () {
    (playNum < 3) ? playNum++ : playNum = 0;
    audio.src = playList[playNum].src;
    audio.play();
    switchBtnsAndTitle();
}

play.addEventListener('click', () => {
    playAudio();
    switchBtnsAndTitle();
});

playNext.addEventListener('click', () => {
    durationTime.innerHTML = '0:00';
    updateProgressValue();
    (playNum < 3) ? playNum++ : playNum = 0;
    isPlay = false;
    playAudio();
    switchBtnsAndTitle();
    audio.currentTime = 0;
});

playPrev.addEventListener('click', () => {
    durationTime.innerHTML = '0:00';
    updateProgressValue();
    (playNum > 0) ? playNum-- : playNum = 3;
    isPlay = false;
    playAudio();
    switchBtnsAndTitle();
    audio.currentTime = 0;
});

progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value;
    changeInputBackground(progressBar);
    interval = setInterval(updateProgressValue, 500);
})

progressBar.addEventListener('input', () => {
    currentTime.textContent = (formatTime(Math.floor(progressBar.value)))
    changeInputBackground(progressBar);
    clearInterval(interval);
})

buttonMute.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        volumeBar.value = audio.volume * 100;
    } else {
        audio.muted = true;
        volumeBar.value = 0;
    }
    changeInputBackground(volumeBar);
    changeMuteIcon();
});

volumeBar.addEventListener('input', () => {
    changeVolumeLevel();
    changeInputBackground(volumeBar);
    changeMuteIcon();
})

volumeBar.addEventListener('change', () => {
    changeVolumeLevel();
    changeInputBackground(volumeBar);
    changeMuteIcon();
})

function changeInputBackground(e) {
    const min = e.min,
        max = e.max,
        val = e.value;
    e.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = progressBar.value;
    if (!isPlay) {
        audio.play();
        isPlay = true;
        bg.style.filter = 'blur(5px)';
    } else {
        audio.pause();
        isPlay = false;
        bg.style.filter = 'blur(0)';
    }
}

function switchBtnsAndTitle() {
    const allSongs = playListContainer.childNodes,
        songIcon = allSongs[playNum].childNodes[1];

    allSongs.forEach(item => {
        item.childNodes[1].classList.remove('active');
        item.childNodes[1].classList.remove('pause-small');
    });

    songIcon.classList.add('active');

    if (isPlay) {
        play.classList.add('pause');
        songIcon.classList.add('pause-small');
    } else {
        play.classList.remove('pause');
        songIcon.classList.remove('pause-small');
    }

    applySongName();
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    currentTime.textContent = (formatTime(Math.floor(audio.currentTime)));
    if (formatTime(Math.floor(audio.duration)) == 'NaN:NaN') {
        durationTime.innerHTML = '0:00';
    } else {
        durationTime.innerHTML = (formatTime(Math.floor(audio.duration)));
    }

    changeInputBackground(progressBar);
}

function applySongName() {
    songName.textContent = playList[playNum].title;
}

function changeVolumeLevel() {
    audio.muted = false;
    audio.volume = volumeBar.value / 100;
}

function changeMuteIcon() {
    if (volumeBar.value == 0) {
        buttonMute.style.backgroundImage = 'url("./assets/svg/volume-mute.svg")';
    } else {
        buttonMute.style.backgroundImage = 'url("./assets/svg/volume-level.svg")';
    }
}

export { player }




