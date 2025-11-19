import s3d2spriteIcon from "../spriteIcon";

/**
 * Represents a dropdown component.
 * @param {Array<{active: Boolean, attributes: String, className: String, title: String}>} data - The data for the dropdown items.
 * @param {Object} i18n - The internationalization object.
 * @param {string} attributes - Additional attributes for the dropdown element.
 * @returns {string} The HTML string representing the dropdown component.
 */
export default function Dropdown(data = [], i18n, attributes = '', className = '') {

  const title = data.some(item => item.active) ? data.find(item => item.active).title : i18n.t('Dropdown.title');

  return `<div class="Dropdown ${className}" ${attributes}>
    <div class="Dropdown__title">${title} ${s3d2spriteIcon('Chevron down')}</div>
    <div class="Dropdown__content">
      ${data.map(item => {
        return `<button ${item.attributes} class="Dropdown__item ${item.className}">${item.title}</button>`
      }).join('')}
    </div>
  </div>`
}

