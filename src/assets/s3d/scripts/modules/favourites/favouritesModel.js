import { gsap, Power1, TimelineMax } from 'gsap';
import Card from '../templates/card/card';
import xor from 'lodash/xor';
import EventEmitter from '../eventEmitter/EventEmitter';
import dispatchTrigger from '../helpers/triggers';
import CompareItem from '../templates/CompareItem/CompareItem';
import { EmptyFavourites } from '../templates/favourites';
import { numberWithCommas } from '../../../../s3d2/scripts/helpers/helpers_s3d2';
import { BehaviorSubject } from 'rxjs';
import { isEqual } from 'lodash';
import { enableDragScroll } from '../../features/dragScroll';

class FavouritesModel extends EventEmitter {
  constructor(config, i18n) {
    super();
    this.getFlat = config.getFlat;
    this.setFlat = config.setFlat;
    this.updateFsm = config.updateFsm;
    this.history = config.history;
    this.fsm = config.fsm;
    this.animationSpeed = 1600;
    this.i18n = i18n;
    this.favouritesIds$ = config.favouritesIds$;
    this.updateFavouritesBlock = this.updateFavouritesBlock.bind(this);
    this.isShowOnlyPropertiesDifference = new BehaviorSubject(false);
    this.propertiesToShow = [
      {
        keyPath: '_price',
        title: this.i18n.t('Flat.information.price'),
        valueFormat: value => `${this.i18n.t('currency_label')} ${numberWithCommas(value)}`,
      },
      {
        keyPath: 'price_m2',
        title: this.i18n.t('Flat.information.price_m2'),
        valueFormat: value => `${this.i18n.t('currency_label')} ${numberWithCommas(value)}`,
      },
      {
        keyPath: 'sale',
        title: this.i18n.t('Flat.information.sale'),
        valueFormat: value => `${value}`,
      },
      {
        keyPath: 'area',
        title: this.i18n.t('Flat.information.area'),
        valueFormat: value => `${value} ${this.i18n.t('area_unit')}`,
      },
      {
        keyPath: 'life_room',
        title: this.i18n.t('Flat.information.life_area'),
        valueFormat: value => `${value} ${this.i18n.t('area_unit')}`,
      },
      {
        keyPath: 'rooms',
        title: this.i18n.t('Flat.information.rooms'),
      },
      {
        keyPath: 'build',
        title: this.i18n.t('Flat.information.build'),
      },
      {
        keyPath: 'floor',
        title: this.i18n.t('Flat.information.floor'),
      },
      {
        keyPath: 'number',
        title: this.i18n.t('Flat.information.number'),
      },
    ];

    this.show_prices = config.show_prices;

    if (!this.show_prices) {
      this.propertiesToShow = this.propertiesToShow.filter(
        property => property.keyPath !== '_price' && property.keyPath !== 'price_m2',
      );
    }

    document.body.addEventListener('click', event => {
      const target = event.target.closest('[data-favourites-empty-button]');
      if (!target) return;
      this.updateFsm({ type: 'plannings' });
    });

    document.body.addEventListener('change', event => {
      const target = event.target.matches('[data-compare-show-differences]');
      if (!target) return;
      console.log('target', event.target.checked);
      this.isShowOnlyPropertiesDifference.next(event.target.checked);
    });

    this.favouritesIds$.subscribe(favourites => {
      this.emit('updateFavouritesTitle', favourites.length);
      if (favourites.length <= 1) {
        this.isShowOnlyPropertiesDifference.next(false);
        document
          .querySelector('[data-compare-show-differences]')
          .setAttribute('disabled', 'disabled');
        document.querySelector('input[data-compare-show-differences]').checked = false;
      } else {
        document.querySelector('[data-compare-show-differences]').removeAttribute('disabled');
      }
    });

    this.isShowOnlyPropertiesDifference.subscribe(isShowOnlyPropertiesDifference => {
      const flats = this.favouritesIds$.value.map(id => this.getFlat(id));

      const allEqual = arr => arr.every(v => v === arr[0]);

      this.propertiesToShow = this.propertiesToShow.map(property => {
        const isEqual = allEqual([...flats.map(flat => flat[property.keyPath])]);
        return {
          ...property,
          hide: isShowOnlyPropertiesDifference && isEqual,
        };
      });

      this.updateFavouritesBlock();
    });
  }

  init(initFavourites = []) {
    this.favouritesIds$.subscribe(favourites => {
      this.emit('updateCountFavourites', favourites.length);
      this.emit('updateFavouritesInput', favourites);
      this.updateHistory({ favourites });
    });

    const favouritesStore = this.getFavourites();
    const favouritesIds = favouritesStore.length > 0 ? favouritesStore : initFavourites;
    this.favouritesIds$.next(favouritesIds);
  }

  update() {
    this.updateFavouritesBlock();
    this.emit('updateFvCount', this.favouritesIds$.value.length);
  }

  selectElementHandler(id) {
    this.updateFsm({ type: 'flat', id });
  }

  updateHistory(name) {
    if (this['history'] && this['history'].update) {
      this.history.update(name);
      return true;
    }
    return false;
  }

  removeElement(id) {
    this.emit('removeElemInPageHtml', id);
  }

