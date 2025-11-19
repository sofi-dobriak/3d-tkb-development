import { numberWithCommas } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';
import $closeBtn from './$closeBtn';

function Flat(i18n, data) {
  const imageDefault = `${window.defaultModulePath}/images/examples/no-image.png`;
  const {
    rooms,
    rooms_unit,
    floor,
    price,
    price_m2,
    build,
    type,
    number,
    area,
    sale,
    currency,
    id,
    show_prices,
    img_small: srcImage,
  } = data;

  const img = srcImage ? srcImage : imageDefault;

  const $priceBlock = show_prices
    ? `
    <div class="text-style-3-d-fonts-1920-h-1 s3d-infoBox__title s3d-infoBox__title-no-bottom-margin">
      ${i18n.t(`currency_label`, '')} ${price} 
      </div>
      <!--<div class="text-style-3-d-fonts-1920-h-2-bold s3d-infoBox__title">
        ${i18n.t(`currency_label_m2`, '')} ${numberWithCommas(price_m2)} 
    </div>-->
  `
    : ``;

  return `
    <div class="s3d-infoBox__flat">
      ${$closeBtn()}
      <div class="s3d-infoBox__flat__alert s3d-infoBox__flat__alert--left s3d-infoBox__flat__alert--dark" data-s3d-update="sale" >
        ${i18n.t(`Flat.information.area`)}:
        ${area} ${i18n.t('Flat.information.area_unit')}
      </div>
      <div class="s3d-infoBox__flat__alert" data-s3d-update="sale"  data-sale="${sale}">
        ${i18n.t(`sales.${sale}`)}
      </div>
      <div class="s3d-infoBox__flat__image-wrapper">
        <div class="s3d-infoBox__image">
          <img src="${img}"/>
        </div>
      </div>
      <div class="s3d-infoBox__info">
        <div class="s3d-infoBox__flat__wrapper-label">
          <div class="s3d-infoBox__flat__label">
            ${i18n.t('Flat.information.rooms')} ${rooms}
          </div>
          <div class="s3d-infoBox__flat__label">
            ${i18n.t('Flat.information.floor')} ${floor}
          </div>
          <div class="s3d-infoBox__flat__label">
            ${i18n.t('Flat.information.number')} ${number}
          </div>
        </div>
        ${$priceBlock}
        <!--<div class="s3d-infoBox__flat__block">
          <div class="s3d-infoBox__flat__text">${i18n.t('Flat.information.price')}</div>
          <div class="s3d-infoBox__flat__textBold">${price} ${i18n.t(`currency_label`, '')}</div>
        </div>
        <div class="s3d-infoBox__flat__block">
          <div class="s3d-infoBox__flat__text">${i18n.t('Flat.information.price_m2')}</div>
          <div class="s3d-infoBox__flat__textBold">${numberWithCommas(price_m2)} ${i18n.t(
    `currency_label`,
    '',
  )}</div>
        </div>-->
        ${ButtonWithoutIcon(
          '',
          `data-s3d-event="transform" data-type="flat" data-id="${id}"`,
          i18n.t('infoBox.reviewFlat'),
          'secondary',
        )}
      </div>
    </div>`;
}

export default Flat;
