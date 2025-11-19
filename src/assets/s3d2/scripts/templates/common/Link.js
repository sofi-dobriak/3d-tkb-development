import s3d2spriteIcon from "../spriteIcon";

export default function Link({text = '', className = '', attributes = '', iconName = ''}) {
  return `
    <button type="button" class="Link ${className}" ${attributes}>
      ${s3d2spriteIcon(iconName)}
      <span class="Link__text">${text}</span>
    </button>
  `;
}