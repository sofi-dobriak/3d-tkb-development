import { groupBy, isArray } from 'lodash';
import createFlatInfo from './$flatInfo';
import $addToFavourite from '../$addToFavourite';
import $goToFloor from './$goToFloor';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';
import IconButton from '../../../../../s3d2/scripts/templates/common/IconButton';
import { $highlightSvgElements } from '../controller/$highlightSvgElements';
import { numberWithCommas, showOn } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';
import { format, parseISO } from 'date-fns';
import FlatDocCard from '../../../../../s3d2/scripts/templates/flat/FlatDocCard';
import FlatFinancialTermsCard from '../../../../../s3d2/scripts/templates/flat/FlatFinancialTermsCard';
import ButtonIconLeft from '../../../../../s3d2/scripts/templates/common/ButtonIconLeft';

const createBtn3dTour = (i18n, path) => `
    <a data-href="${path}" target="_blank" class="s3d-flat__3d-tour js-s3d-flat__3d-tour">
      <span class="s3d-flat__3d-tour__text">${i18n.t('Flat.buttons.3dTour')}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.00012 3.45451L2.00012 4.03147L2.00012 12.5454L7.50022 15.7121L8.00023 16L8.50022 15.7121L14.0001 12.5454L14.0001 4.03147L14.0001 3.45451L13.4991 3.16604L8.00023 -3.07799e-05L2.50116 3.16604L2.00012 3.45451ZM3.00012 4.60724L3.00012 11.9673L7.50019 14.5582L7.50002 7.19814L3.00012 4.60724ZM8.50002 7.19813L8.50019 14.5582L13.0001 11.9673L13.0001 4.60721L8.50002 7.19813ZM12.497 3.74298L8.00022 1.15387L3.50323 3.743L8.00002 6.33211L12.497 3.74298Z" fill="#EB5757"/>
      </svg>

    </a>
`;
const createBtnViewFromWindow = (i18n, path) => `
    <a href="${path}" target="_blank" class="s3d-flat__view-from-window">
      <span class="s3d-flat__view-from-window__text">${i18n.t('Flat.buttons.windowView')}</span>
    </a>
`;
const createGalleryBtn = (i18n, path) => `
    ${ButtonWithoutIcon(
      '',
      `data-gallery-popup-call data-href="${path.join('~')}" `,
      i18n.t('Flat.buttons.gallery_btn'),
    )}
`;

/**
 * Represents a Flat object.
 *
 * @constructor
 * @param {Object} i18n - The internationalization object.
 * @param {Object} flat - The flat object.
 * @param {Array} favouritesIds$ - The array of favourite IDs.
 * @param {Array} [otherTypeFlats=[]] - The array of other type flats.
 * @param {Array} [labelsToShowInInfoBlock=[]] - The array of labels to show in the info block.
 * @param {Object} [unit_statuses={}] - The unit statuses object.
 * @param {Array} [floorList=[]] - The array of floor list.
 * @param {Array} [projectDocs=[]] - The array of project documents.
 * @param {Array} [financialTermsData=[]] - The array of financial terms data.
 */
