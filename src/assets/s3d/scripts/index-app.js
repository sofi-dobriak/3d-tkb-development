import $ from 'jquery';
import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import { get, isObject } from 'lodash';
import ScrollTrigger from 'gsap/ScrollTrigger';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import device from 'current-device';
import language from '../../../static/language/index';
import { isDevice } from './modules/checkDevice';
import CreateMarkup from './modules/markup';
import AppController from './modules/app/app.controller';
import AppModel from './modules/app/app.model';
import AppView from './modules/app/app.view';
import Controller from './modules/templates/controller/controller';
import Plannings from './modules/templates/planningsPage/plannings';
import Favourites from './modules/templates/favourites';
import Filter from './modules/templates/filter/filter';
import defaultConfig from '../../../static/settings.json';
import Catcher from './modules/catchers';
import {
  AppContentError,
  AppError,
  AppFloorContentError,
  AppNetworkError,
  AppUrlError,
  NetworkError,
} from './modules/errors';
import ErrorPopup from './modules/errorPopup';
import sendError from './modules/sendError';
import { themeFactory } from './modules/templates/controller/$theme';
import percentLoader from './modules/templates/loaders/percentLoader';
import loader from './modules/templates/loaders/loader';
import './modules/templates/loaders/loader-animation';
import header from './modules/templates/header/header';

import header_2 from '../../s3d2/scripts/templates/header/header_2';
import menu from './modules/templates/header/menu';
import './modules/templates/header/header-animation';
import dispatchTrigger from './modules/helpers/triggers';
import { deviceType } from 'detect-it';
import { detect } from 'detect-browser';
import FlybyController from '../../s3d2/scripts/templates/FlybyController';

const browser = detect();

document.documentElement.classList.add(deviceType);

{
  if (
    window.screen.height === 1366 &&
    window.screen.width === 1024 &&
    /Macintosh/.test(window.navigator.userAgent)
  ) {
    document.documentElement.classList.add('tablet');
    document.documentElement.classList.remove('desktop');
  }
  if (
    window.screen.width === 1366 &&
    window.screen.height === 1024 &&
    /Macintosh/.test(window.navigator.userAgent)
  ) {
    document.documentElement.classList.add('tablet');
    document.documentElement.classList.remove('desktop');
  }
}

{
  const ipadProDetectExpression = /OS X|OSX/i;
  const biggerSide = Math.max.apply(null, [window.innerWidth, window.innerHeight]);
  if (
    biggerSide < 1380 &&
    biggerSide > 1024 &&
    document.documentElement.classList.contains('desktop') &&
    window.navigator.userAgent.match(ipadProDetectExpression)
  ) {
    document.documentElement.classList.remove('desktop');
    document.documentElement.classList.add('tablet');
  }
}

Object.values(browser).forEach(el => document.documentElement.classList.add(el.replace(/ /g, '')));

document.addEventListener('DOMContentLoaded', global => {
  init();
});

window.nameProject = '3d';

window.defaultProjectPath = `/wp-content/themes/${window.nameProject}`;
window.defaultModulePath = `/wp-content/themes/${window.nameProject}/assets/s3d`;
window.defaultStaticPath = `/wp-content/themes/${window.nameProject}/static`;
window.status =
  location.hostname.match(/localhost/) || document.documentElement.dataset.mode === 'local'
    ? 'local'
    : 'dev';

global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
global.axios = axios;

const createHtml = (i18n, config) => {
  const controllerNode = Controller(i18n, config, FlybyController(i18n));
  const planningsNode = Plannings(i18n);
  const favouritesNode = Favourites(i18n, 0);
  const filterNode = Filter(i18n, config.filter.checkboxes);
  const moduleContainer = document.querySelector('.js-s3d__slideModule');
  moduleContainer.insertAdjacentHTML(
    'afterbegin',
    [controllerNode, planningsNode, favouritesNode, filterNode].join(''),
  );
  document.body.insertAdjacentHTML('beforeend', loader(get(config, 'header.logo', null)));
  document.body.insertAdjacentHTML('beforeend', percentLoader(i18n));
  document.body.insertAdjacentHTML('beforeend', header(i18n));
  document.body.insertAdjacentHTML('beforeend', menu(i18n));

  document.body.insertAdjacentHTML('beforeend', header(i18n));
  document.body.insertAdjacentHTML(
    'beforeend',
    header_2(i18n, {
      logo: get(config, 'header.logo', null),
      menuSelector: get(config, 'header.menu_selector', ''),
    }),
  );
};

