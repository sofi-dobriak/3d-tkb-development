const isFit = (pos, size, wrapBorder) => ((pos + size) >= wrapBorder);
const newPosition = (width, border, offset) => (border - width - offset);
const newPositionX = (width, border, offset) => (border - width - offset);

function placeElemInWrapperNearMouse(el, wrap, event, offset = 10) {
  const mousePosition = {
    x: (event.pageX + offset),
    y: (event.pageY),
  };
  const wrapperSize = { height: wrap.offsetHeight, width: wrap.offsetWidth };
  const elementSize = { height: el.offsetHeight, width: el.offsetWidth };
  const isWidthFit = isFit(event.pageX, elementSize.width, wrapperSize.width);
  const isHeightFit = isFit(event.pageY, elementSize.height, wrapperSize.height);
  
  const x = (isWidthFit) ? newPositionX(elementSize.width, event.pageX, offset) : mousePosition.x;
  let y = (isHeightFit) ? newPosition(elementSize.height, wrapperSize.height, offset) : y;
  y = Math.max(mousePosition.y, (el.getBoundingClientRect().height / 2));
  y = Math.min(y, (window.innerHeight - el.getBoundingClientRect().height / 2));
  return { x, y };
}
export default placeElemInWrapperNearMouse;