function Flat(
  i18n,
  flat,
  favouritesIds$,
  otherTypeFlats = [],
  labelsToShowInInfoBlock = [],
  unit_statuses = {},
  floorList = [],
  projectDocs = [],
  financialTermsData = [],
  constructionProgress = null,
  showPrices,
) {
  const infoFlat = createFlatInfo(i18n, flat);
  const isChecked = favouritesIds$.value.includes(flat.id);
  const btn3dTour = flat['3d_tour'] ? createBtn3dTour(i18n, flat['3d_tour']) : '';
  const btnViewFromWindow = flat['view_from_window']
    ? createBtnViewFromWindow(i18n, flat['view_from_window'])
    : '';
  const galleryBtn = flat['gallery'] ? createGalleryBtn(i18n, flat['gallery']) : '';
  const specifiedFlybyByGroup = groupBy(flat.specifiedFlybys, e => {
    return `flyby_${e.flyby}_${e.side}`;
  });

  const $specifiedFlybysByGroup = Object.entries(specifiedFlybyByGroup)
    .map(([groupName, flybyList]) => {
      return `
      <div class="dropup-content-group">
        <div class="dropup-content-group-title">${i18n.t(`ctr.nav.${groupName}`)}</div>
        ${flybyList
          .map(el => {
            return ButtonWithoutIcon(
              '',
              `
            data-show-flat-in-flyby
            data-side="${el.side}"
            data-control-point="${el.controlPoint}"
            data-flyby="${el.flyby}"
            data-type="flyby"
            change="true"
            data-flatid="${flat.id}"
            `,
              `${i18n.t('Flat.buttons.view')} ${el.controlPointTitle}`,
            );
            return `<button
          data-show-flat-in-flyby
          data-side="${el.side}"
          data-control-point="${el.controlPoint}"
          data-flyby="${el.flyby}"
          data-type="flyby"
          change="true"
          data-flatid="${flat.id}"
        >
            ${i18n.t('Flat.buttons.view')} ${el.controlPointTitle}
          </button>`;
          })
          .join('')}
      </div>`;
    })
    .join('');
  const $specifiedFlybys = isArray(flat.specifiedFlybys)
    ? `
    <div class="dropup">
      <button class="dropbtn s3d-flat__small-button-with-icon">
        <svg class="desktop" style="margin-right: 8px;" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M-1.51005e-07 3.45455L-1.51004e-07 4.0315L-1.51003e-07 12.5455L5.5001 15.7121L6.0001 16L6.5001 15.7121L12 12.5455L12 4.0315L12 3.45455L11.499 3.16607L6.0001 -2.62273e-07L0.50104 3.16607L-1.51005e-07 3.45455ZM1 4.60727L1 11.9673L5.50007 14.5582L5.4999 7.19817L1 4.60727ZM6.4999 7.19816L6.50007 14.5582L11 11.9673L11 4.60724L6.4999 7.19816ZM10.4969 3.74301L6.0001 1.1539L1.50311 3.74303L5.9999 6.33214L10.4969 3.74301Z"/>
        </svg>
        ${i18n.t('Flat.buttons.showIn3d')}
      </button>
      <div class="dropup-content">
        ${$specifiedFlybysByGroup}
      </div>
    </div>`
    : '';

  function createFloorTable(floors) {
    let table = `<table class="s3d-flat__other-flats-table ${showOn(
      ['mobile'],
      'space-t-4',
    )}  ${showOn(['tablet', 'desktop'], 'space-t-10')} ">`;
    table += `<tr class="${showOn(['mobile'], 'text-style-3-d-fonts-1920-super-tiny')}  ${showOn(
      ['tablet', 'desktop'],
      'text-style-3-d-fonts-1920-body-medium',
    )}">
        <th>
          ${showOn(['mobile'], i18n.t('Flat.information.floor_n_mobile'))}
          ${showOn(['desktop', 'tablet'], i18n.t('Flat.information.floor_n_desktop'))}
        </th>
        <th>${i18n.t('Flat.information.build')}</th>
        ${
          showPrices
            ? `
            <th>${i18n.t('Flat.information.price')}</th>
            <!--<th>${i18n.t('Flat.information.price_m2')}</th>-->
          `
            : ''
        }
        <th>${i18n.t('Flat.information.sale')}</th>
        <th></th>
      </tr>`;
    floors.forEach(floor => {
      if (floor.sale != 1) return;
      table += `<tr>
        <td class="text-style-3-d-fonts-1920-body-medium">
          ${floor.floor}
        </td>
        <td class="text-style-3-d-fonts-1920-body-medium">
          ${floor.build}
        </td>
        ${
          showPrices
            ? `
          <td class="whitespace-nowrap ${showOn(
            ['mobile'],
            'text-style-3-d-fonts-1920-body-bold',
          )} ${showOn(['desktop', 'tablet'], 'text-style-3-d-fonts-1920-h-1')}">
            ${i18n.t('currency_label')} ${numberWithCommas(floor.price)}
            </td>
            <!--<td class="whitespace-nowrap ${showOn(
              ['mobile'],
              'text-style-3-d-fonts-1920-body-bold',
            )} ${showOn(['desktop', 'tablet'], 'text-style-3-d-fonts-1920-h-2-bold')}">
              ${i18n.t('currency_label')} ${numberWithCommas(floor.price_m2)}
            </td>-->
          `
            : ''
        }
        <td>
          <div class="s3d-card__status s3d-card__image-info" data-sale='${floor.sale}'>
            ${i18n.t(`unit_statuses.${floor.sale}`)}
            ${s3d2spriteIcon('Info', 's3d-card__status-icon')}
          </div>
        </td>
        <td>${ButtonWithoutIcon(
          'js-s3d-nav__btn',
          `data-type="flat" data-id="${floor.id}"`,
          i18n.t('Flat.information.viewPlanning'),
          'secondary',
        )}</td>
      </tr>`;
    });
    table += '</table>';
    return table;
  }

  const floorTable = createFloorTable(otherTypeFlats);

  const $priceBlock = showPrices
    ? `
    <div class="s3d-flat__info-block-price-wrapper">
      <div class="text-gray-900 text-style-3-d-fonts-1920-h-2-bold">
        ${i18n.t('currency_label')} ${flat['price']}
      </div>
      <!--<div class="text-gray-900 text-style-3-d-fonts-1920-body-bold">
        ${i18n.t('currency_label')} ${flat['price_m2']} ${i18n.t('area_unit')}
      </div>-->
    </div>
  `
    : ``;

  return `
  <div class="s3d-flat js-s3d-flat">
    <div class="s3d-flat__info-wrapper">
      <div class="s3d-flat__info-block-top-info">
        <div class="text-style-3-d-fonts-1920-h-2-bold text-gray-900">
          ${i18n.t('Flat.information.number')} ${flat['number']}
        </div>
        <div
          class="s3d-flat__info-block-status-label"
          style="background-color: ${unit_statuses[flat['sale']]['background']}; color: ${
    unit_statuses[flat['sale']]['color']
  }"
        >
          ${i18n.t(`unit_statuses.${flat['sale']}`)}
          ${s3d2spriteIcon('Info', '', `style="fill: ${unit_statuses[flat['sale']]['color']}"`)}
        </div>
      </div>

      <div class="s3d-flat__info-block-label-wrapper">
        ${labelsToShowInInfoBlock
          .filter(property => property['key'] !== 'type')
          .map(property => {
            return `<div class="s3d-flat__info-block-label">
            ${i18n.t(property['label'])}: ${flat[property['key']]} ${i18n.t(
              property['postfix_key'],
            )}
          </div>`;
          })
          .join('')}
          <div class="s3d-flat__info-block-label">
            ${i18n.t('infoBox.parking')}
          </div>
          <div class="s3d-flat__info-block-label">
            ${i18n.t('infoBox.storage')}
          </div>
      </div>
      ${$priceBlock}
      <!--${infoFlat}-->
        <!--${$addToFavourite(i18n, flat, favouritesIds$)}-->
        <div class="s3d-flat__buttons-wrap js-s3d-flat__buttons-view">
          <div class="s3d-flat__buttons-view">
            <label data-type="2d" class="s3d-flat__radio js-s3d__radio-view" >
              <input type="radio" name="view" value="2d">
              <span>${i18n.t('Flat.buttons.with')}</span>
            </label>
            <label class="s3d-flat__select js-s3d__radio-view-change">
              <input type="checkbox">
              <i class="s3d-flat__select-circle"></i>
            </label>
            <label data-type="3d" class="s3d-flat__radio js-s3d__radio-view">
              <input type="radio" name="view" value="3d">
              <span>${i18n.t('Flat.buttons.without')}</span>
            </label>
          </div>
          <div class="s3d-flat__buttons js-s3d-flat__buttons-type" style="display:none"></div>
        </div>
        <div class="s3d-flat__info-block-double-item s3d-flat__info-block-double-item--with-offset">
          <!--${
            showPrices
              ? `
              <a href="#" class="s3d-flat__small-button-with-icon">
                ${s3d2spriteIcon('Analytic')}
                ${i18n.t('Price')}
              </a>
            `
              : ''
          }-->
          ${$specifiedFlybys}
        </div>
        <div class="s3d-flat__info-block-bottom">
          <!--${ButtonWithoutIcon(
            'js-popup-open ',
            ' data-popup-type="callback" data-open-form style="width: 100%"',
            i18n.t('Flat.buttons.callback--1'),
            'secondary',
          )}-->
          <div class="s3d-flat__info-block-double-item">
            <a href="#" class="s3d-flat__small-button-with-icon js-s3d__create-pdf">
              ${s3d2spriteIcon('PDF')}
              <span>${i18n.t('Flat.buttons.pdf')}</span>
            </a>
            <a href="#" class="s3d-flat__small-button-with-icon js-s3d-add__favourite ${
              isChecked ? 'added-to-favourites' : ''
            }" data-id="${flat['id']}">
              <input type="checkbox" data-key="checked">
              ${s3d2spriteIcon('Compare')}
              <span title="${i18n.t('Flat.buttons.addedToCompare')}" data-in-fav>${i18n.t(
    'Flat.buttons.addedToCompare',
  )}</span>
              <span title="${i18n.t('Flat.buttons.compare')}" data-not-in-fav>${i18n.t(
    'Flat.buttons.compare',
  )}</span>
            </a>
          </div>
        </div>
    </div>
    <div class="s3d-flat__content-wrapper">
      ${
        flat['3d_tour'] && window.status !== 'local'
          ? FlatContentScreen(`
        <iframe src="${flat['3d_tour']}" loading="lazy" allowfullscreen="true"></iframe>
      `)
          : ''
      }
      <div class="s3d-flat__image-container" style="display: none">
        <div class="s3d-flat__image">
          <img onerror="this.onerror=null; this.setAttribute('src', '${defaultModulePath}/images/examples/no-image.png')" class="js-s3d-flat__image" src="" data-mfp-src="">
        </div>
      </div>
      ${FlatContentScreen(FlatExplicationScreen(flat, i18n))}
      ${
        flat['parking_image']
          ? `
        <div class="s3d-flat__content-screen ">
          <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900">
            ${i18n.t('Flat.parking')} ${flat['number']}
          </div>
          <img src="${flat['parking_image']}" alt="parking"/>
        </div>
      `
          : ''
      }
      ${flat['gallery'] ? FlatContentScreen(FlatGalleryScreen(flat['gallery'], i18n)) : ''}



      ${FlatContentScreen(
        `
        <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900 s3d-flat__floor-plan-container-title">
        ${i18n.t('Flat.floor_plan')}
        </div>
        <div class="s3d-flat__floor-plan-container-nav">
          ${IconButton('', 'data-flat-floor-zoom-button-up', 'Plus')}
          ${IconButton('', 'data-flat-floor-zoom-button-down', 'Minus')}
        </div>
        ${$goToFloor(i18n, flat, floorList)}
      `,
        's3d-flat__floor-plan-container',
      )}

      ${
        flat['overal_3d_tour']
          ? `
        <div class="s3d-flat__content-screen ">
          <iframe src="${flat['overal_3d_tour']}" loading="lazy" allowfullscreen="true"></iframe>
        </div>
      `
          : ''
      }

      <div class="space-b-8 ${showOn(['mobile'], 'space-t-4')} ${showOn(
    ['desktop', 'tablet'],
    'space-t-8',
  )}">
        <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900">
          ${i18n.t('Flat.other_flats_title')}
        </div>
        ${floorTable}
      </div>
    </div>
  </div>
`;
}

