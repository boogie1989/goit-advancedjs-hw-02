import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = new Date();
const btnStart = document.querySelector('button[data-start]');
const inputDate = document.querySelector('input#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > this.config.defaultDate) {
      btnStart.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      btnStart.disabled = true;
      iziToast.error({
        class: 'error-alert',
        title: 'Error',
        titleColor: 'white',
        iconUrl: '../img/error-icon.svg',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        position: 'topRight',
        progressBarColor: 'B51B1B',
      });
    }
  },
};

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

function updateTime(t) {
  const days = document.querySelector('span.value[data-days]');
  const hours = document.querySelector('span.value[data-hours]');
  const minutes = document.querySelector('span.value[data-minutes]');
  const seconds = document.querySelector('span.value[data-seconds]');

  days.textContent = t.days < 10 ? '0' + t.days : t.days;
  hours.textContent = t.hours < 10 ? '0' + t.hours : t.hours;
  minutes.textContent = t.minutes < 10 ? '0' + t.minutes : t.minutes;
  seconds.textContent = t.seconds < 10 ? '0' + t.seconds : t.seconds;
}

const fp = flatpickr(inputDate, options);

btnStart.addEventListener('click', event => {
  event.target.disabled = true;
  inputDate.disabled = true;
  fp.config.defaultDate = new Date();
  let remainTime = new Date(userSelectedDate - fp.config.defaultDate);

  const intervalId = setInterval(() => {
    remainTime.setSeconds(remainTime.getSeconds() - 1);
    updateTime(convertMs(remainTime.getTime()));
    if (remainTime.getTime() < 1000) clearInterval(intervalId);
  }, 1000);
});
