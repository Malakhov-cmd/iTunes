import { radioPlayerInit } from "./radioPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";

//кнопки с главной страницы
const playerBtn = document.querySelectorAll(".player-btn");
const playerBlock = document.querySelectorAll(".player-block");
const temp = document.querySelector(".temp");

const deactivationPlayer = () => {
  playerBtn.forEach((item) => {
    item.classList.remove("active");
  });
  playerBlock.forEach((item) => {
    item.classList.remove("active");
  });
  temp.style.display = "none";
};

playerBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    deactivationPlayer();
    btn.classList.add("acrive");
    playerBlock[i].classList.add("active");
  });
});

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
