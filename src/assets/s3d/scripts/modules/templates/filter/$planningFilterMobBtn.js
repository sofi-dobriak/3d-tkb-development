export default function planningFilterMobBtn(i18n) {
  return `
    <div class="s3d__wrapper__plannings__filter">
      <div class="js-s3d-pln__filter s3d-ctr__menu-3d-btn-style">
        <div class="s3d-ctr__filter__icon">
          <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="2.5" x2="26" y2="2.5" ></line>
            <line y1="18.5" x2="26" y2="18.5"></line>
            <line y1="10.5" x2="26" y2="10.5"></line>
            <circle cx="20.5" cy="2.5" r="2" fill="none"></circle>
            <circle cx="20.5" cy="18.5" r="2" fill="none"></circle>
            <circle cx="5.5" cy="10.5" r="2" fill="none"></circle>
          </svg>
        </div>
        ${i18n.t('Filter.openFilter')}
      </div>
    </div>
  `;
}
