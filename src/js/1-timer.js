
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const sectionBox = document.querySelector('section');
const boxSection = sectionBox.classList.add('container');

const btnInput = document.querySelector('button');
const btnInputStyle = btnInput.classList.add('btn-input');

const input = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        icon: 'my-error-icon',
        titleColor: 'rgba(255, 255, 255, 1)',
        titleSize: '16px',
        messageColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        position: "topRight",
        timeout: 5000
      });
      startBtn.classList.remove('active');
      startBtn.disabled = true; 
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
      startBtn.classList.add('active');
    }
  },
};

flatpickr(input, options);


startBtn.addEventListener('click', () => {
  const countdown = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;
      if (timeLeft <= 0) {
      clearInterval(countdown);
      startBtn.disabled = true;
      input.disabled = false;
      return;
    }

    const time = convertMs(timeLeft);
    document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
  }, 1000);
  startBtn.disabled = true;
  input.disabled = true;
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

