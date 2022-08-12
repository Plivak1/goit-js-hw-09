import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const buttonStartEl = document.querySelector('button[data-start]');
const timerEl = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let deltaTimeMs = 0;

buttonStartEl.toggleAttribute('disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.warning('Please choose a date in the future');
    } else {
      buttonStartEl.toggleAttribute('disabled');
      setInterval(() => {
        deltaTimeMs = selectedDates[0] - new Date();
      }, 1000);
    }
  },
};

flatpickr('input#datetime-picker', options);

buttonStartEl.addEventListener('click', startTimer);

function startTimer() {
  let { days, hours, minutes, seconds } = convertMs(deltaTimeMs);
  if (deltaTimeMs <= 0) {
    timerEl.days.textContent = '00';
    timerEl.hours.textContent = '00';
    timerEl.minutes.textContent = '00';
    timerEl.seconds.textContent = '00';
  } else {
    timerEl.days.textContent = days;
    timerEl.hours.textContent = hours;
    timerEl.minutes.textContent = minutes;
    timerEl.seconds.textContent = seconds;
  }

  return setTimeout(() => startTimer(), 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
