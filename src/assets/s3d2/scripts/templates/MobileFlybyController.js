import MenuMobileButton from './common/MenuMobileButton.js';
import s3d2spriteIcon from './spriteIcon.js';
import { $highlightSvgElements } from '../../../s3d/scripts/modules/templates/controller/$highlightSvgElements.js';
import ButtonWithoutIcon from './common/ButtonWithoutIcon.js';
import IconButton from './common/IconButton.js';
import MobileNavigationMenu, {
  mobile_navigation_menu_opener_selector,
} from './MobileNavigationMenu.js';
import { $s3dFlybySideChooser } from '../../../s3d/scripts/modules/templates/controller/$s3dFlybySideChooser';

import getConfig from '../getConfig.js';
import { debounce } from 'lodash';
import { hideElementsAttribute } from '../../../s3d/scripts/features/hideElementsOnPages.js';
import { showElementsOnPageAttribute } from '../../../s3d/scripts/features/showElementsOnPage.js';
import $floorFilter from '../../../s3d/scripts/modules/templates/floorPage/$floorFilter.js';
import { showOn } from '../helpers/helpers_s3d2.js';
import { $flatFloorChooser } from './FlybyController.js';

function toggleClassForMobileFunctionMenuNotDebounced(className, toogle) {
  console.log('toggleClassForMobileFunctionMenuNotDebounced', className, toogle);
  document.querySelectorAll('.MobileFlybyController').forEach(el => {
    el.classList.toggle(className, toogle);
  });
}

export const toggleClassForMobileFunctionMenu = debounce(
  toggleClassForMobileFunctionMenuNotDebounced,
  500,
);

export default function MobileFlybyController(i18n) {
  const config = getConfig();

  return `
    <div class="MobileFlybyController">
      ${MenuMobileButton(
        'js-s3d-ctr__filter',
        hideElementsAttribute(['flat', 'floor', 'favourites']),
        undefined,
        'Filter',
      )}
      ${MenuMobileButton('js-s3d-nav__btn', 'data-type="plannings"', undefined, 'Card')}
      ${MenuMobileButton(
        '',
        'data-mobile-navigation-menu-open ' + mobile_navigation_menu_opener_selector,
        i18n.t('ctr.nav.genplan'),
        'Chevron up',
        'secondary',
      )}
      ${MenuMobileButton(
        '',
        'data-mobile-functions-menu-open ' + hideElementsAttribute(['flat', 'floor', 'plannings']),
        i18n.t('ctr.nav.functions'),
        'Chevron up',
      )}
      ${showOn(
        ['mobile'],
        MenuMobileButton(
          '',
          'data-mobile-floor-functions-menu-open ' + showElementsOnPageAttribute(['floor']),
          i18n.t('ctr.nav.functions'),
          'Chevron up',
        ),
      )}
      <!--${ButtonWithoutIcon(
        '',
        'data-open-form ' + showElementsOnPageAttribute(['flat']),
        i18n.t('ctr.nav.callback'),
        'secondary',
      )}-->
    </div>
    ${MobileFunctionsMenu(i18n)}
    ${showOn(['mobile'], MobileFloorFunctionsMenu(i18n))}
    ${MobileNavigationMenu(i18n, config)}
  `;
}

function MobileFloorFunctionsMenu(i18n) {
  const config = getConfig();
  if (document.documentElement.classList.contains('desktop')) return '';
  return `
    <div class="MobileFunctionsMenu" data-mobile-floor-functions-menu >
      <div class="MobileFunctionsMenu__close" data-mobile-floor-functions-menu-close>
        ${s3d2spriteIcon('close', 'MobileFunctionsMenu__close-icon')}
      </div>
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold MobileFunctionsMenu__title">
        Functions floor
      </div>
      
      ${$highlightSvgElements(i18n, 'data-highlight-floor-svg-elements')}
      ${showOn(['mobile'], $floorFilter(i18n))}
      
    </div>
  `;
}
function MobileFunctionsMenu(i18n) {
  const config = getConfig();
  return `
    <div class="MobileFunctionsMenu" data-mobile-functions-menu >
      <div class="MobileFunctionsMenu__close" data-mobile-functions-menu-close>
        ${s3d2spriteIcon('close', 'MobileFunctionsMenu__close-icon')}
      </div>
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold MobileFunctionsMenu__title">
        ${i18n.t('ctr.nav.functions')}
      </div>
      ${IconButton('js-ctr-btn js-s3d-ctr__helper', '', 'Tutorial')}
      <!--${IconButton('', '', 'Sun')}
      ${IconButton('', '', 'Moon')}-->
      ${showOn(['tablet', 'mobile'], $s3dFlybySideChooser(i18n, config))}
      ${showOn(['tablet', 'mobile'], $flatFloorChooser(i18n))}
      ${document.documentElement.classList.contains('desktop') ? '' : $highlightSvgElements(i18n)}
      <a class='ButtonWithoutIcon ' href="${config.project_google_map_location}" target="_blank">
          ${i18n.t('ctr.menu.on_the_map')}
      </a>
      <!--${ButtonWithoutIcon(
        'js-s3d-flat__3d-tour',
        `data-href="${config.project_google_map_location}" data-title="${i18n.t(
          'ctr.menu.on_the_map',
        )}"`,
        i18n.t('ctr.menu.on_the_map'),
      )}-->
      <!--${ButtonWithoutIcon('', '', i18n.t('ctr.menu.build_progress'))}-->
      <!--${ButtonWithoutIcon(
        '',
        'data-open-form',
        i18n.t('ctr.menu.callbackFormCall'),
        'secondary',
      )}-->
    </div>
  `;
}
