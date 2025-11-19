import s3d2spriteIcon from "../../spriteIcon";

export default function CheckboxWithLabel({ name, value, title, attributes = '', checked}) {
  return `
    <label class="CheckboxWithLabel" for="${name}-${value}">
      <input ${checked ? 'checked' : ''} value="${value}" type="checkbox" data-type="${name}" data-${name}="${value}" id="${name}-${value}" ${attributes}>
      <div class="CheckboxWithLabel__input">
        ${s3d2spriteIcon('Check')}
      </div>
      <div class="CheckboxWithLabel__label" for="${name}-${value}">${title}</div>
    </label>
  `
}