  getFavourites() {
    if (!this.isSessionStorageSupported()) {
      return [];
    }

    const storage = JSON.parse(sessionStorage.getItem('favourites'));
    const result = (storage || [])
      .filter(el => !checkValue(el))
      .reduce((previous, el) => {
        if (previous.indexOf(+el) < 0) {
          previous.push(+el);
        }
        return previous;
      }, []);
    return result;
  }

  openFavouritesHandler() {
    this.updateFsm({ type: 'favourites' });
  }

  updateFavouritesBlock() {
    console.log('updateFavouritesBlock');
    this.emit(
      'clearAllHtmlTag',
      '.js-s3d-fv__list .js-s3d-card, .js-s3d-fv__list .EmptyFavourites',
    );

    // const html = this.favouritesIds$.value.map(id => Card(this.i18n, this.getFlat(id), this.favouritesIds$));
    const html =
      this.favouritesIds$.value.length > 0
        ? this.favouritesIds$.value.map(id =>
            CompareItem({
              flat: this.getFlat(id),
              i18n: this.i18n,
              id,
              propertiesToShow: this.propertiesToShow,
            }),
          )
        : [EmptyFavourites(this.i18n)];
    this.emit('setInPageHtml', html);
    const list = document.querySelector('.js-s3d-fv__list');
    if (list) enableDragScroll(list);
  }

  changeFavouritesHandler(element, isAnimate) {
    // eslint-disable-next-line radix
    const id = parseInt(element.getAttribute('data-id'));
    if (!id) return;

    const favourites = this.favouritesIds$.value;
    const updatedFavourites = xor(favourites, [id]);

    if (!this.isSessionStorageSupported()) {
      return [];
    }

    sessionStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    dispatchTrigger(
      updatedFavourites.includes(id) ? 'add-object-to-favourites' : 'delete-object-from-favourites',
      {
        url: window.location.href,
        id: id,
      },
    );

    if (isAnimate) {
      this.moveToFavouriteEffectHandler(element, !updatedFavourites.includes(id));
    }
    setTimeout(() => {
      this.favouritesIds$.next(updatedFavourites);
      if (updatedFavourites.length === 0 && this.fsm.state === 'favourites') {
        window.history.back();
      }
    }, this.animationSpeed);
  }

  // animation transition heart from/to for click
  moveToFavouriteEffectHandler(target, reverse) {
    const animatingIcon = target.querySelector('svg');

    const allIcons = document.querySelectorAll('.js-s3d__favourite-icon');
    const endPositionElement = allIcons[allIcons.length - 1];

    if (!endPositionElement) {
      console.error('Елемент .js-s3d__favourite-icon взагалі не існує в DOM!');
      return;
    }

    const distance = this.getBetweenDistance(animatingIcon, endPositionElement);
    this.animateFavouriteElement(endPositionElement, animatingIcon, distance, reverse);
  }

  getBetweenDistance(animatingIcon, endPositionElement) {
    if (!animatingIcon || !endPositionElement) return { x: 0, y: 0 };
    const animate = animatingIcon.getBoundingClientRect();
    const endAnimate = endPositionElement.getBoundingClientRect();
    const animateX = animate.left + animate.width / 2;
    const animateY = animate.top + animate.height / 2;
    const endAnimateX = endAnimate.left + endAnimate.width / 2;
    const endAnimateY = endAnimate.top + endAnimate.height / 2;
    return {
      x: endAnimateX - animateX,
      y: endAnimateY - animateY,
    };
  }

  isSessionStorageSupported() {
    try {
      var storage = window.sessionStorage;
      storage.setItem('test', 'test');
      storage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  getSpeedAnimateHeart(offsetObj) {
    return Math.abs(offsetObj.x) + Math.abs(offsetObj.y);
  }

  animateFavouriteElement(destination, element, distance, reverse) {
    if (gsap === undefined) return;
    const curElem = element.cloneNode(true);
    curElem.classList.add('s3d-favourite__pulse');
    const animatingElParams = element.getBoundingClientRect();

    document.querySelector('.js-s3d__slideModule').insertAdjacentElement('beforeend', curElem);

    curElem.style.cssText += `
			width:${animatingElParams.width}px;
			height:${animatingElParams.height}px;
			left:${animatingElParams.left}px;
			top:${animatingElParams.top}px;
			`;

    const speed = (this.animationSpeed / 1000) * (this.getSpeedAnimateHeart(distance) / 850);
    const tl = new TimelineMax({
      delay: 0,
      repeat: 0,
      paused: true,
      onComplete: () => {
        curElem.remove();
      },
    });
    if (reverse === true) {
      tl.from(curElem, { y: distance.y, duration: speed, ease: Power1.easeInOut });
      tl.from(curElem, { x: distance.x, duration: speed, ease: Power1.easeInOut }, `-=${speed}`);
    } else {
      tl.to(curElem, { y: distance.y, duration: speed, ease: Power1.easeInOut });
      tl.to(curElem, { x: distance.x, duration: speed, ease: Power1.easeInOut }, `-=${speed}`);
    }
    tl.set(curElem, { x: 0, y: 0 });
    tl.set(curElem, { clearProps: 'all' });
    tl.play();
  }
}

export default FavouritesModel;
