import { addZero } from "./supScripts.js";

export const musicPlayerInit = () => {
  const audio = document.querySelector(".audio");
  const audioImg = document.querySelector(".audio-img");
  const audioHeader = document.querySelector(".audio-header");
  const audioPlayer = document.querySelector(".audio-player");
  const audioNavigation = document.querySelector(".audio-navigation");
  const audioButton__play = document.querySelector(".audio-button__play");
  const audioTimePassed = document.querySelector(".audio-time__passed");
  const audioProgress = document.querySelector(".audio-progress");
  const audioProgressTiming = document.querySelector(".audio-progress__timing");
  const audioTimeTotal = document.querySelector(".audio-time__total");

  const playlist = ["hello", "flow", "speed"];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];

    audioPlayer.src = `./audio/${track}.mp3`;
    audioHeader.textContent = track.toUpperCase();
    audioImg.src = `./audio/${track}.jpg`;

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    if (!audio.classList.contains("active")) {
      audioPlayer.paused();
    }
  };

  const prevTrack = () => {
    if (trackIndex != 0) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  audioNavigation.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("audio-button__play")) {
      audio.classList.toggle("play");
      audioButton__play.classList.toggle("fa-play");
      audioButton__play.classList.toggle("fa-pause");

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      if (!audio.classList.contains("active")) {
        audioPlayer.paused();
      }

      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
      audioImg.src = `./audio/${track}.jpg`;
    }

    if (target.classList.contains("audio-button__prev")) {
      prevTrack();
    }
    if (target.classList.contains("audio-button__next")) {
      nextTrack();
    }
  });

  audioPlayer.addEventListener("ended", () => {
    nextTrack();
    audioPlayer.play();
    if (!audio.classList.contains("active")) {
      audioPlayer.paused();
    }
  });

  audioPlayer.addEventListener("timeupdate", () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + "%";

    const minutesPassed = Math.floor(currentTime / 60) || "0";
    const secondsPassed = Math.floor(currentTime % 60) || "0";

    const minutesTotal = Math.floor(duration / 60) || "0";
    const secondsTotal = Math.floor(duration % 60) || "0";

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(
      secondsPassed
    )}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  audioProgress.addEventListener("click", (event) => {
    //координата клика
    const x = event.offsetX;
    //длина audioProgress
    const allWidth = audioProgress.clientWidth;

    const progress = (x / allWidth) * audioPlayer.duration;

    audioPlayer.currentTime = progress;
  });
};
