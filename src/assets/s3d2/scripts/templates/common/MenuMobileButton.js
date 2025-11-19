import s3d2spriteIcon from '../spriteIcon';


/**
 * Creates a mobile menu button with customizable properties.
 *
 * @param {String} className - The class name for the button.
 * @param {String} attributes - The additional attributes for the button.
 * @param {String} text - The text content for the button.
 * @param {String} iconName - The name of the icon to be displayed.
 * @param {String('primary'|'secondary')} type - The type of the button (primary or secondary).
 * @returns {String} The HTML markup for the mobile menu button.
 */
export default function MenuMobileButton(className, attributes, text, iconName, type = 'primary', withBirdy) {

  
  switch (type) {
    case 'primary':
      className += ' MenuMobileButton--primary';
      break;
    case 'secondary':
      className += ' MenuMobileButton--secondary';
      break;
  }

  if (withBirdy) {
    className += ' MenuMobileButton--withBirdy';
  }

  return `
    <button class="MenuMobileButton ${className}" ${attributes}>
      ${text ? `<span>${text}</span>` : ''}
      ${iconName !== undefined ? s3d2spriteIcon(iconName, 'MenuMobileButton__icon') : ''}
    </button>
  `;
}