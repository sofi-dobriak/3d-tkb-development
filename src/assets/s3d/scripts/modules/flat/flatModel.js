import $ from 'jquery';
import { get, size } from 'lodash';
import magnificPopup from 'magnific-popup';
import addAnimateBtnTabs from '../animation';
import EventEmitter from '../eventEmitter/EventEmitter';
import { preloader } from '../general/General';
import asyncRequest from '../async/async';
import CreateFlat from '../templates/flatPage/flat';
import createFloorSvg from '../templates/floorSvg';
import getFloor from '../getFloor';
import sendError from '../sendError';
import { Swiper, Navigation } from 'swiper';
import { BehaviorSubject } from 'rxjs';
import { deviceType } from 'detect-it';
import { htmlZoom } from '../../../../s3d2/scripts/features/html-zoom';
import { isDesktop, isTablet } from '../../../../s3d2/scripts/helpers/helpers_s3d2';
import priceHistoryGraphic from '../../../../s3d2/scripts/features/flat/priceHistoryGraphic';

const ErrorCallbackUpdateLocation = (i18n, hostname, keyMessage, type = '', newLocation) => err => {
  sendError(i18n, hostname, keyMessage, type, err);
  errorPopup.setType('withTranslate');
  errorPopup.open(keyMessage, () => {
    location.href = newLocation;
  });
};
const { origin, pathname, search } = location;

class FlatModel extends EventEmitter {
  constructor(config, i18n) {
    super();
    this.type = config.type;
    this.unit_statuses = config.unit_statuses;
    this.generalWrapId = config.generalWrapId;
    this.labelsToShowInInfoBlock = config.labelsToShowInInfoBlock;
    this.activeFlat = config.activeFlat;
    this.hoverData$ = config.hoverData$;
    this.getFavourites = config.getFavourites;
    this.updateFavourites = config.updateFavourites;
    this.getFlat = config.getFlat;
    this.flatList;
    this.flatList = config.flatList;
    this.updateFsm = config.updateFsm;
    this.floorList$ = config.floorList$;
    this.i18n = i18n;
    this.history = config.history;
    this.favouritesIds$ = config.favouritesIds$;
    this.createWrap();
    this.wrapper = document.querySelector(`.js-s3d__wrapper__${this.type}`);
    this.imagesType = '';
    this.imagesViewType = '';
    this.configProject = this.createConfigProject();
    this.cacheFloor = config.cacheFloor;
    this.g_InfoBox = config.infoBox;
    this.g_currentPage$ = config.currentPage$;
    this.defaultExplicationState = {
      floor: 1,
      type: '2d',
    };
    this.projectDocs = config.projectDocs;
    this.financialTermsData = config.financialTermsData;
    this.g_constructionProgressData = config.constructionProgressData;
    this.explicationState$ = new BehaviorSubject({ ...this.defaultExplicationState });
    this.show_prices = config.show_prices;

    this.explicationState$.subscribe(state => {
      console.log(state);
      this.emit('updateExplicationFloorTitle', state);
    });
    this.explicationState$.subscribe(state => {
      const type = state.type === '2d' ? 'without' : 'with';
      // window.defaultModulePath = `/wp-content/themes/${window.nameProject}/`;
      const defaultModulePathImg = `/wp-content/themes/${window.nameProject}`;
      const imageRelativePath = get(
        this.getFlat(this.activeFlat),
        `images.[${type}].[${state.type}]`,
        '',
      );
      const image = `${defaultModulePathImg}${imageRelativePath}`;
      this.emit('updateExplicationImage', image);
    });

    this.explicationState$.subscribe(state => {
      const properties = get(this.getFlat(this.activeFlat), 'properties', {});
      const propertiesOfCurrentFloor = Object.values(properties).filter(
        prop => prop.property_level == state.floor,
      );
      this.emit('updateFloorProperties', propertiesOfCurrentFloor);
    });
    this.explicationState$.subscribe(state => {
      const isCurrentFloorHas3dImage = get(
        this.getFlat(this.activeFlat),
        `flat_levels_photo[${state.floor}].with`,
        false,
      );
      this.emit('updateExplication2d3dBtnVisibility', isCurrentFloorHas3dImage);
    });
  }

