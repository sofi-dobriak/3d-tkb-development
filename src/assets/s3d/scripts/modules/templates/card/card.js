import $addToFavourite from '../$addToFavourite';
import { numberWithCommas } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';
import closeCard from './$closeCard';

function Card(i18n, flat, favouritesIds$, showPrices) {
  const imageDefault = `${window.defaultModulePath}/images/examples/no-image.png`;
  const {
    area,
    rooms,
    rooms_unit,
    floor,
    number,
    price_m2,
    build,
    type,
    price,
    sale,
    img_big: src,
    id,
  } = flat;

  const $price = (i18n, flat) => {
    return `
       <div class="s3d-card__price s3d-card__image-info">
          ${price} ${i18n.t('Flat.information.priceText')}
        </div>
    `;
  };

  const $status = (i18n, flat) => {
    return `
       <div class="s3d-card__status s3d-card__image-info" data-sale='${sale}'>
          ${i18n.t(`unit_statuses.${sale}`)}
          ${s3d2spriteIcon('Info', 's3d-card__status-icon')}
        </div>
    `;
  };

  const $number = (i18n, flat) => {
    return `
       <div class="s3d-card__rooms-count s3d-card__image-info">
        ${i18n.t('Flat.information.area')}: ${flat.area} ${i18n.t('Flat.information.area_unit')}
       </div>
    `;
  };

  const isFavourite = favouritesIds$.value.includes(id);

  return `
    <div class="s3d-card js-s3d-card" data-id="${id}" data-key="id" data-sale="${sale}" data-build="${build}" data-floor="${floor}">
      ${closeCard()}
      <div class="s3d-card__image">
        <img src="${src || imageDefault}" data-key="src" loading="lazy">
         ${$status(i18n, flat)}
         ${$number(i18n, flat)}
      </div>
      <div class="s3d-card__info-wrapper">
        <div class="s3d-card__info-label-wrapper">
          <div class="s3d-card__info-label">
            ${i18n.t('Flat.information.build')}: ${build}
          </div>
          <div class="s3d-card__info-label">
            ${i18n.t('Flat.information.floor')}: ${floor}
          </div>
          <div class="s3d-card__info-label">
            ${i18n.t('Flat.information.rooms')}: ${rooms}
          </div>
          <div class="s3d-card__info-label">
            ${i18n.t('Flat.information.number')}: ${number}
          </div>
        </div>
        ${
          showPrices
            ? `<div class="s3d-card__title">
            ${i18n.t('Flat.information.priceText')} ${price}
          </div>`
            : ''
        }
        <div class="s3d-card__table">
          ${
            showPrices
              ? `
              <div class="s3d-card__row">
                <!-- <div class="s3d-card__name">
                  ${i18n.t('Flat.information.priceText')}
                  ${i18n.t('Flat.information.per')}
                  ${i18n.t('Flat.information.area_unit')}:</div> -->
                <!--<div class="s3d-card__value" data-key="floor">${numberWithCommas(
                  price_m2,
                )}</div>-->
              </div>
            `
              : ''
          }
        </div>
        <div class="s3d-card__buttons">
            ${ButtonWithoutIcon('js-s3d-card__link', '', i18n.t('Flat.goToFlat'), 'secondary')}
            ${$addToFavourite(i18n, flat, favouritesIds$)}
        </div>
      </div>
   </div>`;
}

export default Card;
