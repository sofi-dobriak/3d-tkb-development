import { get } from 'lodash';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import $closeBtn from './$closeBtn';
import { event } from 'jquery';
import { numberWithCommas } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';

function Floor(i18n, data) {
  const { floor, count, free, build, section, async_data, properties, show_prices } = data;

  const currency = 'USD';

  const floorImageUrlNotFormated = get(async_data, 'url', false);
  const defaultModulePath = '/wp-content/themes/3d/assets';
  const floorImageUrl = `${defaultModulePath}${floorImageUrlNotFormated}`;

  window.addEventListener(
    'floor-cached',
    event => {
      if (
        event.detail.floor == floor &&
        event.detail.build == build &&
        event.detail.section == section
      ) {
        const fullImageUrl = `${defaultModulePath}${event.detail.response.url}`;
        document.querySelector('.s3d-infoBox__flat__image-wrapper img').src = fullImageUrl;
        document.querySelector('.s3d-infoBox__flat__image-wrapper').style.display = '';
      }
    },
    {
      once: true,
    },
  );

  const $floorImage = `
    <div class="s3d-infoBox__flat__image-wrapper" ${!floorImageUrl ? ' style="display:none" ' : ''}>
      <div class="s3d-infoBox__image">
        <img src="${floorImageUrl}"/>
      </div>
    </div>
  `;

  const $price =
    show_prices && properties._price
      ? `
    <div class="text-style-3-d-fonts-1920-h-1 s3d-infoBox__title s3d-infoBox__title-no-bottom-margin">
      ${numberWithCommas(properties._price.value_raw)} ${i18n.t(`currency_label`, '')}
    </div>
  `
      : '';

  const $price_m2 =
    show_prices && properties.price_m2
      ? `
    <div class="s3d-infoBox__flat__block">
      <div class="s3d-infoBox__flat__text">${i18n.t('Floor.information.price_m2_from')}</div>
      <div class="s3d-infoBox__flat__textBold">${numberWithCommas(
        properties.price_m2.value_raw,
      )}</div>
    </div>
  `
      : '';

  return `
    <div class="s3d-infoBox__flat">
        ${$closeBtn()}
        <div class="s3d-infoBox__flat__alert s3d-infoBox__flat__alert--left s3d-infoBox__flat__alert--dark" data-s3d-update="sale" >
          ${i18n.t(`Floor.information.floor`)}:
          ${floor}
        </div>
        <div class="s3d-infoBox__flat__alert" data-s3d-update="sale"  data-sale="1">
          ${i18n.t('Floor.information.free-flats--')} ${free}
        </div>
        ${$floorImage}
        <div class="s3d-infoBox__info">
          <div class="s3d-infoBox__flat__wrapper-label">
            <div class="s3d-infoBox__flat__label">
              ${i18n.t('Floor.information.build')} ${build}
            </div>
            <div class="s3d-infoBox__flat__label">
              ${i18n.t('Floor.information.all-flats')} ${count}
            </div>
          </div>
          <div class="s3d-infoBox__title s3d-infoBox__title-no-bottom-margin" style="display: ${
            show_prices ? '' : 'none'
          }">
            <div class="text-style-3-d-fonts-1920-body-medium text-gray-800">
              ${i18n.t('Floor.information.from')}
            </div>
          </div>
          ${$price}
          
          <!--<div class="text-style-3-d-fonts-1920-h-2-bold s3d-infoBox__title">
            ${i18n.t(`currency_label_m2`, '')} 150
          </div>
          <div class="s3d-infoBox__flat__block">
            <div class="s3d-infoBox__flat__text">${i18n.t('Flat.information.price')}</div>
            <div class="s3d-infoBox__flat__textBold">150 000 ${i18n.t(
              `currencies.${currency}`,
              '',
            )}</div>
          </div>
          <div class="s3d-infoBox__flat__block">
            <div class="s3d-infoBox__flat__text">${i18n.t('Flat.information.price_m2')}</div>
            <div class="s3d-infoBox__flat__textBold">150 ${i18n.t(
              `currencies.${currency}`,
              '',
            )}</div>
          </div>-->
          ${ButtonWithoutIcon(
            '',
            `data-s3d-event="transform" data-type="floor" data-section="${section}" data-build="${build}" data-floor="${floor}"`,
            i18n.t('Floor.information.reviewFloor'),
            'secondary',
          )}
        </div>
      </div>
  `;
}

export default Floor;