  mouseoverFlatHandler(elem) {
    const config = {
      ...elem.dataset,
      type: 'flat',
    };
    this.g_InfoBox.changeState('hover', config);
  }

  clickFlatHandler(elem) {
    const id = parseInt(elem.getAttribute('data-id'));
    switch (deviceType) {
      case 'mouseOnly':
        this.history.update({ type: 'flat', id });
        this.update(id);
        break;

      default:
        const config = {
          ...elem.dataset,
          type: 'flat',
        };
        this.g_InfoBox.changeState('hover', config);
        break;
    }
  }

  hideInfoBox() {
    this.g_InfoBox.changeState('static');
  }

  updateInfoBoxPosition(event) {
    this.g_InfoBox.updatePosition(event);
  }

  showFlatInFlyby(elem) {
    /**Если выбранно отображение этажей переключает на отображение квартир
     * при клике на "посмотреть на 3д модели"
     */
    document.querySelector('[data-choose-type="flat"]').click();
    this.updateFsm(
      {
        ...elem.dataset,
        markedFlat: elem.dataset.flatid,
      },
      true,
      {
        controlPoint: elem.dataset.controlPoint,
        flatId: elem.dataset.flatid,
      },
      () => {},
    );
  }

  createConfigProject() {
    const { build, section, floor } = this.getFlat(this.activeFlat);
    return {
      build,
      section,
      floor,
    };
  }

  init(config) {
    this.preloader = preloader;
  }

  createWrap() {
    // все 3 обертки нужны, без них на мобилке пропадает прокрутка и всё ломается
    const wrap1 = createMarkup('div', {
      class: `s3d__wrap js-s3d__wrapper__${this.type} s3d__wrapper__${this.type}`,
    }); // const wrap2 = createMarkup(conf.typeCreateBlock, { id: `js-s3d__${conf.id}` })
    $(this.generalWrapId).append(wrap1);
  }

  async update(id) {
    this.activeFlat = id;
    this.setPlaneInPage(this.activeFlat);
    this.emit('settimer', this.getFlat(this.activeFlat)['timer']);
    this.configProject = this.createConfigProject();
    this.gallerySliderInit();
    this.constructionSliderInit();
    await this.updateFloor();
    this.explicationState$.next({ ...this.defaultExplicationState });
    this.zoomFloorHandler();
    this.floorListSliderInit();
    this.priceHistoryHandler();

    setTimeout(() => {
      const btn = document.querySelector('.js-s3d__select[data-type="flat"]');
      this.preloader.turnOff(btn);
      this.preloader.hide();
    }, 600);
  }

  async updateFloor() {
    const isThisFloorCached = this.floorList$.value.some(
      floor =>
        floor.cached &&
        floor.build === this.configProject.build &&
        floor.section === this.configProject.section &&
        floor.floor === this.configProject.floor,
    );

    const floorData = isThisFloorCached
      ? this.floorList$.value.find(
          floor =>
            floor.cached &&
            floor.build === this.configProject.build &&
            floor.section === this.configProject.section &&
            floor.floor === this.configProject.floor,
        ).async_data
      : await getFloor(this.configProject);

    if (!isThisFloorCached && this.cacheFloor) {
      this.cacheFloor(this.configProject, floorData);
    }

    if (!floorData) {
      ErrorCallbackUpdateLocation(
        this.i18n,
        location.hostname,
        'Error-popup.messages.not-find-data',
        'high',
        `${origin}${pathname}${search}`,
      )({
        requestData: this.configProject,
        response: floorData,
      });
    }
    if (!floorData.url || !floorData.flatsIds) {
      ErrorCallbackUpdateLocation(
        this.i18n,
        location.hostname,
        'Error-popup.messages.not-all-required-data-received',
        'medium',
        `${origin}${pathname}${search}`,
      )({
        requestData: this.configProject,
        response: floorData,
      });
    }

    this.setFloorInPage(floorData);
    this.emit('updateActiveFlatInFloor', this.activeFlat);
  }

  preparationFlats(flatsIds) {
    return flatsIds.map(id => this.getFlat(id));
  }

