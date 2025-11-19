export default function Checkbox({name, value, title, wide, checked}) {
  return `
    <div class="Checkbox">
      <input ${checked ? 'checked' : ''} class="Checkbox__input" type="checkbox" data-type="${name}" data-${name}="${value}" id="${name}-${value}">
      <label class="Checkbox__label" for="${name}-${value}">${title}</label>
    </div>
  `;
}