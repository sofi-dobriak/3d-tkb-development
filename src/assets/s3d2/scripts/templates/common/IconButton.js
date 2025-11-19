import s3d2spriteIcon from "../spriteIcon";


/**
 * Creates an icon button element with the specified class name, attributes, and icon name.
*
* @param {string} className - The class name for the icon button.
* @param {string} attributes - The attributes for the icon button.
* @param {string} iconName - The name of the icon.
* @param {'a'|'alert'} type - Type.
* @returns {string} The HTML string representing the icon button.
*/
export default function IconButton(className, attributes, iconName, type = 'a') {

  switch (type) {
    case 'alert':
      className += ' IconButton--alert';
      break;
    default:
      break;
  }

  return `
    <button class="IconButton ${className}" ${attributes}>
      ${s3d2spriteIcon(iconName, 'IconButton__icon')}
    </button>
  `;
}