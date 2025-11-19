import $ from 'jquery';
import gsap from 'gsap/gsap-core';
import BezierEasing from 'bezier-easing';
import HelperNode from './templates/helper';
import { driver } from "driver.js";
import dispatchTrigger from './helpers/triggers';
import s3d2spriteIcon from '../../../s3d2/scripts/templates/spriteIcon';

class HelperGif {
  constructor(i18n, countSlides = 4, onFaq) {
    this.currentWindow = 0;
    this.countSlides = countSlides;
    this.onFaq = onFaq;
    this.i18n = i18n;
    this.easing = new BezierEasing(0, 1, 1, 0);
    this.animation = gsap.timeline({ duration: 0, ease: this.easing });
  }

  async init() {
    if (document.querySelector('.js-s3d__helper-gif-wrap')) return;
    document.querySelector('body').insertAdjacentHTML('beforeend', HelperNode());
    this.wrap = document.querySelector('.js-s3d__helper-gif-wrap');
    $('.js-s3d__helper-gif__close').on('click', () => {
      this.hiddenHelper();
    });
    $('.js-s3d__helper-gif__link').on('click', () => {
      this.currentWindow++;
      if (this.currentWindow >= this.countSlides) {
        this.hiddenHelper();
        return;
      }
      this.update(this.currentWindow);
    });

    const openHelper = $('.js-s3d-ctr__helper');
    if (_.size(openHelper) > 0) {
      openHelper.on('click', () => {
        this.currentWindow = 0;
        console.log('show me FAQ');
        this.newFaq();
        // this.update(this.currentWindow);
        // dispatchTrigger('faq-button-click', {
        //   url: window.location.href
        // })
        // setTimeout(() => {
        //   this.showHelper();
        // }, 300);
      });
    }
    if (window.localStorage.getItem('info')) return;
    this.updateContent(0, () => {
      // this.triggerGif(this.currentWindow);
    });
    this.wrap.querySelector('[data-all_count]').innerHTML = this.countSlides;
    setTimeout(() => {
      // this.showHelper();
    }, 300);
  }

