let isInitedHandler = false;

/**
 * Creates a mobile accordion component.
 *
 * @param {Object} options - The options for the mobile accordion.
 * @param {string} options.title - The title of the accordion.
 * @param {string} options.innerHTML - The inner HTML content of the accordion.
 * @param {string} [options.className=''] - The additional CSS class for the accordion wrapper.
 * @param {string} [options.attributes=''] - The additional attributes for the accordion wrapper.
 * @returns {string} The HTML markup for the mobile accordion.
 */
export default function MobileAccordion({
  title, innerHTML, className = '', attributes = ''
}) {

  mobileAccordion();
  return `
    <div class="accordion-wrapper ${className}" ${attributes}>
      <button class="accordion">${title}</button>
      <div class="panel">
        ${innerHTML}
        <div class="accordion__padding-block"></div>
      </div>
    </div>
  `;
}

function mobileAccordion() {
  if (isInitedHandler) return;
  document.body.addEventListener('click', function mobileAccordionHandler(e) {
    const target = e.target.closest('.accordion');
    if (!target) return;
    target.classList.toggle('active');
    const panel = target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
  isInitedHandler = true;
}