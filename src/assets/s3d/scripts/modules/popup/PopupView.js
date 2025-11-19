import IconButton from '../../../../s3d2/scripts/templates/common/IconButton';
import EventEmitter from '../eventEmitter/EventEmitter';

/**
 * Represents a Popup view.
 * @extends EventEmitter
 */
export default class Popup extends EventEmitter {
  /**
   * Creates a Popup instance.
   * @param {string} href - The URL of the popup content.
   * @param {string} title - The title of the popup.
   * @param {string} text - The text content of the popup.
   */
  constructor(href, title, text) {
    super();
    this.href = href;
    this.title = title;
    this.text = text;
    this.containerClassName = 'vr-popup';
    const url = new URL(this.href, window.location.origin);
    const hrefExtension = url.pathname.split('.').pop();

    this.type = 'iframe';
    if (hrefExtension.match(/^(jpg|png|jpeg|webp|gif)/i)) {
      this.type = 'image';
    }
  }

  /**
   * Get the HTML markup for the text content of the popup.
   * @returns {string} The HTML markup for the text content.
   */
  get $text() {
    return this.text ? `
      <div class="${this.containerClassName}__text">
        ${this.text}
      </div>
    ` : '';
  }

  /**
   * Get the HTML markup for the title of the popup.
   * @returns {string} The HTML markup for the title.
   */
  get $title() {
    return this.title ? `
      <div class="${this.containerClassName}__title">
        ${this.title}
      </div>
    ` : '';
  }

  /**
   * Render the popup view.
   */
  render() {
    const layout = `
      <div class="${this.containerClassName}">
        <div class="${this.containerClassName}__content">
          <div class="${this.containerClassName}__text-wrapper">
            ${this.$title}
            ${this.$text}
          </div>
          <${this.type} src="${this.href}"></${this.type}>
        </div>
        ${IconButton('vr-popup__close', '', 'close')}
        <!--<svg class="vr-popup__close" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="white"/>
          <path d="M37.826 37.826L22.1738 22.1738M22.1738 37.826L37.826 22.1738L22.1738 37.826Z" stroke="#555568"/>
        </svg>-->
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', layout);
    document.querySelector(`.${this.containerClassName} .${this.containerClassName}__close`)
      .addEventListener('click', () => {
        document.querySelector(`.${this.containerClassName}`).remove();
      }, { once: true });
  }
}