  newFaq() {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'close'],
      progressText: '{{current}}/{{total}}',
      onCloseClick:() => {
        console.log('Close Button Clicked');
        // Implement your own functionality here
        driverObj.destroy();
      },
      onPopoverRender: ($popover, data) => {

        $popover.title.insertAdjacentElement('afterbegin', $popover.progress);
        $popover.closeButton.insertAdjacentHTML('beforeend', s3d2spriteIcon('close'));
        console.log('onPopoverRender', $popover, data);
      },
      steps: [
        { 
          element: '.SpinNav', 
          popover: { 
            title: this.i18n.t('tutorial.step_nav'), 
            description: this.i18n.t('tutorial.step_nav_description'), 
          },
          onHighlightStarted: () => {
            gsap.timeline({
              repeat: 3,
            })
              .to('.SpinNav button', { duration: 0.3, scale: 1.2, ease: 'Power1.easeIn' })
              .to('.SpinNav button', { duration: 0.3, scale: 1, ease: 'Power1.easeIn', clearProps: 'all'})
          },
        },
        { 
          element: document.documentElement.classList.contains('desktop') ?  '.FlybyController' : '.MobileFlybyController', 
          popover: { 
            title: this.i18n.t('tutorial.step_interact'), 
            description: this.i18n.t('tutorial.step_interact_description'), 
          } 
        },
        { 
          element: document.documentElement.classList.contains('desktop') ? '.ButtonIconLeft.js-s3d-ctr__filter' : '.MobileFlybyController .js-s3d-ctr__filter', 
          popover: { 
            title: this.i18n.t('tutorial.ster_filter'), 
            description: this.i18n.t('tutorial.ster_filter_description'), 
          } 
        },
        { 
          element: '.header__right .s3d__favourite-container.js-s3d__favourite-open', 
          popover: { 
            title: this.i18n.t('tutorial.step_compare'), 
            description: this.i18n.t('tutorial.step_compare_description'), 
          } 
        },
        // { element: '.js-s3d-ctr__theme', popover: { title: 'Day/Night', description: 'Watch our residential complex at different daytime',  }},
        // { element: '.s3d__svg__active polygon[data-type="infrastructure"]', popover: { title: 'Infrastructure', description: 'Watch infrastructure amenities near complex',  }},
      ]
    });
    driverObj.drive();
    dispatchTrigger('faq-open', {
      url: window.location.href
    });
  }

  update(numberSlide) {
    this.updateContent(numberSlide, () => {
      this.triggerGif(this.currentWindow, 'hide');
      this.triggerGif(this.currentWindow + 1);
    });
  }

  showHelper() {
    this.wrap.classList.add('s3d-active');
  }

  hiddenHelper() {
    this.wrap.classList.remove('s3d-active');
    window.localStorage.setItem('info', true);
    this.triggerGif(this.currentWindow, 'hide');
  }

  updateContent(numberSlide, cb) {
    const helper = document.querySelector('.js-s3d__helper-gif');
    helper.dataset.step = this.currentWindow;
    const titleContainer = this.wrap.querySelector('[data-type="title"]');
    const closeContainer = this.wrap.querySelector('[data-type="close"]');
    const groupContainer = this.wrap.querySelector('.s3d__helper-gif__group');
    const countCurrentContainer = this.wrap.querySelector('[data-current_count]');
    const countAllContainer = this.wrap.querySelector('[data-all_count]');
    this.animation
      .fromTo(titleContainer, { opacity: 1 }, { opacity: 0 })
      .fromTo(closeContainer, { opacity: 1 }, { opacity: 0 }, '<')
      .fromTo(groupContainer, { opacity: 1 }, { opacity: 0 }, '<')
      .then(() => {
        titleContainer.innerHTML = this.i18n.t(`Helper.slide-${numberSlide}--title`);
        closeContainer.innerHTML = this.i18n.t('Helper.close');
        countCurrentContainer.innerHTML = this.currentWindow + 1;
        countAllContainer.innerHTML = this.countSlides;
        cb();
        this.animation
          .fromTo(titleContainer, { opacity: 0 }, { opacity: 1 })
          .fromTo(closeContainer, { opacity: 0 }, { opacity: 1 }, '<')
          .fromTo(groupContainer, { opacity: 0 }, { opacity: 1 }, '<');
      }, '>');
  }

  triggerGif(num, type = 'show') {
    const numId = (num > 0) ? num : 1;
    const container = document.getElementById(`animated-svg-${numId}`);
    const easing = new BezierEasing(0, 1, 1, 0);
    const animate = gsap.timeline({ direction: 1.8, ease: easing });
    const prevAlpha = (type === 'hide') ? 1 : 0;
    const pastAlpha = (type === 'hide') ? 0 : 1;
    animate.fromTo(container, { autoAlpha: prevAlpha }, { autoAlpha: pastAlpha });
    setTimeout(() => {
      container.contentDocument
        .querySelector('svg')
        .dispatchEvent(new Event('click'));
    }, 1500);
  }
}

function findTopLeftBounds(pointsAttr) {
  const pointsArr = pointsAttr.split(' ');
  let leftmost = parseFloat(pointsArr[0].split(',')[0]);
  let topmost = parseFloat(pointsArr[0].split(',')[1]);

  for (let i = 1; i < pointsArr.length; i++) {
    const point = pointsArr[i].split(',');
    const x = parseFloat(point[0]);
    const y = parseFloat(point[1]);

    if (x < leftmost) {
      leftmost = x;
    }

    if (y < topmost) {
      topmost = y;
    }
  }

  return {
    top: topmost,
    leftmost:leftmost,
  };
}


export default HelperGif;
