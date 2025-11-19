/**
 * Renders a textarea input element.
 *
 * @param {Object} options - The options for the textarea.
 * @param {string} options.text - The placeholder text for the textarea.
 * @param {string} options.className - The additional CSS class for the textarea.
 * @param {string} options.attributes - The additional attributes for the textarea.
 * @param {string} options.type - The type of the textarea.
 * @param {string} options.value - The initial value of the textarea.
 * @returns {string} The rendered textarea element as a string.
 */
export default function Textarea({text = '', className = '', attributes = '', type = 'text', value = ''}) {
  return `
    <textarea class="Textarea ${className}" ${attributes} placeholder="${text}">${value}</textarea>
  `;
}