import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const labelDelay = document.querySelector('label');
const classLabelDelay = labelDelay.classList.add('label-delay');
const inputDelay = document.querySelector('input');
const classInputDelay = inputDelay.classList.add('input-delay')
const fieldsetLabel = document.querySelector('fieldset');
const classFieldset = fieldsetLabel.classList.add('fieldset-label');
const btnForm = document.querySelector('button');
const classBtnForm = btnForm.classList.add('btn-form');
const form = document.querySelector('form');



form.addEventListener('submit', (event) => {
  event.preventDefault();
  const delay = parseInt(form.delay.value); 
  const state = form.state.value; 
  
  const createPromise = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };



  createPromise(delay)
    .then((delay) => {
        iziToast.success({
        backgroundColor: 'rgba(89, 161, 13, 1)',
          icon: 'my-custom-icon',
          iconColor: 'rgba(255, 255, 255, 1)',
          title: 'OK',
          titleColor: 'rgba(255, 255, 255, 1)',
          titleSize: '16px',
          message: `Fulfilled promise in ${delay}ms`,
          messageColor: 'rgba(255, 255, 255, 1)',
          messageSize: '16px',
          position: "topRight",
          timeout: 5000
        
        });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        icon: 'my-error-icon',
        titleColor: 'rgba(255, 255, 255, 1)',
        titleSize: '16px',
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        position: "topRight",
        timeout: 5000
      });
    });
});