  // вставляем разметку в DOM вешаем эвенты
  setPlaneInPage(flatId) {
    const flat = this.getFlat(+flatId);

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    const flatsArray = Object.values(this.flatList);
    const getFlatById = flatsArray.find(f => f.id == flatId);

    if (!getFlatById) {
      console.error(`No flat found with id ${flatId}`);
      return;
    }

    const getFlatType = getFlatById.type;

    shuffleArray(flatsArray);

    const otherTypeFlats = flatsArray.reduce((acc, val) => {
      if (val.type == getFlatType && val.id != flatId) {
        const floorExists = acc.some(flat => flat.floor === val.floor);
        if (!floorExists && acc.length < 5) {
          acc.push(val);
        }
      }
      return acc;
    }, []);

    console.log('otherTypeFlats', otherTypeFlats);

    const floorList = this.floorList$.value
      .filter(floor => {
        return floor.build == flat.build && floor.section == flat.section;
      })
      .sort((a, b) => a.floor - b.floor);

    const html = CreateFlat(
      this.i18n,
      flat,
      this.favouritesIds$,
      otherTypeFlats,
      this.labelsToShowInInfoBlock,
      this.unit_statuses,
      floorList,
      this.projectDocs,
      this.financialTermsData,
      this.g_constructionProgressData,
      this.show_prices,
    );

    this.emit('setFlat', html);
    this.checkPlaning();

    $('.js-s3d-flat__image').magnificPopup({
      type: 'image',
      showCloseBtn: true,
    });

    const is3dImageOfFlatAviable = flat.images && Object.keys(flat.images).length > 1;
    const $changeFlatImageView = document.querySelector('.js-s3d-flat__buttons-view');
    $changeFlatImageView.style.display = is3dImageOfFlatAviable ? 'flex' : 'none';

    addAnimateBtnTabs('.s3d-flat__button', '.js-s3d__btn-tab-svg');
  }

  radioTypeHandler(types) {
    const imgUrlObj = this.getFlat(this.activeFlat).images[types];
    this.imagesType = types;
    this.emit('changeClassShow', { element: '.js-s3d-flat__buttons-view', flag: false });
    const keys = Object.keys(imgUrlObj);
    if (keys.length > 1) {
      this.emit('changeClassShow', { element: '.js-s3d-flat__buttons-view', flag: true });
    }

    const radioView = document.querySelector(`.js-s3d__radio-view[data-type="${keys[0]}"]`);
    const input = radioView.querySelector('input');

    input.checked = true;
    this.radioViewHandler(keys[0]);
  }

  toFloorPlan() {
    const { build, floor, section } = this.getFlat(this.activeFlat);
    this.updateFsm({
      type: 'floor',
      build,
      floor,
      section,
    });
  }

  look3d() {
    this.updateFsm({ type: 'flyby', id: this.activeFlat });
  }

  checkPlaning() {
    this.emit('changeClassShow', { element: '.js-s3d-flat__buttons-view.show', flag: false });
    const flat = this.getFlat(this.activeFlat);
    const imagesCount = size(flat.images);
    if (imagesCount === 0) {
      this.emit('updateImg', '/assets/s3d/images/examples/no-image.png');
      return;
    }
    const keys = Object.keys(flat.images);

    this.imagesType = keys[0];
    this.imagesViewType = Object.keys(flat.images[keys[0]])[0];
    this.emit('clearRadioElement', '.js-s3d-flat__buttons-type');

    if (imagesCount > 1) {
      this.emit('createRadioSvg', '.js-s3d-flat__buttons-type');
      for (const imageKey in flat.images) {
        this.emit('createRadioElement', {
          wrap: '.js-s3d-flat__buttons-type',
          type: imageKey,
          name: 'type',
        });
      }

      const radioBtn = document.querySelector(
        `.js-s3d__radio-type[data-type=${this.imagesType}] input`,
      );
      radioBtn.checked = true;
    }

    this.radioTypeHandler(this.imagesType);
  }

  radioViewHandler(viewType) {
    this.imagesViewType = viewType;
    const obj = this.getFlat(this.activeFlat).images;
    const image = obj[this.imagesType][viewType];
    const checked = document.querySelector('.js-s3d__radio-view-change input');
    const target = document.querySelector(`.js-s3d__radio-view[data-type="${viewType}"] input`);
    target.checked = true;
    if (viewType === '2d') {
      checked.checked = false;
    } else {
      checked.checked = true;
    }
    this.emit('updateImg', image);
  }

