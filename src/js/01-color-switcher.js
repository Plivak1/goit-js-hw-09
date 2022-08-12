const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);
refs.stop.disabled = true;
let intervalId = null;

function onStartClick() {
  // console.log('start');
  refs.start.disabled = true;
  refs.stop.disabled = false;

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  // console.log('stop');
  refs.start.disabled = false;
  refs.stop.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
