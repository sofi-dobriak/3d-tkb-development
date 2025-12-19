import MobileFlybyController from './MobileFlybyController';

import { hideElementsAttribute } from '../../../s3d/scripts/features/hideElementsOnPages';
import { $highlightSvgElements } from '../../../s3d/scripts/modules/templates/controller/$highlightSvgElements';
import { $callbackFormCall } from '../../../s3d/scripts/modules/templates/controller/$menu-buttons';
import { $s3dFlybySideChooser } from '../../../s3d/scripts/modules/templates/controller/$s3dFlybySideChooser';
import getConfig from '../getConfig';
import SpinNav from './SpinNav';
import ButtonIconLeft from './common/ButtonIconLeft';
import ButtonWithoutIcon from './common/ButtonWithoutIcon';
import IconButton from './common/IconButton';
import $compass from './components/$compass';
import { showOn } from '../helpers/helpers_s3d2';

const $dayNightSwitcher = i18n => {
  return `
  <div class="js-ctr-btn s3d-ctr__theme js-s3d-ctr__theme s3d-ctr__menu-3d-btn-style">
    <input type="checkbox" class="s3d-ctr__switch" id="switch">
    <label for="switch">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5C12 2.22386 12.2239 2 12.5 2C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V2.5ZM12 22.5C12 22.7761 12.2239 23 12.5 23C12.7761 23 13 22.7761 13 22.5V19.5C13 19.2239 12.7761 19 12.5 19C12.2239 19 12 19.2239 12 19.5V22.5ZM18.433 3.25C18.1939 3.11193 17.8881 3.19387 17.75 3.43301L16.25 6.03109C16.1119 6.27024 16.1939 6.57603 16.433 6.7141C16.6722 6.85217 16.978 6.77024 17.116 6.53109L18.616 3.93301C18.7541 3.69387 18.6722 3.38807 18.433 3.25ZM7.11597 3.43301C6.9779 3.19387 6.6721 3.11193 6.43295 3.25C6.19381 3.38807 6.11187 3.69387 6.24994 3.93301L7.74994 6.53109C7.88801 6.77024 8.19381 6.85217 8.43295 6.7141C8.6721 6.57603 8.75404 6.27024 8.61597 6.03109L7.11597 3.43301ZM19.433 21.7141C19.1939 21.8522 18.8881 21.7702 18.75 21.5311L17.25 18.933C17.1119 18.6939 17.1939 18.3881 17.433 18.25C17.6722 18.1119 17.978 18.1939 18.116 18.433L19.616 21.0311C19.7541 21.2702 19.6722 21.576 19.433 21.7141ZM7.11597 21.5311C6.9779 21.7702 6.6721 21.8522 6.43295 21.7141C6.19381 21.576 6.11187 21.2702 6.24994 21.0311L7.74994 18.433C7.88801 18.1939 8.19381 18.1119 8.43295 18.25C8.6721 18.3881 8.75404 18.6939 8.61597 18.933L7.11597 21.5311ZM22.7141 7.43301C22.576 7.19387 22.2702 7.11193 22.0311 7.25L19.433 8.75C19.1939 8.88807 19.1119 9.19387 19.25 9.43301C19.3881 9.67216 19.6939 9.7541 19.933 9.61603L22.5311 8.11603C22.7702 7.97795 22.8522 7.67216 22.7141 7.43301ZM2.93301 7.25C2.69387 7.11193 2.38807 7.19387 2.25 7.43301C2.11193 7.67216 2.19387 7.97795 2.43301 8.11603L5.03109 9.61603C5.27024 9.7541 5.57603 9.67216 5.7141 9.43301C5.85217 9.19387 5.77024 8.88807 5.53109 8.75L2.93301 7.25ZM22.7141 17.433C22.576 17.6722 22.2702 17.7541 22.0311 17.616L19.433 16.116C19.1939 15.978 19.1119 15.6722 19.25 15.433C19.3881 15.1939 19.6939 15.1119 19.933 15.25L22.5311 16.75C22.7702 16.8881 22.8522 17.1939 22.7141 17.433ZM2.93301 17.616C2.69387 17.7541 2.38807 17.6722 2.25 17.433C2.11193 17.1939 2.19387 16.8881 2.43301 16.75L5.03109 15.25C5.27024 15.1119 5.57603 15.1939 5.7141 15.433C5.85217 15.6722 5.77024 15.978 5.53109 16.116L2.93301 17.616ZM24 12.5C24 12.2239 23.7761 12 23.5 12H20.5C20.2239 12 20 12.2239 20 12.5C20 12.7761 20.2239 13 20.5 13H23.5C23.7761 13 24 12.7761 24 12.5ZM1.5 12C1.22386 12 1 12.2239 1 12.5C1 12.7761 1.22386 13 1.5 13H4.5C4.77614 13 5 12.7761 5 12.5C5 12.2239 4.77614 12 4.5 12H1.5ZM12.5 8C10.0147 8 8 10.0147 8 12.5C8 14.9853 10.0147 17 12.5 17C14.9853 17 17 14.9853 17 12.5C17 10.0147 14.9853 8 12.5 8Z"/>
      </svg>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.86899 4.94469C9.61332 4.5038 10.3783 4.18891 11.1846 4C8.95165 6.58227 8.51744 10.4032 10.3369 13.5101C12.177 16.5961 15.7123 18.0027 19 17.226C18.4624 17.8558 17.8215 18.4017 17.0978 18.8426C13.3142 21.1519 8.41416 19.8923 6.13986 16.0714C3.86555 12.2295 5.10607 7.25407 8.86902 4.94475L8.86899 4.94469Z"/>
      </svg>
    </label>
  </div>
  `;
};

