import MobileAccordion from './common/MobileAccordion';
import ButtonWithoutIcon from "./common/ButtonWithoutIcon";
import s3d2spriteIcon from "./spriteIcon";

export const mobile_navigation_menu_opener_selector = 'data-mobile-navigation-menu-open';
export const data_mobile_navigation_menu_selector = 'data-mobile-navigation-menu';

export default function MobileNavigationMenu(i18n, config) {

  window.addEventListener('updateFsm', ({detail}) => {
    if (/plannings|favourites|floor/.test(detail.type)) {
      return document.querySelector(`[${mobile_navigation_menu_opener_selector}] span`).textContent = i18n.t(`ctr.nav.navigation`);
    }
    if (detail.type === 'flat') {
      const flat = detail.getFlat(detail.id);
      const { floor,build,section } = flat;
      const $mobNavFloorButtons = document.querySelectorAll(`[${data_mobile_navigation_menu_selector}] [data-type="floor"]`);
      $mobNavFloorButtons.forEach(el => {
        el.dataset.floor = floor;
        el.dataset.build = build;
        el.dataset.section = section;
      })
      return document.querySelector(`[${mobile_navigation_menu_opener_selector}] span`).textContent = i18n.t(`ctr.nav.property`);
    }
    if (detail.type === 'genplan') {
      return document.querySelector(`[${mobile_navigation_menu_opener_selector}] span`).textContent = i18n.t(`ctr.nav.genplan`);
    }
    if (detail.type === 'flyby') {
      return document.querySelector(`[${mobile_navigation_menu_opener_selector}] span`).textContent = i18n.t(`ctr.nav.flyby_${detail.flyby}_${detail.side}`);
    }
  })
  return `
    <div class="MobileNavigationMenu" ${data_mobile_navigation_menu_selector}>
      <div class="MobileNavigationMenu__close" data-mobile-navigation-menu-close>
        ${s3d2spriteIcon('close', 'MobileNavigationMenu__close-icon')}
      </div>
      <div class="text-style-3-d-fonts-1920-h-2-semi-bold MobileNavigationMenu__title">
        ${i18n.t(`ctr.nav.navigation`)}
      </div>
      ${config.genplan ? ButtonWithoutIcon('js-s3d-nav__btn','data-type="genplan"',i18n.t(`ctr.nav.genplan`)) : ''}
      
      ${MobileAccordion({
        title: i18n.t(`ctr.nav.flyby`),
        innerHTML: `
          ${FlybysDropdown(i18n, config)}
        `,
      })}
      ${ButtonWithoutIcon('js-s3d-nav__btn','data-type="floor"',i18n.t(`ctr.nav.floor`))}
      ${ButtonWithoutIcon('js-s3d-nav__btn','data-type="flat"',i18n.t(`ctr.nav.flat`))}
    </div>
  `;
}

function FlybysDropdown(i18n, config) {
  const { flyby } = config;
  return Object.entries(flyby).map(([flybyKey, flyby]) => {
    return Object.entries(flyby).map(([sideKey, side]) => {
      const attributes = `data-type="flyby" data-side="${sideKey}" data-flyby="${flybyKey}"`;
      const title = i18n.t(`ctr.nav.flyby_${flybyKey}_${sideKey}`)
      return ButtonWithoutIcon('js-s3d-nav__btn',attributes,title);
    }).join('');
  }).join('');
}