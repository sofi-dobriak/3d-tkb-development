import { numberWithCommas } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import $closeBtn from './$closeBtn';

function general(i18n, data) {
  const {
    type,
    flyby,
    flatsCount,
    minPriceM2,
    minPrice,
    currency,
    finishDate,
    side,
    buttonType,
    show_prices,
  } = data;

  const originalTitle = i18n.t(`ctr.nav.${type}_${flyby}_${side}`);
  const targetTitleTexts = [
    'ITHACA 6 inside',
    '伊薩卡 6 内部',
    'ИТАКА 6 внутри',
    'Bên trong ITHACA 6',
    'איתקה 6 בפנים',
  ];
  const newTitleText = i18n.t('ctr.nav.new_cyprus_property');

  const $infoBoxTitle = targetTitleTexts.includes(originalTitle) ? newTitleText : originalTitle;

  if (!type) {
    return '';
  }

  const $freeObjectsTitle = flatsCount
    ? `
  <div class="s3d-infoBox__block">
    <div class="s3d-infoBox__subtitle">${i18n.t(`infoBox.freeObjects`)}</div>
    <div class="s3d-infoBox__title">${flatsCount}</div>
  </div>`
    : '';

  const $finishDate = finishDate
    ? `
  <div class="s3d-infoBox__block">
    <div class="s3d-infoBox__subtitle">${i18n.t('infoBox.finishDate')} </div>
    <div class="s3d-infoBox__title">
      ${i18n.t(finishDate)}
    </div>
  </div>
  `
    : '';
  const $minPriceM2 =
    show_prices && minPriceM2
      ? `
  <div class="s3d-infoBox__block">
    <div class="s3d-infoBox__subtitle">${i18n.t('infoBox.price_m2_from')} </div>
    <div class="s3d-infoBox__title">
      ${i18n.t('infoBox.from_price', {
        text: numberWithCommas(minPriceM2),
        currency: i18n.t('currencies.' + currency),
      })}
    </div>
  </div>
  `
      : '';
  const $minPrice =
    show_prices && minPrice
      ? `
  <div class="s3d-infoBox__block">
    <div class="s3d-infoBox__subtitle">${i18n.t('infoBox.price_from')} </div>
    <div class="s3d-infoBox__title">${i18n.t('infoBox.from_price', {
      text: numberWithCommas(minPrice),
      currency: i18n.t('currencies.EUR'),
    })}</div>
  </div>
  `
      : '';

  return `
    <div class="s3d-infoBox__general">
        ${$closeBtn()}
        <span class="s3d-infoBox__title">
          ${$infoBoxTitle}
        </span>
        ${$freeObjectsTitle}
        ${$finishDate}
        ${$minPriceM2}
        ${$minPrice}
        ${ButtonWithoutIcon(
          's3d-infoBox__link',
          `${type && `data-s3d-event="transform" data-type="${type}"`} ${
            flyby ? `data-flyby="${flyby}"` : ''
          } ${side ? `data-side="${side}"` : ''}`,
          i18n.t('infoBox.general.button_titles.' + buttonType),
          'secondary',
        )}
    </div>`;
}

export default general;