export const $flatFloorChooser = i18n => {
  return `
    <div class="js-ctr-btn s3d__choose--flat js-s3d__choose--flat s3d-ctr__menu-3d-btn-style">
      <div class="s3d__choose--flat--button-bg js-s3d__choose--flat--button-svg">
          <svg viewBox="0 0 145 44" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 22C0 9.84974 9.84973 0 22 0H123C135.15 0 145 9.84974 145 22C145 34.1503 135.15 44 123 44H22C9.84974 44 0 34.1503 0 22Z"/>
          </svg>
      </div>
      <label class="s3d__choose--flat--button" data-choose-type="flat">
        <input type="radio" name="chooseFlat" checked value='flat'/>
        <span>${i18n.t('ctr.menu.btn.chooseOfApartment')}</span>
      </label>
      <label class="s3d__choose--flat--button" data-choose-type="floor">
          <input type="radio" name="chooseFlat" value='floor'/>
          <span>${i18n.t('ctr.menu.btn.chooseOfFloor')}</span>
      </label>
    </div>
  `;
};

export default function FlybyController(i18n) {
  const config = getConfig();

  const isDesktop = document.documentElement.classList.contains('desktop');

  return `
    ${MobileFlybyController(i18n)}
    <div class="FlybyControllerWrapper" ${hideElementsAttribute([
      'floor',
      'flat',
      'plannings',
      'favourites',
    ])}>
      ${$compass(i18n)}
      ${ButtonIconLeft(
        'js-ctr-btn js-s3d-ctr__filter FlybyControllerWrapper-filter-call-button',
        '',
        i18n.t('ctr.menu.btn.filter'),
        'Filter',
      )}
      <div class="FlybyController">
        <div class="FlybyController__row">
          ${$dayNightSwitcher(i18n)}
          ${IconButton('js-ctr-btn js-s3d-ctr__helper', '', 'Tutorial')}
        </div>
        ${isDesktop ? $s3dFlybySideChooser(i18n, config) : ''}
        ${showOn(['desktop'], $flatFloorChooser(i18n))}
        ${$highlightSvgElements(i18n)}
        <!-- <a class='ButtonWithoutIcon ' href="${
          config.project_google_map_location
        }" target="_blank">
          ${i18n.t('ctr.menu.on_the_map')}
        </a> -->
        ${ButtonWithoutIcon(
          'js-s3d-flat__3d-tour',
          `data-href="${config.project_google_map_location}" data-title="${i18n.t(
            'ctr.menu.on_the_map',
          )}"`,
          i18n.t('ctr.menu.on_the_map'),
        )}
        <!--${ButtonWithoutIcon(
          '',
          'data-open-form',
          i18n.t('ctr.menu.callbackFormCall'),
          'secondary',
        )}-->
      </div>
      ${SpinNav(i18n)}
    </div>
  `;
}
