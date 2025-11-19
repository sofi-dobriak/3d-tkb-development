import $favourite from '../../../../s3d/scripts/modules/templates/header/$favourite';
import ButtonIconLeft from '../common/ButtonIconLeft';
import ButtonIconRight from '../common/ButtonIconRight';
import ButtonWithoutIcon from '../common/ButtonWithoutIcon';
import IconButton from '../common/IconButton';
import navBar from './navBar';

function fullscreenMode(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}

function isFullScreenAvailable() {
  return (
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
}

export default function header_2(i18n, { logo, menuSelector }) {
  const $callback = document.documentElement.classList.contains('mobile')
    ? IconButton('', 'data-open-form', 'Phone', 'alert')
    : ButtonWithoutIcon('', 'data-open-form', i18n.t('ctr.nav.callback'), 'alert');

  document.body.addEventListener('click', e => {
    if (e.target.closest('[data-fullscreen-mode]')) {
      fullscreenMode(document.documentElement);
    }
  });

  return `
    <div class="header">
      <div class="header__left">
        ${navBar(i18n, { logo })}
      </div>
      <div class="header__right">
        <div class="lang-wrap"> <ul class="language-list">
          <li data-lang="en">
            <a href="${window.location.origin +
              '/en' +
              '/3d/' +
              window.location.search +
              window.location.hash}" >EN</a>
          </li>  
          <li data-lang="ru">
            <a href="${window.location.origin +
              '/ru' +
              '/3d/' +
              window.location.search +
              window.location.hash}" >РУ</a>
          </li>  
          <li data-lang="zh">
            <a href="${window.location.origin +
              '/zh' +
              '/3d/' +
              window.location.search +
              window.location.hash}" >中文</a>
          </li>  
          <li data-lang="he">
            <a href="${window.location.origin +
              '/he' +
              '/3d/' +
              window.location.search +
              window.location.hash}" >עִברִית</a>
          </li>
        </ul></div>
        ${IconButton('', 'data-s3d-share', 'Copy')}
        ${isFullScreenAvailable() ? IconButton('', 'data-fullscreen-mode', 'Full screen') : ''}
        <!--${IconButton('js-s3d__favourite-open', 'data-compare-go-to-page', 'Compare')}-->
        ${$favourite()}
        <!--${$callback}
        ${ButtonIconRight('', `data-open-menu ${menuSelector}`, i18n.t('ctr.nav.menu'), 'Menu')}-->
      </div>
    </div>
  `;
}
