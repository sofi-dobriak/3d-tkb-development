import smarto from "../$smarto-logo";

function menu(i18n) {
  return `
    <div class="menu-wrap" data-menu data-disable-page-scroll>
      <div class="menu-header">
        <div class="menu-header-title">${i18n.t('menu.menu-title')}</div>
        <div class="menu-header-close" data-menu-close>
          <div class="menu-header-close-elem-wrapper">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="menu-nav-wrap">
        <div class="menu-nav">
          <ul>
            <li class="menu-nav-link"><a href="#">${i18n.t('menu.nav.1.nav-title')}</a></li>
            <li class="menu-nav-link">${i18n.t('menu.nav.2.nav-title')}
              <ul class="menu-nav-link2-wrap">
                <li class="menu-nav-link2"><a href="#">${i18n.t('menu.nav.2.nav-subtitle.1')}</a></li>
                <li class="menu-nav-link2"><a href="#">${i18n.t('menu.nav.2.nav-subtitle.2')}</a></li>
                <li class="menu-nav-link2"><a href="#">${i18n.t('menu.nav.2.nav-subtitle.3')}</a></li>
                 <li class="menu-nav-link2"><a href="#">${i18n.t('menu.nav.2.nav-subtitle.4')}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      ${smarto()}
    </div>
  `;
}

export default menu;
