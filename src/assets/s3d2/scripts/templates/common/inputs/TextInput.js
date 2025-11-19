/**
 * Renders a text input element.
 *
 * @param {Object} props - The input element properties.
 * @param {string} props.text - The placeholder text for the input element.
 * @param {string} props.className - The additional CSS class name for the input element.
 * @param {string} props.attributes - The additional attributes for the input element.
 * @param {('text'|'date'|'number')} props.type - The type of the input element.
 * @param {string} props.value - The initial value of the input element.
 * @returns {string} The HTML string representing the text input element.
 */
export default function TextInput({text = '', className = '', attributes = '', type = 'text', value = ''}) {
  return `
    <input class="TextInput ${className}" type="${type}" value="${value}" ${attributes} placeholder="${text}">
  `;
}