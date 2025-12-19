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

function exitFullscreenMode(element) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen();
  } else if (element.msExitFullscreen) {
    element.msExitFullscreen();
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
    if (!e.target.closest('[data-fullscreen-mode]')) return;
    if (e.target.closest('[data-fullscreen-mode]') && !document.fullscreenElement) {
      fullscreenMode(document.documentElement);
    } else {
      exitFullscreenMode(document);
    }
    console.log('document.fullscreenElement', document.fullscreenElement);
  });

  document.addEventListener('fullscreenchange', () => {
    document.querySelectorAll('[data-fullscreen-mode]').forEach(el => {
      el.classList.toggle('fullscreen', document.fullscreenElement);
    });
  });

  document.body.addEventListener('click', e => {
    if (e.target.closest('[data-fullscreen-mode-off]') && document.fullscreenElement) {
      exitFullscreenMode(document);
    }
  });

  setTimeout(() => {
    document.querySelectorAll('.language-list li').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const lang = e.currentTarget.getAttribute('data-lang');
        window.location.href = `${window.location.origin}/${lang}/3d/${window.location.search}${window.location.hash}`;
      });
    });
  }, 100);

  return `
    <div class="header">
      <div class="header__left">
        ${navBar(i18n, { logo })}
      </div>
      <div class="header__right">
        <div class="lang-wrap">
          <ul class="language-list">
            <li data-lang="en">
              <a href="#">EN</a>
            </li>
            <li data-lang="ru">
              <a href="#">РУ</a>
            </li>
            <li data-lang="zh">
              <a href="#">中文</a>
            </li>
            <li data-lang="he">
              <a href="#">עִברִית</a>
            </li>
            <li data-lang="vi">
              <a href="#">VI</a>
            </li>
          </ul>
        </div>
        ${IconButton('', 'data-s3d-share', 'Copy')}
        ${isFullScreenAvailable() ? IconButton('', 'data-fullscreen-mode', 'Full screen') : ''}
        ${
          isFullScreenAvailable()
            ? IconButton('', 'data-fullscreen-mode-off', 'Cancel full screen')
            : ''
        }
        <!--${IconButton('js-s3d__favourite-open', 'data-compare-go-to-page', 'Compare')}-->
        ${$favourite()}
        <!--${$callback}
        ${ButtonIconRight('', `data-open-menu ${menuSelector}`, i18n.t('ctr.nav.menu'), 'Menu')}-->
      </div>
    </div>
  `;
}
