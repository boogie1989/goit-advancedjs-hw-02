import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('form');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  if (!formElem.elements.delay.value || !formElem.elements.state.value) {
    iziToast.warning({
      class: 'warning-alert',
      title: 'Caution',
      titleColor: 'white',
      message: 'You forgot important data',
      messageColor: 'white',
      position: 'topRight',
    });
  }
});

const showPromise = (state, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

formElem.addEventListener('submit', event => {
  event.preventDefault();
  const { delay, state } = formElem.elements;
  showPromise(state.value, delay.value)
    .then(delay => {
      iziToast.success({
        class: 'success-alert',
        title: 'OK',
        titleColor: 'white',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        class: 'error-alert',
        title: 'Error',
        titleColor: 'white',
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'white',
        position: 'topRight',
      });
    });
  formElem.reset();
});
