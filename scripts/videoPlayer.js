export const videoPlayerInit = () => {
    'use strict';
    const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoTimeTotal = document.querySelector('.video-time__total');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    // условие ? (условие верно) : (условие ложь) 
    const addZero = n => n < 10 ? '0' + n : n;

    videoPlayer.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;
            
        let minutePassed = Math.floor(currentTime / 60),
            secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60),
            secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    videoButtonPlay.addEventListener('click', togglePlay);
    videoButtonStop.addEventListener('click', stopPlay);

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration,
            value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });
}