async function init() {
  let Config = defaultConfig;

  try {
    const serverConfig = await axios.get(`${window.defaultModulePath}/settings.json`);
    if (isObject(serverConfig.data)) {
      Config = serverConfig.data;
      window.externalS3dSettings = Config;
      console.error(
        `Loaded configuration from "${window.defaultModulePath}/settings.json", instead of default settings.json fron gh repository.`,
      );
    }
  } catch (error) {
    console.log(error);
  }

  const i18Instance = i18next.createInstance();
  window.createMarkup = CreateMarkup;

  const lang = document.querySelector('html').lang || 'en';
  window.errorPopup = ErrorPopup(i18Instance);
  const callback = (i18n, hostname, keyMessage, type = '') => err => {
    sendError(i18n, hostname, keyMessage, type, {
      ...err,
      data: encodeURIComponent(
        err.stack
          .toString()
          .split('')
          .slice(0, 400)
          .join('')
          .replace(/'|"/g, ''),
      ),
    });
    errorPopup.setType('withoutTranslate');
    errorPopup.open(keyMessage);
  };
  const lowErrorCallback = (i18n, hostname, keyMessage, type = '') => err => {
    sendError(i18n, hostname, keyMessage, type, err);
    errorPopup.setType('withTranslate');
    errorPopup.open(keyMessage, location.reload);
  };
  const ErrorCallbackUpdateLocation = (
    i18n,
    hostname,
    keyMessage,
    type = '',
    newLocation,
  ) => err => {
    sendError(i18n, hostname, keyMessage, type, err);
    errorPopup.setType('withTranslate');
    errorPopup.open(keyMessage, () => {
      location.href = newLocation;
    });
  };
  const { host, pathname, search } = location;
  const catcherHandlers = [
    {
      instance: AppContentError,
      callback: callback(i18Instance, location.href, 'Error-popup.messages.not-find-data', 'high'),
    },
    {
      instance: AppFloorContentError,
      callback: ErrorCallbackUpdateLocation(
        i18Instance,
        location.href,
        'Error-popup.messages.not-all-required-data-received',
        'medium',
        `${host}/${pathname}${search}`,
      ),
    },
    {
      instance: AppUrlError,
      callback: ErrorCallbackUpdateLocation(
        i18Instance,
        location.href,
        'Error-popup.messages.invalid-url',
        'low',
        `${host}/${pathname}`,
      ),
    },
    {
      instance: AppNetworkError,
      callback: callback(i18Instance, location.href, 'Error-popup.messages.failed-request', 'high'),
    },
    {
      instance: NetworkError,
      callback: lowErrorCallback(
        i18Instance,
        location.href,
        'Error-popup.messages.network-error',
        'low',
      ),
    },
    {
      instance: AppError,
      callback: callback(
        i18Instance,
        location.href,
        'Error-popup.messages.application-error',
        'middle',
      ),
    },
    {
      instance: Error,
      callback: callback(
        i18Instance,
        location.href,
        'Error-popup.messages.unknown-error',
        'middle',
      ),
    },
  ];
  const catcher = Catcher(catcherHandlers);
  window.addEventListener('resize', setVh);

  function setVh() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    const html = document.documentElement;
    if (html.classList.contains('ios') && window.innerHeight < window.innerWidth) {
      html.classList.remove('portrait');
      html.classList.add('landscape');
    }
    if (html.classList.contains('ios') && window.innerHeight > window.innerWidth) {
      html.classList.add('portrait');
      html.classList.remove('landscape');
    }
    html.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  window.setVh = setVh;

  try {
    setVh();
    if (isDevice('mobile') || document.documentElement.offsetWidth <= 768) {
      document.querySelector('.js-s3d__slideModule').classList.add('s3d-mobile');
    }
    await i18Instance
      // .use(intervalPlural)
      .init({
        lng: lang,
        debug: window.status === 'local',
        resources: {
          ...language,
          [lang]: {
            translation: {
              ...language[lang].translation,
              currency_label: Config.currency_label
                ? Config.currency_label
                : language[lang].translation['currency_label'],
            },
          },
        },
        compatibilityJSON: 'v4',
      });
    createHtml(i18Instance, Config);

    const app = new AppModel(Config, i18Instance);
    const appView = new AppView(app, {
      wrapper: $('.js-s3d__slideModule'),
    });
    const appController = new AppController(app, appView);
    await app.init();
  } catch (error) {
    catcher(error);
    console.log(error);
    dispatchTrigger('module-error', {
      error,
      date: new Date().toLocaleString(),
      ...browser,
      orientation: device.orientation,
      type: device.type,
    });
  }
}

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'S') {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const href = link.getAttribute('href');
      link.setAttribute('href', href);
    }
  }
});

window.checkValue = val =>
  !val || val === null || val === undefined || (typeof val === 'number' && isNaN(val));
