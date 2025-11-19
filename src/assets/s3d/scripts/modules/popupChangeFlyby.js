import popupFlyby from './templates/popupFlyby';

class PopupChangeFlyby {
  constructor(data, i18n) {
    this.state = {};
    this.i18n = i18n;
    this.updateFsm = data.updateFsm;
    this.getFlat = data.getFlat;

    this.init();

    this.updateState = this.updateState.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  init() {
    document.querySelector('.js-s3d__slideModule').insertAdjacentHTML('beforeend', popupFlyby(this.i18n));
    this.popup = document.querySelector('.js-s3d-popup-flyby');
    this.popup.addEventListener('click', event => {
      if (!event.target.closest('[data-type="close"]')) return;
      this.closePopup();
    });
    this.popup.addEventListener('click', event => {
      if (!event.target.closest('[data-type="next"]')) return;
      this.activateTranslate();
    });
  }

  updateState(config) {
    this.state = config;
  }

  updateContent(element) {
    const filter = document.querySelector('.js-s3d-filter');
    const cor = element.getBoundingClientRect();

    const height = element.offsetHeight;
    const top = cor.y + (height / 2);
    document.querySelector('.js-s3d-popup-flyby__bg-active').setAttribute('style', `
      transform: translate(0, ${top}px);
      width: ${filter.offsetWidth}px`);

    if (window.innerWidth <= 680) {
      const style = (top > window.innerHeight / 2)
        ? `top: ${cor.top - 20}px; transform: translate(-50%, -100%);`
        : `top: ${cor.bottom + 20}px; transform: translate(-50%, 0);`;
      document.querySelector('.s3d-popup-flyby').setAttribute('style', `
      ${style}
      width: ${filter.offsetWidth}px`);
    }

    this.flatId = _.toNumber(element.dataset.id);
    const flat = this.getFlat(this.flatId);
    this.popup.querySelector('[data-type="title"]').innerHTML = flat.type;
  }

  openPopup(setting) {
    this.updateState(setting);
    if (!this.popup.classList.contains('s3d-active')) {
      this.popup.classList.add('s3d-active');
    }
  }

  closePopup() {
    this.popup.classList.remove('s3d-active');
  }

  activateTranslate() {
    this.closePopup();
    this.updateFsm({ ...this.state, id: this.flatId }, true, { ...this.state, flatId: this.flatId});
  }
}

export default PopupChangeFlyby;
