const main = document.createElement("main");
const container = document.createElement("div");
const nav = document.createElement("nav");
const photoField = document.createElement("div");
const autoButton = document.createElement("button");
let photoHolder = [];
let slideNumber = 0;
let slideTimeout;
let numberOfImages;
const arrowBack = document.createElement("span");
const arrowForward = document.createElement("span");

const addBasicLayout = () => {
  container.classList.add("container");
  main.appendChild(container);
  main.appendChild(nav);
  autoButton.innerText = "Auto";
  document.body.appendChild(autoButton);
  document.body.appendChild(main);
  arrowBack.innerText = "arrow_back";
  arrowBack.classList.add("material-symbols-outlined");
  arrowBack.style = "font-size:60px;text-align:right;";
  container.appendChild(arrowBack);

  container.appendChild(photoField);
  addPhotoToArray();
  slideNumber = Math.floor(Math.random() * photoHolder.length);
  photoField.innerHTML = photoHolder[slideNumber];
  arrowForward.classList.add("material-symbols-outlined");
  arrowForward.innerText = "arrow_forward";
  arrowForward.style = "font-size:60px";
  container.appendChild(arrowForward);
};
const addPhotoToArray = (i) => {
  for (i = 1; i < 10; i++) {
    let photo;
    photo = `<img class="${i}" src="img/img${i}.jpg" />`;
    photoHolder.push(photo);
  }
  numberOfImages = photoHolder.length - 1;
};
const addDivsToNav = () => {
  for (i = 0; i < 6; i++) {
    nav.appendChild(document.createElement("div"));
  }
  updateNav(slideNumber);
};
const updateNav = () => {
  const photoWindows = document.querySelectorAll("nav div");

  if (slideNumber > 3) {
    photoWindows[0].innerHTML = `<img class="${4}" src="img/img${4}.jpg" />`;
    photoWindows[1].innerHTML = `<img class="${5}" src="img/img${5}.jpg" />`;
    photoWindows[2].innerHTML = `<img class="${6}" src="img/img${6}.jpg" />`;
    photoWindows[3].innerHTML = `<img class="${7}" src="img/img${7}.jpg" />`;
    photoWindows[4].innerHTML = `<img class="${8}" src="img/img${8}.jpg" />`;
    photoWindows[5].innerHTML = `<img class="${9}" src="img/img${9}.jpg" />`;
  } else if (slideNumber <= 3) {
    photoWindows[0].innerHTML = `<img class="${1}" src="img/img${1}.jpg" />`;
    photoWindows[1].innerHTML = `<img class="${2}" src="img/img${2}.jpg" />`;
    photoWindows[2].innerHTML = `<img class="${3}" src="img/img${3}.jpg" />`;
    photoWindows[3].innerHTML = `<img class="${4}" src="img/img${4}.jpg" />`;
    photoWindows[4].innerHTML = `<img class="${5}" src="img/img${5}.jpg" />`;
    photoWindows[5].innerHTML = `<img class="${6}" src="img/img${6}.jpg" />`;
  }
  photoWindows.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target;
      for (i = 0; i < 10; i++) {
        if (index.classList.contains(`${i}`)) {
          slideNumber = i;
          photoField.innerHTML = photoHolder[slideNumber - 1];
        }
      }
    });
  });
};
const autoSlider = () => {
  if (slideNumber >= numberOfImages + 1) {
    slideNumber = 0;
    photoField.innerHTML = photoHolder[0];
    updateNav();
  } else {
    slideNumber = slideNumber + 1;
    photoField.innerHTML = photoHolder[slideNumber - 1];
    updateNav();
  }

  slideTimeout = setTimeout(autoSlider, 2000);
};
const changeOpacity = () => {};
addBasicLayout();
addDivsToNav();
container.firstChild.addEventListener("click", () => {
  if (slideNumber <= 0) {
    photoField.innerHTML = photoHolder[numberOfImages];
    slideNumber = numberOfImages;
  } else if (slideNumber >= 0) {
    photoField.innerHTML = photoHolder[slideNumber - 1];
    slideNumber = slideNumber - 1;
  }

  updateNav(slideNumber);
});
container.lastChild.addEventListener("click", () => {
  if (slideNumber >= numberOfImages) {
    photoField.innerHTML = photoHolder[0];
    slideNumber = 0;
  } else if (slideNumber <= numberOfImages) {
    photoField.innerHTML = photoHolder[slideNumber + 1];
    slideNumber = slideNumber + 1;
  }

  updateNav(slideNumber);
});
autoButton.addEventListener("click", () => {
  if (autoButton.innerText == "OFF Auto") {
    autoButton.innerHTML = "Auto";
    clearTimeout(slideTimeout);
  } else if (autoButton.innerText == "Auto") {
    autoButton.innerHTML = "OFF Auto";
    autoSlider();
  }
});
