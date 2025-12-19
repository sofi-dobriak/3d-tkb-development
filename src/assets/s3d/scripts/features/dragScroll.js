export function enableDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', e => {
    isDown = true;
    container.classList.add('dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;

    // вимикаємо виділення тексту
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('dragging');

    // повертаємо виділення
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('dragging');

    // повертаємо виділення
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  });

  container.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1; // коефіцієнт швидкості
    container.scrollLeft = scrollLeft - walk;
  });

  // підтримка тачів
  let startTouchX = 0;
  container.addEventListener('touchstart', e => {
    startTouchX = e.touches[0].pageX;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    const walk = (x - startTouchX) * 1;
    container.scrollLeft = scrollLeft - walk;
  });
}
