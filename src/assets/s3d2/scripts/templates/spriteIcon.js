export default function s3d2spriteIcon(iconName, className = '', attributes = '') {
  return `
    <svg ${attributes} class="${className}"><use xlink:href="#icon-${iconName}"></use></svg>
  `;
}