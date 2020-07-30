export const radioPlayerInit = () => {
  const radio = document.querySelector(".radio");
  const radioCoverImg = document.querySelector(".radio-cover__img");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioHeader = document.querySelector(".radio-header__big");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioStop = document.querySelector(".radio-stop");
  const radioVolume = document.querySelector(".radio-volume");
  const radioList = document.querySelector(".radio-list");
  const radioPreStation = document.querySelector(".radio-pre-station");
  const radioAfterStation = document.querySelector(".radio-after-station");
  //конструктор аудио
  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true;
  //делегирование, полчаем именно то радио которе нам нужно

  const changeIcon = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-stop");
      radioStop.classList.remove("fa-play");
    }
  };

  radioNavigation.addEventListener("change", (event) => {
    const target = event.target;
    //добрались до дата-ссылки в верстке

    //получим родителя объекта. Возвращает его closest. Если не находит - идет выше по html
    const parrent = target.closest(".radio-item");
    //удаляем обводку у всех радиостанций
    radioItem.forEach((item) => item.classList.remove("select"));
    //добавляем на выбранный
    parrent.classList.add("select");

    const title = parrent.querySelector(".radio-name").textContent;
    radioHeader.textContent = title;

    const UrlImg = parrent.querySelector(".radio-img").src;
    radioCoverImg.src = UrlImg;

    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIcon();
    radioStop.disabled = false;
  });

  radioStop.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIcon();
  });

  radioVolume.addEventListener("change", () => {
    const volume = radioVolume.value;
    audio.volume = volume;
  });
};
