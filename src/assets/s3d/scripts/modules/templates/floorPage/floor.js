import infoFloor from './$floorInfo';
import $floorFilter from './$floorFilter';
import $floorNav from './$floorNav';
import IconButton from '../../../../../s3d2/scripts/templates/common/IconButton';
import { get } from 'lodash';
import { $highlightSvgElements } from '../controller/$highlightSvgElements';
import CheckboxWithLabel from '../../../../../s3d2/scripts/templates/components/filter/CheckboxWithLabel';
import Checkbox from '../../../../../s3d2/scripts/templates/components/filter/Checkbox';
import { numberWithCommas } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';

function Floor(i18n, floor, hideOverlay = true, showPrices) {
  const isMobile = document.documentElement.classList.contains('mobile');

  const info = get(floor, 'properties', {});

  const $minValues =
    Object.entries(info).length > 0
      ? `
    <div class="s3d-floor__info-container2">
      <div class="text-style-3-d-fonts-1920-body-medium text-gray-800" style="display: ${
        showPrices ? '' : 'none'
      }">
        ${i18n.t('Floor.apps_from')}
      </div> 
      ${Object.entries(info)
        .map(([key, value]) => {
          if (/price/.test(key) && !showPrices) return '';

          const formatedValToShow =
            value['type'] === 'number' ? numberWithCommas(value['value']) : value['value'];
            console.log(value)
            if(value['value'].includes("NaN")) return;
          switch (value['size']) {
            case 'large':
              return `<div class="text-style-3-d-fonts-1920-h-1">${formatedValToShow}</div>`;
            default:
              return `<div class="text-style-3-d-fonts-1920-h-2-bold">${formatedValToShow}</div>`;
          }
        })
        .join('')}
    </div>
  `
      : '';

  const $hideOverlay = isMobile
    ? ''
    : $highlightSvgElements(
        i18n,
        `data-highlight-floor-svg-elements ${hideOverlay ? '' : 'checked'}`,
        'highlight-floor-svg-elements',
      );

  const $navWrapperForDesktopAndTablet = `<div class="s3d-floor__nav-wrapper">
    <div class="s3d-floor__info-container__title text-style-3-d-fonts-1920-body-bold">
      ${i18n.t('Floor.changeFloor--')}
    </div>
    ${$floorNav(floor)}
  </div>`;

  return `
  <div class="s3d-floor ">
    <div class="s3d-floor__overlay" data-floor-overlay></div>
    ${isMobile ? $navWrapperForDesktopAndTablet : ''}
    <div class="s3d-floor__zoom-wrapper">
      ${IconButton('', 'data-floor-zoom-button-up', 'Plus')}
      ${IconButton('', 'data-floor-zoom-button-down', 'Minus')}
    </div>
    <!--<div class="s3d__title ">${i18n.t('Floor.title-1')} ${floor.floor} ${i18n.t(
    'Floor.title-2',
  )}</div>-->
    <div class="s3d-floor__menu-container">
      <div>
        <div class="s3d-floor__title text-style-3-d-fonts-1920-h-2-semi-bold">
          ${i18n.t('Floor.title-1')} ${floor.floor} ${i18n.t('Floor.title-2')}
        </div>
        ${infoFloor(i18n, floor)}
      </div>
      ${$minValues}
      <div>
        ${isMobile ? '' : $floorFilter(i18n)}
        ${
          !isMobile
            ? '<div class="s3d-floor__info-container__title text-style-3-d-fonts-1920-body-bold"></div>'
            : ''
        }
        ${$hideOverlay}
        ${
          !isMobile
            ? '<div class="s3d-floor__info-container__title text-style-3-d-fonts-1920-body-bold"></div>'
            : ''
        }
      </div>
      ${!isMobile ? $navWrapperForDesktopAndTablet : ''}
      
    </div>
    <div class="s3d-floor__svg-container ">
      <div class="s3d-floor__svg-wrapper js-s3d-floor" data-svg-floor-zoom></div>
    
    </div>
  </div>
`;
}

export default Floor;
