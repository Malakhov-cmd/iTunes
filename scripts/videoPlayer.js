export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoProgress = document.querySelector(".video-progress");
  const videoTimePassed = document.querySelector(".video-time__passed");
  const videoTimeTotal = document.querySelector(".video-time__total");
  const videoResolution = document.querySelector(".video-button__resolution");

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add("fa-play");
      videoButtonPlay.classList.remove("fa-pause");
    } else {
      videoButtonPlay.classList.add("fa-pause");
      videoButtonPlay.classList.remove("fa-play");
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

  const addZero = (n) => {
    return n < 10 ? "0" + n : n;
  };

  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);
  //Другой способ
  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);

  videoButtonStop.addEventListener("click", stopPlay);

  videoPlayer.addEventListener("timeupdate", () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    //отображение trackbar
    videoProgress.value = (currentTime / duration) * 100;

    //округляем до минуты
    let minutePassed = Math.floor(currentTime / 60);
    //получаем секунды
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    //запишем на плеере
    videoTimePassed.textContent =
      addZero(minutePassed) + ":" + addZero(secondsPassed);
    videoTimeTotal.textContent =
      addZero(minuteTotal) + ":" + addZero(secondsTotal);
  });

  //перетаскиваем trackBar
  videoProgress.addEventListener("change", () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoResolution.addEventListener("click", () => {
    if (videoPlayer.fullscreenElement) {
      videoPlayer.exitFullscreen();
    } else {
      videoPlayer.requestFullscreen();
    }
  });
};
