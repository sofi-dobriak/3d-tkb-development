/**
 * Renders a tiny button component.
 *
 * @param {Object} props - The props for the TinyButton component.
 * @param {string} props.className - The class name for the button.
 * @param {string} props.attributes - The additional attributes for the button.
 * @param {string} props.text - The text content of the button.
 * @param {string} props.type - The type of the button.
 * @returns {string} The HTML string representing the TinyButton component.
 */
export default function TinyButton({
  className, attributes, text, type = 'button'
}) {
  return `
    <button class="TinyButton ${className}" ${attributes} type="${type}">
      ${text}
    </button>
  `;
}