  radioCheckedHandler(value) {
    if (value) {
      document.querySelector('.js-s3d__radio-view[data-type="3d"]').click();
    } else {
      document.querySelector('.js-s3d__radio-view[data-type="2d"]').click();
    }
  }

  setFloorInPage(response) {
    const { url = '', flatsIds = [], size: sizeImage } = response;

    const preparedFlats = this.preparationFlats(flatsIds).map(flat => {
      if (!flat) return;
      const flatId = flat.id || undefined;
      if (flatId === undefined) return { ...flat };
      if (!response.cords) return { ...flat };
      return { ...flat, sortedFromServer: response.cords ? response.cords[flat.id] : flat.sorts };
    });
    const floorSvg = createFloorSvg(this.i18n, url, preparedFlats, sizeImage, this.activeFlat);
    this.emit('removeFloorSvg');
    this.emit('setFloor', floorSvg);
    this.emit('updateFlatIdChoose', this.activeFlat);

    this.checkChangeFloor();
  }

  checkChangeFloor() {
    const {
      build: currentBuild,
      section: currentSection,
      floor: currentFloor,
    } = this.configProject;
    const listFloors = this.floorList$.value
      .filter(data => data.build === currentBuild && data.section === currentSection)
      .map(data => window.parseInt(data.floor))
      .sort(function(a, b) {
        return a - b;
      });

    const index = listFloors.indexOf(currentFloor);
    const changeFloorData = {
      prev: listFloors[index - 1] ?? null,
      next: listFloors[index + 1] ?? null,
    };
    if (index === 0) {
      changeFloorData.prev = null;
    }
    if (index === listFloors.length - 1) {
      changeFloorData.next = null;
    }
    this.changeFloorData = changeFloorData;
    this.emit('renderCurrentFloor', this.configProject);
    this.emit('renderFloorChangeButtons', this.changeFloorData);
  }

  changeFloorHandler(direction) {
    const nextFloor = this.changeFloorData[direction];
    if (nextFloor === null || undefined) return;

    this.configProject = {
      ...this.configProject,
      floor: nextFloor,
    };

    this.updateFloor();
  }
  changeFloorHandlerByNumber(number) {
    if (number === null || undefined) return;

    this.configProject = {
      ...this.configProject,
      floor: +number,
    };

    this.updateFloor();
  }

  getPdfLink() {
    // dispatchTrigger('pdf-file-download', {
    //   url,
    //   objectId: this.activeFlat,
    //   href: window.location.href,
    // });
    asyncRequest({
      url: '/wp-admin/admin-ajax.php',
      method: 'post',
      data: {
        action: 'createPdf',
        id: this.activeFlat,
      },
    })
      .then(resp => resp)
      .then(url => {
        const pdfLink = document.querySelector('.initClickPdf');
        if (pdfLink) {
          pdfLink.remove();
        }

        const newTab = '';
        document.body.insertAdjacentHTML(
          'beforebegin',
          `<a onclick="this.remove()" class="initClickPdf" target="_blank" href="${url}">
            PDF
            <style>
              .initClickPdf {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 10000;
                padding: 10px 20px;
              }
            </style>
          </a>`,
        );
        document.querySelector('.initClickPdf').click();

        // перевірка чи відкриття попапу заблоковано

        const isSafariMobile = () => {
          const userAgent = navigator.userAgent;
          return /Safari/i.test(userAgent) && /Mobile|tablet|macintosh/i.test(userAgent);
        };

        if (isSafariMobile()) {
          // User is using Safari on a mobile device
          // You can put your code specific to Safari Mobile here
          alert(`${this.i18n.t('error.pdf')}`);
          document.querySelectorAll('.initClickPdf').forEach(el => el.remove());
          document.body.insertAdjacentHTML(
            'beforebegin',
            `<a onclick="this.remove();" class="initClickPdf" target="_blank" href="${url}">
              ${this.i18n.t('error.open_pdf')}
              <style>
                .initClickPdf {
                  position: fixed;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  z-index: 10000;
                  background: #E0B900;
                  padding: 10px 20px;
  
                }
              </style>
            </a>`,
          );

          document.body.addEventListener(
            'click',
            e => {
              setTimeout(() => {
                document.querySelectorAll('.initClickPdf').forEach(el => el.remove());
              }, 2000);
            },
            { once: true },
          );
        }
      });
  }

