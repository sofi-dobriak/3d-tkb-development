import s3d2spriteIcon from "../spriteIcon";


/**
 * @typedef {"secondary" | "primary"} TypeButtonIconLeft
 */

/**
 * 
 * @param {String} className 
 * @param {String} attributes 
 * @param {String} text 
 * @param {String} iconName - icon name from sprite(folder to see icon names - ./src/assets/s3d/svg-sprite)
 * @param {"secondary"|"primary"} [type=primary] - pointer position
 * @returns 
 */
export default function ButtonIconLeft(className, attributes, text, iconName, type = 'primary') {

  let typeClassName = '';

  switch (type) {
    case 'secondary':
      typeClassName = 'ButtonIconLeft--secondary';
      break;
  
    default:
      break;
  }

  return `
    <button class="ButtonIconLeft ${className} ${typeClassName}" ${attributes}>
      ${s3d2spriteIcon(iconName, 'ButtonIconLeft__icon')}
      <span>${text}</span>
    </button>
  `;
}