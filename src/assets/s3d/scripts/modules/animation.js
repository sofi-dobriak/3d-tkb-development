import { Power1, TimelineMax } from 'gsap';

function getDataSvg(wrap) {
  const input = wrap.querySelector('input:checked');
  const activeBtn = input.closest('label');
  const width = activeBtn.offsetWidth;
  const left = activeBtn.offsetLeft;
  return {
    left,
    width,
  };
}

export const addAnimateBtnTabsInit = (el, svgEl) => {
  const elements = typeof el === 'string' ? document.querySelectorAll(el) : el;
  const svg = typeof svgEl === 'string' ? document.querySelector(svgEl) : svgEl;
  if (!elements || !svg) return;
  const wrap = elements[0].parentElement;
  const { left, width } = getDataSvg(wrap);
  svg.style = `left: ${left}px;width: ${width}px;`;
}

const addAnimateBtnTabs = (el, svgEl) => {
  const elements = typeof el === 'string' ? document.querySelectorAll(el) : el;
  const svg = typeof svgEl === 'string' ? document.querySelector(svgEl) : svgEl;
  if (!elements || !svg) return;
  const wrap = elements[0].parentElement;
  const { left, width } = getDataSvg(wrap);
  svg.style = `left: ${left}px;width: ${width}px;`;
  svg.initialWidth = width;

  wrap.addEventListener('click', event => {
    const button = event.target.closest('label');
    const offset = 0;
    animateBtn(svg, button, offset);
  });

  window.addEventListener('resize', () => {
    const elementsResize = typeof el === 'string' ? document.querySelectorAll(el) : el;
    const wrapResize = elementsResize[0].parentElement;
    const data = getDataSvg(wrapResize);
    svg.style = `left: ${data.left}px;width: ${data.width}px;`;
  });
}

function animateBtn(svg, elem, offset) {
  const currentLeft = svg.offsetLeft;
  const currentWidth = svg.offsetWidth;
  const nextLeft = elem.offsetLeft;
  const nextWidth = elem.offsetWidth;
  const currentEnd = currentLeft + currentWidth;
  const nextEnd = nextLeft + nextWidth;
  const newWidth = currentEnd > nextEnd ? currentEnd : nextEnd;
  const newLeft = currentLeft < nextLeft ? currentLeft : nextLeft;
  const leftOffset = (offset / 2);
  const tl = new TimelineMax();

  tl.to(svg, {
    left: newLeft - leftOffset,
    width: newWidth + offset,
    duration: 0.3,
    ease: Power1.easeInOut,
  });
  tl.to(svg, {
    left: nextLeft - leftOffset,
    width: (nextWidth || svg.initialWidth) + offset,
    duration: 0.4,
    ease: Power1.easeInOut,
  }, '>');
}

const animateFilterSetHeight = (container, height = 0, cb) => {
  const tl = new TimelineMax();
  console.log('animateFilterSetHeight');
  tl.to(container, {
    height,
    duration: 0.4,
    ease: Power1.easeInOut,
  }).finally(cb);
};

export default addAnimateBtnTabs;
``
