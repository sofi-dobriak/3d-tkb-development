export default function Range({title, name, min = 0, max= 15, from= 0, to = 15, i18n}) {
  return `
    <div class="Range js-filter-range">
      <div class="Range__title">${title}</div>
      <input class="Range__input" data-type="${name}" data-border="min"/>
      <div class="Range__item ">
        <input class="js-s3d-filter__${name}--input " data-type="${name}" data-min="${min}" data-max="${max}" data-from="${from}" data-to="${to}">
      </div>
      <input class="Range__input" data-type="${name}" data-border="max"/>
    </div>
  `;
}