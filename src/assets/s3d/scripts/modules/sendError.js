import axios from 'axios';
import { Power1, TimelineMax } from 'gsap';

axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

const successMessagePopup = message => {
  return `<div class="send-error-popup__wrap">
<div class="send-error-popup bg--success js-popup-send-error">
    <span class="send-error-popup__message">${message}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="send-error-popup__icon" viewBox="0 0 16 16">
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
    </svg>
</div>
</div>`;
};

const errorMessagePopup = message => {
  return `<div class="send-error-popup__wrap">
<div class="send-error-popup bg--error js-popup-send-error">
    <span class="send-error-popup__message">${message}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="send-error-popup__icon" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
</div>
</div>`;
};

const getMessage = typeError => {
  if (typeError === 'success') {
    return 'Send-error-popup.success';
  }
  return 'Send-error-popup.failed';
};

const mappingRenderError = {
  success: successMessagePopup,
  error: errorMessagePopup,
};

const renderMessages = (i18n, { type, wrapper = 'body' }) => {
  const messageText = i18n.t(getMessage(type), '');
  if (!messageText) return;
  const form = mappingRenderError[type] && mappingRenderError[type](messageText);
  if (!form) return;
  const timeline = new TimelineMax();
  document.querySelector(wrapper).insertAdjacentHTML('beforeend', form);
  const container = document.querySelector('.js-popup-send-error');

  timeline.to(container, {
    y: 0,
    duration: 0.4,
    ease: Power1.easeOut,
  });
};

const sendError = (i18n, hostname, keyMessage, type = '', err) => {
  const description = i18n.t(keyMessage, '');

  const fd = new FormData();
  fd.append('action', 'errorsLog');
  fd.append('hostname', hostname);
  fd.append('description', description);
  fd.append('type', type);
  fd.append('data', JSON.stringify(err.data));


  axios.post('/wp-admin/admin-ajax.php', fd).then(res => {
    if (res.data.code === 200) {
      const props = {
        type: 'success',
        wrapper: '.errorPopup',
      };
      setTimeout(() => {
        renderMessages(i18n, props);
      }, 500);
      return;
    }
    throw new Error();
  }).catch(err => {
    const props = {
      type: 'error',
      wrapper: '.errorPopup',
    };
    setTimeout(() => {
      renderMessages(i18n, props);
    }, 500);
  });
};

export default sendError;
