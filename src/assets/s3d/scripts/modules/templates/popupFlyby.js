import ButtonWithoutIcon from "../../../../s3d2/scripts/templates/common/ButtonWithoutIcon";

function popupFlyby(i18n) {
  return `
    <div class="s3d-popup-flyby__wrap js-s3d-popup-flyby">
        <div class="s3d-popup-flyby__active js-s3d-popup-flyby__active"></div>
        <div class="s3d-popup-flyby__bg">
          <div class="s3d-popup-flyby__bg-active js-s3d-popup-flyby__bg-active"></div>
          <div class="s3d-popup-flyby__bg-all"></div>
        </div>
        <div class="s3d-popup-flyby">
          <div class="s3d-popup-flyby__close" data-type="close"></div>
          <div class="s3d-popup-flyby__title text-style-3-d-fonts-1920-h-2-semi-bold">${i18n.t('PopupFlyby.title')}<span data-type="title">2А</span></div>
          <div class="s3d-popup-flyby__line"></div>
          <div class="text-style-3-d-fonts-1920-body-medium  s3d-popup-flyby__text" data-type="text">${i18n.t('PopupFlyby.description')}</div>
          ${ButtonWithoutIcon('', 'data-type="next"', i18n.t('PopupFlyby.btn'), 'secondary')}
          <!--<button class="s3d-popup-flyby__link" data-type="next">
            ${i18n.t('PopupFlyby.btn')}
          </button>-->
        </div>
    </div>
  `;
}

export default popupFlyby;