function FlatConstructionProgressScreen(i18n, constructionProgress) {
  if (!constructionProgress) {
    return '';
  }

  const { date, text, video, gallery } = constructionProgress;

  return `
    <div class="s3d-flat__construction-progress-screen">
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900 s3d-flat__construction-progress-screen-title">${i18n.t(
        'Flat.construction_title',
      )}</div>
      <div class="s3d-flat__construction-progress-screen-left">
        ${
          date
            ? `<div class="s3d-flat__construction-progress-screen-inner-title">
            ${i18n.t('monthes.' + format(parseISO(date), 'MMMM'))},
            ${format(parseISO(date), 'yyyy')}
          </div>`
            : ''
        }
        <div class="text-style-3-d-fonts-1920-body-medium text-gray-900 s3d-flat__construction-progress-screen-text">
          ${text}
        </div>
        ${
          video
            ? ButtonIconLeft(
                'js-s3d-flat__3d-tour',
                `data-href="${video}"`,
                i18n.t('Flat.buttons.video'),
                'Play',
                'secondary',
              )
            : ''
        }
      </div>
      <div class="s3d-flat__construction-progress-screen-right">
        <div class="s3d-flat__construction-progress-screen-inner-title">
          ${i18n.t('Flat.gallery')}
        </div>
        <div class="swiper-container" data-flat-construction-gallery-swiper>
          <div class="swiper-wrapper">
            ${gallery
              .map(el => {
                return `<div class="swiper-slide">
                <div class="s3d-flat__construction-progress-screen-slide">
                  <img src="${el}" alt="" loading="lazy">
                </div>
              </div>`;
              })
              .join('')}
          </div>
          <div class="swiper-pagination">
            ${IconButton('', 'data-flat-construction-gallery-swiper-button-prev', 'Arrow left')}
            <div class="text-style-3-d-fonts-1920-body-medium text-gray-900">
              <span data-flat-construction-gallery-swiper-current-slide>1</span>
              <span>/</span>
              <span data-flat-construction-gallery-swiper-total-slide>${gallery.length}</span>
            </div>
            ${IconButton('', 'data-flat-construction-gallery-swiper-button-next', 'Arrow right')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function FlatDocumentationScreen(i18n, projectDocs) {
  if (!projectDocs.length) {
    return '';
  }
  return `
    <div class="s3d-flat__documentation-screen">
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900 s3d-flat__documentation-screen-title">${i18n.t(
        'Flat.doc_title',
      )}</div>
      ${projectDocs
        .map(el => {
          return FlatDocCard(el, i18n);
        })
        .join('')}
    </div>
  `;
}

function FlatFinancialTermsScreen(i18n, financialTermsData) {
  if (!financialTermsData.length) {
    return '';
  }
  return `
    <div class="s3d-flat__financial-terms-screen">
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900 s3d-flat__financial-terms-screen-title">${i18n.t(
        'Flat.financial_terms_title',
      )}</div>
      ${financialTermsData
        .map(el => {
          // return el.title;
          return FlatFinancialTermsCard(el);
        })
        .join('')}
    </div>
  `;
}

function FlatPriceHistory(data, i18n) {
  if (!Array.isArray(data) || !data.length) {
    return '';
  }
  const firstDate = data[data.length - 1].date;
  const lastDate = data[0].date;

  const $firstFormatedDate = i18n.t('monthes.' + format(parseISO(firstDate), 'MMMM'));
  const $lastFormatedDate = i18n.t('monthes.' + format(parseISO(lastDate), 'MMMM'));

  const $firstFormatedYear = format(parseISO(firstDate), 'yyyy');
  const $lastFormatedYear = format(parseISO(lastDate), 'yyyy');

  return `
    <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900">${i18n.t(
      'Flat.information.priceHistory',
    )}</div>
    <div class="text-style-3-d-fonts-1920-body-medium space-t-2 space-b-2">
      ${$firstFormatedDate} ${$firstFormatedYear} - ${$lastFormatedDate} ${$lastFormatedYear}
    </div>
    <div id="chart"></div>
  `;
}

function FlatExplicationScreen(flat, i18n) {
  // s3d-flat__

  const $floorButtons = () => {
    if (!flat.level) {
      return '';
    }
    const $buttons = [];
    for (let i = 1; i <= +flat.level; i++) {
      $buttons.push(
        ButtonWithoutIcon(
          '',
          `data-flat-explication-button="floor" data-value="${i}"`,
          i18n.t(`Flat.explication_data.floor_${i}`),
        ),
      );
    }
    return $buttons.join('');
  };
  console.log(flat);

  return `
  ${showOn(
    ['mobile'],
    `
    <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900">

    </div>
  `,
  )}
  <div class="s3d-flat__explication-screen">
    <div class="s3d-flat__explication-screen-table">
      <div class="s3d-flat__explication-screen-table-navigation">
        <!--${$floorButtons()}-->
        ${ButtonWithoutIcon(
          '',
          'data-flat-explication-button="type"  data-value="2d"',
          i18n.t(`Flat.buttons.planning3d`),
        )}
        ${ButtonWithoutIcon(
          '',
          'data-flat-explication-button="type" data-value="3d"',
          i18n.t(`Flat.buttons.planning2d`),
        )}
      </div>
      <!--${$highlightSvgElements(
        i18n,
        `data-flat-explication-furnished`,
        'flat-explication-furnished',
        i18n.t(`Flat.buttons.furnished`),
      )}-->
      <div class="text-style-3-d-fonts-1920-h-2-bold text-gray-900 space-t-2" data-flat-explication-title>
      ${i18n.t(`Flat.explication_data.floor_${flat.floor}`)}
      </div>
      <div class="s3d-flat__explication-screen-info space-t-2">
        <div class="s3d-flat__explication-screen-info-row text-style-3-d-fonts-1920-body-bold text-gray-900">
          <div class="s3d-flat__explication-screen-info-row-title">${i18n.t(
            'Flat.information.allArea',
          )}:</div>
          <div class="s3d-flat__explication-screen-info-row-value">
            ${flat.area} ${i18n.t('area_unit')}
          </div>
        </div>
        <div class="s3d-flat__explication-screen-info-row text-style-3-d-fonts-1920-body-bold text-gray-900">
          <div class="s3d-flat__explication-screen-info-row-title">${i18n.t(
            'Flat.information.life_area',
          )}:</div>
          <div class="s3d-flat__explication-screen-info-row-value">
            ${flat.life_room} ${i18n.t('area_unit')}
          </div>
        </div>

      </div>
      <div class="s3d-flat__explication-screen-info space-t-2" data-flat-explication-floor-properties-container>
        <div class="s3d-flat__explication-screen-info-row text-style-3-d-fonts-1920-body-medium text-gray-800">
          <div class="s3d-flat__explication-screen-info-row-title">Living area:</div>
          <div class="s3d-flat__explication-screen-info-row-value">
            ${flat.life_room} ${i18n.t('area_unit')}
          </div>
        </div>
      </div>
    </div>
    <div class="s3d-flat__explication-screen-slider swiper-container ">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="s3d-flat__explication-screen-slide">
            <img src="${flat.img_big}" data-flat-explication-image/>
          </div>
        </div>
      </div>
    </div>

  </div>
  ${showOn(
    ['desktop', 'tablet'],
    `
    <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900">

    </div>
  `,
  )}
  `;
}

export function FlatExplicationPropertyRow(title, value, i18n) {
  return `
    <div class="s3d-flat__explication-screen-info-row text-style-3-d-fonts-1920-body-medium text-gray-800">
      <div class="s3d-flat__explication-screen-info-row-title">${title}</div>
      <div class="s3d-flat__explication-screen-info-row-value">
        ${value} ${i18n.t('area_unit')}
      </div>
    </div>
  `;
}

function FlatGalleryScreen(images = [], i18n) {
  return `
    <div class="swiper-container s3d-flat__gallery-container" data-flat-gallery-slider>
      <div class="swiper-wrapper">
      ${images
        .map(
          image => `
        <div class="swiper-slide">
          <div class="s3d-flat__gallery-container-slide">
            <img src="${image}" alt="Flat image" loading="lazy">
          </div>
        </div>
      `,
        )
        .join('')}
      </div>
      <div class="s3d-flat__gallery-container-navigation">
        ${IconButton('', 'data-flat-gallery-swiper-button-prev', 'Arrow left')}
        <div class="text-style-3-d-fonts-1920-body-medium text-gray-900">
          <span data-flat-gallery-swiper-current-slide>1</span>
          <span>/</span>
          <span data-flat-gallery-swiper-total-slide>${images.length}</span>
        </div>
        ${IconButton('', 'data-flat-gallery-swiper-button-next', 'Arrow right')}
      </div>
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold text-gray-900">
        ${i18n.t('Flat.gallery')}
      </div>
    </div>
  `;
}

function FlatContentScreen(children = '', className = '') {
  return `
    <div class="s3d-flat__content-screen ${className}">
      ${children}
    </div>
  `;
}

export default Flat;
