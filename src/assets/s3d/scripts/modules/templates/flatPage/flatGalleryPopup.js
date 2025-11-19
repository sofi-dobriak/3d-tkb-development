import EventEmitter from '../../eventEmitter/EventEmitter';
import Swiper, { Navigation } from 'swiper';


export default class FlatGalleryPopup extends EventEmitter {
  constructor(href) {
    super();
    this.href = href.split('~');
    this.containerClassName = 'flat-gallery-popup';
  }

  render() {
    const layout = `
      <div class="${this.containerClassName}">
        <div class="${this.containerClassName}__content">
            <div class="${this.containerClassName}__buttons">
                <button class="${this.containerClassName}__button ${this.containerClassName}__button-left unselectable" data-type="prev"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.355 19H1.99964M1.99964 19L19.6773 1.32233M1.99964 19L19.6773 36.6777" stroke-width="2.5"></path></svg></button>
                <button class="${this.containerClassName}__button ${this.containerClassName}__button-right unselectable" data-type="next"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.355 19H1.99964M1.99964 19L19.6773 1.32233M1.99964 19L19.6773 36.6777" stroke-width="2.5"></path></svg></button>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    ${this.href.map(src => (
                        `<img class="swiper-slide" src="${src}"></img>`
                    )).join('')}
                </div>
            </div>

        </div>
        <svg class="${this.containerClassName}__close" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30"/>
          <path d="M37.826 37.826L22.1738 22.1738M22.1738 37.826L37.826 22.1738L22.1738 37.826Z"/>
        </svg>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', layout);
    document.querySelector(`.${this.containerClassName} .${this.containerClassName}__close`)
    .addEventListener('click', () => {
        this.swiper.destroy(true);
        document.querySelector(`.${this.containerClassName}`).remove();
    }, { once: true });
    this.swiper = new Swiper(`.${this.containerClassName} .swiper-container`, {
        modules: [ Navigation],
        loop: true,
        navigation: {
          nextEl: document.querySelector(`.${this.containerClassName} [data-type="next"]`),
          prevEl: document.querySelector(`.${this.containerClassName} [data-type="prev"]`),
      },
      });
  }
}
