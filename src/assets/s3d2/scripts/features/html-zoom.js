import WZoom from 'vanilla-js-wheel-zoom';
import { throttle } from 'lodash';

export const htmlZoom = (wrapper, scrollSelector, params = {}, maxScale = 2.5) => {
  const checkNavigationVisibility = throttle(checkNavigationVisibilityBody, 300);
  const elementToZoom = wrapper.querySelector(scrollSelector);
  const step = 30;
  const max_scale = maxScale;
  const instance = WZoom.create(elementToZoom, {
    disableWheelZoom: true,
    type: 'html',
    minScale: 1,
    maxScale: max_scale,
    zoomOnClick: false,
    width: window.innerWidth,
    height: window.innerHeight,
    smoothTime: 0,
    dragScrollableOptions: {
      //onDrop: checkNavigationVisibility,
    },
    ...params,
  });

  // elementToZoom.style.willChange = 'transform'; s
  // zoomTutorial();
  //wrapper.addEventListener('wheel',function(evt){
  //  checkNavigationVisibility(evt, instance);
  //});
  wrapper.addEventListener('click', function(evt) {
    const target = evt.target.closest('[data-zoom]');
    if (!target) return;
    const state = instance.content;
    const elementBBox = elementToZoom.getBoundingClientRect();
    switch (target.dataset.zoom) {
      case 'up':
        document.documentElement.classList.contains('mobile')
          ? instance.maxZoomUp()
          : instance.zoomUp();
        break;
      case 'down':
        document.documentElement.classList.contains('mobile')
          ? instance.maxZoomDown()
          : instance.zoomDown();
        break;
      case 'left':
        if (state.currentScale === 1) return;
        if (elementBBox.left >= 0) return;
        instance.transform(state.currentTop, state.currentLeft + step, state.currentScale);
        break;
      case 'right':
        if (state.currentScale === 1) return;
        if (elementBBox.right <= window.innerWidth) return;
        instance.transform(state.currentTop, state.currentLeft - step, state.currentScale);
        break;
      case 'upward':
        if (state.currentScale === 1) return;
        if (elementBBox.top >= 0) return;
        instance.transform(state.currentTop + step, state.currentLeft, state.currentScale);
        break;
      case 'downward':
        if (state.currentScale === 1) return;
        if (elementBBox.bottom <= window.innerHeight) return;
        instance.transform(state.currentTop - step, state.currentLeft, state.currentScale);
        break;

      default:
        break;
    }
  });

  function checkNavigationVisibilityBody(event, instance) {
    const state = instance.content;
    const elementBBox = elementToZoom.getBoundingClientRect();
    wrapper[0].querySelector('[data-zoom="down"]').style.opacity =
      state.currentScale === 1 ? 0.5 : 1;
    wrapper[0].querySelector('[data-zoom="up"]').style.opacity =
      state.currentScale >= max_scale ? 0.5 : 1;
    wrapper[0].querySelector('[data-zoom="left"]').style.opacity = elementBBox.left >= 0 ? 0.5 : 1;
    wrapper[0].querySelector('[data-zoom="right"]').style.opacity =
      elementBBox.right <= window.innerWidth * 1.05 ? 0.5 : 1;
    wrapper[0].querySelector('[data-zoom="upward"]').style.opacity =
      elementBBox.top >= -5 ? 0.5 : 1;
    wrapper[0].querySelector('[data-zoom="downward"]').style.opacity =
      elementBBox.bottom <= window.innerHeight * 1.05 ? 0.5 : 1;
  }

  // wrapper[0].insertAdjacentHTML('beforeend', `
  //   <div class="zoom-navigation" >
  //     ${plusIcon('data-zoom="up"')}
  //     ${minusIcon('data-zoom="down"')}
  //     ${leftIcon('data-zoom="left"')}
  //     ${rightIcon('data-zoom="right"')}
  //     ${upIcon('data-zoom="upward"')}
  //     ${downIcon('data-zoom="downward"')}
  //     ${infoIcon('data-zoom-tutorial')}
  //   </div>
  // `);

  function zoomTutorial() {
    wrapper[0].insertAdjacentHTML(
      'beforeend',
      `
      <div class="s3d-flyby-zoom-tutorial" data-zoom-tutorial-container>
        ${closeIcon('class="s3d-flyby-zoom-tutorial__close" data-zoom-tutorial-container-close')}
        <div class="s3d-flyby-zoom-tutorial__title">Zoom and move to select a location</div>
        ${iconZoomLoop()}
        ${moveIcon()}
      </div>
    `,
    );
    const zoomContainer = wrapper[0].querySelector('[data-zoom-tutorial-container]');

    wrapper[0].addEventListener('click', function(evt) {
      const target = evt.target.closest('[data-zoom-tutorial-container-close]');
      if (!target) return;
      zoomContainer.classList.remove('active');
    });
    wrapper[0].addEventListener('click', function(evt) {
      const target = evt.target.closest('[data-zoom-tutorial]');
      if (!target) return;
      zoomContainer.classList.toggle('active');
    });
  }
  // instance
  return {
    instance,
    zoomUp: () => {
      instance.zoomUp();
    },
    zoomDown: () => {
      instance.zoomDown();
    },
    setDefault: () => {
      instance.maxZoomDown();
    },
    destroy: () => {
      instance.destroy();
    },
    prepare: () => {
      instance.prepare();
    },
  };
};
