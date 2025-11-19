export default function $reset(i18n) {
  return `
     <button class="s3d-filter__reset s3d-filter__reset-desktop" type="button" id="resetFilter">
      <svg class="s3d-filter__reset-icon" role="presentation">
        <use xlink:href="#icon-reset"></use>
      </svg>
      <span>${i18n.t('Filter.reset')}</span>
    </button>
  `;
}
