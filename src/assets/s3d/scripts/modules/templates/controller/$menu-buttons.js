import { $s3dFlybySideChooser } from "./$s3dFlybySideChooser";
import { $highlightSvgElements } from "./$highlightSvgElements";

export function $callbackFormCall(i18n) {
  return `
    <div class="button-desktop-text-mobile-icon" data-open-form>
      <span>${i18n.t('ctr.menu.callbackFormCall')}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.83174 4.52852L10.0381 7.57625L8.12095 9.39862L7.62612 9.86899L8.04804 10.4057C8.7241 11.2657 9.48676 12.1005 10.315 12.8879L10.3151 12.8879C11.2707 13.7963 12.2873 14.6173 13.3373 15.3278L13.837 15.6659L14.2743 15.2502L16.2205 13.4002L19.4264 16.4477L17.8508 17.9455C17.4672 18.3101 16.9942 18.5001 16.4021 18.5001C15.6506 18.5001 14.6613 18.1919 13.4389 17.4776C11.5099 16.35 9.66365 14.5991 9.03417 14.0005L9.03405 14.0003C8.29816 13.3008 6.65158 11.7319 5.56016 10.1014L5.56014 10.1013C4.88465 9.09227 4.56741 8.28068 4.51042 7.65433C4.45715 7.06882 4.62608 6.62516 5.01617 6.25434C5.01617 6.25434 5.01617 6.25433 5.01617 6.25433L6.83174 4.52852ZM19.5436 16.5591C19.5433 16.5588 19.543 16.5585 19.5427 16.5582L19.5436 16.5591ZM7.80456 3.3837C7.26345 2.86934 6.40017 2.86973 5.85918 3.38344L5.85889 3.38371L3.98272 5.16715L3.98271 5.16716C3.24508 5.86834 2.92372 6.76942 3.01659 7.79024C3.10575 8.77021 3.5711 9.82652 4.31363 10.9357C5.50449 12.7149 7.25882 14.3824 7.98845 15.076L8.00048 15.0874L8.0006 15.0875L8.00605 15.0927C8.63321 15.6891 10.5893 17.5493 12.6819 18.7726L12.682 18.7726C14.0142 19.5511 15.2736 20.0001 16.4021 20.0001C17.3557 20.0001 18.2055 19.6778 18.8843 19.0327L20.5756 17.4249C20.7071 17.2999 20.8113 17.1518 20.8833 16.9889L20.9973 16.9393V16.4477C20.9973 16.0745 20.844 15.7252 20.5762 15.4711M20.5753 15.4702L17.1933 12.2554C17.1933 12.2554 17.1933 12.2554 17.1933 12.2554C16.9278 12.003 16.5789 11.87 16.2205 11.87C15.8618 11.87 15.5135 12.0033 15.2482 12.2549L15.2476 12.2554L13.6847 13.7411C12.8793 13.1614 12.0953 12.5105 11.3485 11.8007C10.7425 11.2246 10.1758 10.6233 9.65757 10.0075L11.1873 8.55342C11.1873 8.55342 11.1873 8.55342 11.1873 8.55341C11.7499 8.01858 11.7495 7.13408 11.1876 6.59936L11.1873 6.59907L7.80458 3.38372C7.80457 3.38371 7.80457 3.38371 7.80456 3.3837" fill="#EB5757"/>
      </svg>
    </div>
  `;
}

function $mobile3dMenuButtonsOpener(i18n) {
  return `
    <label for="js-s3d-ctr__menu-3d-buttons-mobile" class="s3d-ctr__menu-3d-buttons__mobile-opener">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-when-opened>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z" fill="#EB5757"/>
      </svg>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-when-closed>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 5C2.25 4.58579 2.58579 4.25 3 4.25H19C19.4142 4.25 19.75 4.58579 19.75 5C19.75 5.41421 19.4142 5.75 19 5.75H3C2.58579 5.75 2.25 5.41421 2.25 5ZM3 9.25C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H19C19.4142 10.75 19.75 10.4142 19.75 10C19.75 9.58579 19.4142 9.25 19 9.25H3ZM3 19.25C2.58579 19.25 2.25 19.5858 2.25 20C2.25 20.4142 2.58579 20.75 3 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H3ZM3 14.25C2.58579 14.25 2.25 14.5858 2.25 15C2.25 15.4142 2.58579 15.75 3 15.75H19C19.4142 15.75 19.75 15.4142 19.75 15C19.75 14.5858 19.4142 14.25 19 14.25H3Z" fill="#EB5757"/>
      </svg>
      <input type="checkbox" id="js-s3d-ctr__menu-3d-buttons-mobile" name="efef"/>
    </label>
  `;
}


export default function menuButtons(i18n, config) {
  return `
    <div class="s3d-ctr__menu-3d-buttons js-s3d-ctr__menu-3d-buttons">
        ${$mobile3dMenuButtonsOpener(i18n)}
        <div class="js-ctr-btn s3d-ctr__infra-button js-s3d-ctr__infra-button s3d-ctr__menu-3d-btn-style btn-style-hover">
          <span>${i18n.t('ctr.menu.btn.infrastructure')}</span>
          <label class="s3d-ctr__infra-button__select js-s3d__radio-view-change">
            <input type="checkbox" checked="false">
            <i class="s3d-ctr__infra-button__select-circle"></i>
          </label>
        </div>
        
        
        <!--<div class="js-ctr-btn s3d-ctr__filter js-s3d-ctr__filter s3d-ctr__menu-3d-btn-style btn-style-hover">
          <div class="s3d-ctr__filter__icon">
            <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="2.5" x2="26" y2="2.5"></line>
              <line y1="18.5" x2="26" y2="18.5"></line>
              <line y1="10.5" x2="26" y2="10.5"></line>
              <circle cx="20.5" cy="2.5" r="2"></circle>
              <circle cx="20.5" cy="18.5" r="2"></circle>
              <circle cx="5.5" cy="10.5" r="2"></circle>
            </svg>
          </div>
          <span class="s3d-ctr__filter__text">${i18n.t('ctr.menu.btn.filter')}</span>
        </div>-->
        <!--<div class="js-ctr-btn s3d__choose--flat js-s3d__choose--flat s3d-ctr__menu-3d-btn-style">
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
        </div>-->
        
        <!--<button class="js-ctr-btn s3d-ctr__helper js-s3d-ctr__helper s3d-ctr__menu-3d-btn-style btn-style-hover">
          <div class="s3d-ctr__helper--text">${i18n.t('ctr.menu.btn.repeatHelp')}</div>
        </button>-->
      </div>
  `;
}
