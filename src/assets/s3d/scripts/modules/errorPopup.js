import { errorPopupTemplate, errorPopupTemplateTranslate } from './templates/errorPopup';

const countdown = (wrap, cb, time) => {
  let timeLeftS = time;
  let intervalId = null;
  wrap.innerHTML = timeLeftS;
  intervalId = setInterval(() => {
    if (timeLeftS <= 0) {
      clearInterval(intervalId);
      cb();
      return;
    }
    timeLeftS -= 1;
    wrap.innerHTML = timeLeftS;
  }, 1000);
};

const popupWithTranslate = i18n => {
  const styles = 'position:fixed;top:0;left:0;height:100%;width:100%;z-index:99999;opacity:0;transition:opacity 0.4s easy-in-out;';
  const wrapper = document.createElement('div');
  wrapper.classList = 'js-errorPopup';
  wrapper.style = styles;

  const open = (content, cb, time = 15) => {
    wrapper.innerHTML = errorPopupTemplateTranslate(content, i18n);
    document.querySelector('body').insertAdjacentElement('beforeEnd', wrapper);
    wrapper.style.opacity = '1';
    const timeContainer = wrapper.querySelector('.js-errorPopup__time');

    countdown(timeContainer, cb, time);
  };

  const close = () => {};
  return { open, close };
};

const popupWithoutTranslate = i18n => {
  const styles = 'position:fixed;top:0;left:0;height:100%;width:100%;z-index:99999;opacity:0;transition:opacity 0.4s easy-in-out;';
  const wrapper = document.createElement('div');
  wrapper.classList = 'js-errorPopup';
  wrapper.style = styles;

  const open = (keyMessage, cb, time) => {
    wrapper.innerHTML = errorPopupTemplate(i18n.t(keyMessage), i18n);
    document.querySelector('body').insertAdjacentElement('beforeEnd', wrapper);
    wrapper.style.opacity = '1';
    setTimeout(() => {
      cb();
    }, time);
  };
  const close = () => {};
  return { open, close };
};

const mappingPopups = {
  withTranslate: popupWithTranslate,
  withoutTranslate: popupWithoutTranslate,
};

const ErrorPopup = i18n => {
  let typePopup = 'withTranslate';
  let currentPopup = mappingPopups[typePopup](i18n);
  function open(keyMessage, cb = () => {}, time = 15) {
    const elem = document.querySelector('.js-errorPopup');
    if (elem) {
      console.warn('errorPopup уже есть на странице');
      return;
    }
    currentPopup.open(i18n.t(keyMessage), cb, time);
  }

  function close(time = 400) {
    const elem = document.querySelector('.js-errorPopup');
    if (!elem) {
      return;
    }
    elem.style.opacity = '0';
    setTimeout(() => {
      elem.remove();
    }, time);
  }

  function setType(type) {
    if (!mappingPopups[type]) return;
    typePopup = type;
    currentPopup = mappingPopups[type](i18n);
  }

  return {
    open,
    close,
    setType,
  };
};

export default ErrorPopup;
