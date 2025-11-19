export default function $timer(i18n, flat) {
  return `
    <div class="s3d-flat-price__wrapper">
      <div class="old-price js-old-price">${flat.price} ${i18n.t('Flat.information.priceText')}</div>
      <div class="main-price js-action-price">${flat.action_price} ${i18n.t('Flat.information.priceText')}</div>
      <div class="main-price js-price">${flat.price} ${i18n.t('Flat.information.priceText')}</div>
      <div class="s3d-flat-price-timer">
        <div class="s3d-flat-price-timer-text">${i18n.t('Flat.timer.timer-text')}</div>
        <div class="timer">
          <div class="timer__items">
            <div class="timer__item timer__days"></div>
            <div class="timer__item timer__hours"></div>
            <div class="timer__item timer__minutes"></div>
            <div class="timer__item timer__seconds"></div>
          </div>
        </div>
      </div>
      <button class="s3d__callback js-popup-open " data-popup-type="callback" data-open-form>
        <span>
          ${i18n.t('Flat.buttons.callback--1')}
        </span>
      </button>
      <button class="s3d__callback s3d__callback2 js-popup-open " data-popup-type="callback" data-open-popup>
        <span>
          ${i18n.t('Flat.buttons.callback--2')}
        </span>
      </button>
    </div>
  `;
}