  gallerySliderInit() {
    // data-flat-gallery-slider
    if (this.gallerySliderInstance) this.gallerySliderInstance.destroy();
    if (this.wrapper.querySelector('[data-flat-gallery-slider]')) {
      this.gallerySliderInstance = new Swiper('[data-flat-gallery-slider]', {
        modules: [Navigation],
        on: {
          slideChange: instance => {
            const currentSlide = instance.realIndex + 1;
            const $currentSlide = this.wrapper.querySelector(
              '[data-flat-gallery-swiper-current-slide]',
            );
            $currentSlide.textContent = currentSlide;
          },
        },
        slidesPerView: 1,
        loop: true,
        navigation: {
          nextEl: '[data-flat-gallery-swiper-button-next]',
          prevEl: '[data-flat-gallery-swiper-button-prev]',
        },
      });

      return;
    }
    console.log('gallerySliderInit', 'no gallery slider container found');
  }

  constructionSliderInit() {
    if (this.galleryConstructionSliderInstance) this.gallerySliderInstance.destroy();
    if (this.wrapper.querySelector('[data-flat-construction-gallery-swiper]')) {
      this.galleryConstructionSliderInstance = new Swiper(
        '[data-flat-construction-gallery-swiper]',
        {
          modules: [Navigation],
          on: {
            slideChange: instance => {
              const currentSlide = instance.realIndex + 1;
              const $currentSlide = this.wrapper.querySelector(
                '[data-flat-construction-gallery-swiper-current-slide]',
              );
              $currentSlide.textContent = currentSlide;
            },
          },
          slidesPerView: 1,
          loop: true,
          navigation: {
            nextEl: '[data-flat-construction-gallery-swiper-button-next]',
            prevEl: '[data-flat-construction-gallery-swiper-button-prev]',
          },
        },
      );

      return;
    }
    console.log('galleryConstructionSliderInit', 'no construction gallery slider container found');
  }

  changeFlatExplication(type, value) {
    const newState = {
      ...this.explicationState$.value,
      [type]: value,
    };
    if (type === 'floor') newState.type = '2d';
    this.explicationState$.next(newState);
  }

  zoomFloorHandler() {
    if (!this.scrollInitialized) {
      let elementToObserveScroll = isDesktop()
        ? this.wrapper.querySelector('.s3d-flat__content-wrapper')
        : this.wrapper;
      if (isTablet()) {
        elementToObserveScroll = this.wrapper.querySelector('.js-s3d-flat');
      }
      elementToObserveScroll.addEventListener('scroll', () => {
        if (this.floorZoom) {
          this.floorZoom.prepare();
        }
      });
      this.wrapper.addEventListener('click', evt => {
        if (evt.target.closest('[data-flat-floor-zoom-button-up]')) {
          this.floorZoom.zoomUp();
        }
        if (evt.target.closest('[data-flat-floor-zoom-button-down]')) {
          this.floorZoom.zoomDown();
        }
      });
    }
    if (this.floorZoom) this.floorZoom.destroy();
    this.floorZoom = htmlZoom(this.wrapper, '.s3d-flat__floor-info');
  }

  floorListSliderInit() {
    if (this.floorListSliderInstance) this.floorListSliderInstance.destroy();
    if (this.wrapper.querySelector('[data-flat-floor-list]')) {
      this.floorListSliderInstance = new Swiper('[data-flat-floor-list]', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
      });
    }
  }

  priceHistoryHandler() {
    if (this.priceHistoryInstance) this.priceHistoryInstance.destroy();

    const priceHistory = this.getFlat(this.activeFlat).price_history;
    if (!priceHistory || priceHistory.length === 0) {
      console.log('priceHistoryHandler', 'no price history data');
      return;
    }

    this.priceHistoryInstance = priceHistoryGraphic(
      this.getFlat(this.activeFlat).price_history.reverse(),
      this.i18n,
      'chart',
    );
  }
}

export default FlatModel;
