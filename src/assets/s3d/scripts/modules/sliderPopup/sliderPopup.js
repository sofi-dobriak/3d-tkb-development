import { Timeline } from 'gsap/gsap-core';
import Swiper, { EffectFade, Navigation } from 'swiper';
import EventEmitter from '../eventEmitter/EventEmitter';

export default class SliderPopup extends EventEmitter {
  constructor(config = []) {
    super();
    this.config = Object.entries(config).map(el => {
        return {
            title: el[0].replace(/\.(.+)/g, ''),
            src: el[1]
        }
    });
    this.slides = Object.entries(config).map(link => (
        `
            <div class="swiper-slide">
                <img src="${link[1]}">
            </div>
        `
    )).join('');
    this.containerClassName = 'slider-popup';
  }

  render() {
    const layout = `
      <div class="${this.containerClassName}">
        <div class="${this.containerClassName}__content">
            <div class="${this.containerClassName}__title">
                gvsrhrhreh
            </div>
            <div class="${this.containerClassName}__navigation">
                <button class="s3d__button s3d__button-left unselectable" data-${this.containerClassName}-prev>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.90658 12.5062L12.7036 17.3055L11.9963 18.0124L6.34625 12.3597L5.99294 12.0062L6.34625 11.6527L11.9963 6L12.7036 6.70694L7.90658 11.5062H18V12.5062H7.90658Z" fill="white"></path>
                    </svg>
                </button>
                <button class="s3d__button s3d__button-left unselectable" data-${this.containerClassName}-next>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0864 12.5005L11.2932 17.2938L12.0003 18.0009L17.647 12.354L18.0005 12.0005L17.647 11.6469L12.0003 6L11.2932 6.70709L16.0864 11.5005H6V12.5005H16.0864Z" fill="white"></path>
                    </svg>
                </button>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    ${this.slides}
                </div>
            </div>
        </div>
        <svg class="${this.containerClassName}__close" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70704 0.998623L7.4056 6.69614L6.69856 7.40331L1 1.70579L1.70704 0.998623ZM15.0037 1.70579L9.30512 7.40331L8.59808 6.69614L14.2966 0.998623L15.0037 1.70579ZM7.4056 9.30248L1.70704 15L1 14.2928L6.69856 8.59531L7.4056 9.30248ZM9.30512 8.59531L15.0037 14.2928L14.2966 15L8.59808 9.30248L9.30512 8.59531Z" fill="white"/>
        </svg>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', layout);

    this.swiper = new Swiper(`.${this.containerClassName} .swiper-container`, {
        modules: [Navigation, EffectFade ],
        navigation: {
            nextEl: `[data-${this.containerClassName}-next]`,
            prevEl: `[data-${this.containerClassName}-prev]`,
        },
        on: {
            activeIndexChange: ({  realIndex }, i) => {
                const title = document.querySelector(`.${this.containerClassName}__title`);
                gsap.timeline()
                    .fromTo(title, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' })
                    .add(() => title.textContent = this.config[realIndex].title)
                    .fromTo(title, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
                
            }
        }
    });

    document.querySelector(`.${this.containerClassName}__title`).textContent = this.config[0].title;

    document.querySelector(`.${this.containerClassName} .${this.containerClassName}__close`)
      .addEventListener('click', () => {
        document.querySelector(`.${this.containerClassName}`).remove();
        this.swiper.destroy();
      });
  }
}