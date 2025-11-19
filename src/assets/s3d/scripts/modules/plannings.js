import $ from 'jquery';
import Card from './templates/card/card';
import paginationScroll from './pagination';
import { preloader } from './general/General';

class Plannings {
  constructor(config, i18n) {
    this.getFlat = config.getFlat;
    this.wrap = '.js-s3d-pl__list';
    this.wrapperNode = document.querySelector('.js-s3d-pl__list');
    this.wrapperNotFoundFlat = document.querySelector('.js-s3d-pl__not-found');
    this.infoWrapper = document.querySelector('[data-plannings-info-container]');
    this.activeFlat = config.activeFlat;
    this.currentFilteredFlatIds$ = config.currentFilteredFlatIds$;
    this.currentFilteredFlatIdsAviableStatus$ = config.currentFilteredFlatIdsAviableStatus$;
    this.defaultShowingFlats = config.currentFilteredFlatIds$.value;
    this.currentShowAmount = 0;
    this.showFlatList = [];
    this.updateFsm = config.updateFsm;
    this.i18n = i18n;
    this.favouritesIds$ = config.favouritesIds$;
    this.preloader = preloader;
    this.show_prices = config.show_prices;
  }

  init() {
    this.subscribeFilterFlat();
    setTimeout(() => {
      this.preloader.hide();
    }, 600);

    $('.js-s3d-pl__list').on('click', '.js-s3d-card', event => {
      if (event.target.closest('.js-s3d-add__favourite')) {
        return;
      }
      const id = $(event.currentTarget).data('id');
      this.activeFlat = id;
      this.updateFsm({ type: 'flat', id });
    });

    this.wrapperNode.addEventListener('scroll', event => {
      paginationScroll(event.target, this.showFlatList, this.currentShowAmount, this.createListCard.bind(this));
    });
  }

  visibleAvailableContainer(isShowing = false) {
    this.wrapperNotFoundFlat.style.display = isShowing ? '' : 'none';
  }

  subscribeFilterFlat() {
    this.currentFilteredFlatIdsAviableStatus$.subscribe(flats => {
      this.infoWrapper.classList.add('pending');
      setTimeout(() => {
        this.wrapperNode.scrollTop = 0;
        this.wrapperNode.textContent = '';
        this.currentShowAmount = 0;
        this.updateShowFlat(flats);
        this.visibleAvailableContainer(false);
        if (flats.length === 0) {
          const randomFlats = this.selectRandomAvailableFlats(4);
          this.visibleAvailableContainer(true);
          this.createListCard(randomFlats, this.wrapperNode, 1);
          paginationScroll(this.wrapperNode, randomFlats, this.currentShowAmount, this.createListCard.bind(this));
          setTimeout(() => {
            this.infoWrapper.classList.remove('pending');
          }, 1000);
          return;
        }
        this.createListCard(flats, this.wrapperNode, 12);
        paginationScroll(this.wrapperNode, flats, this.currentShowAmount, this.createListCard.bind(this));
      }, 150);
      setTimeout(() => {
        this.infoWrapper.classList.remove('pending');
      }, 1000);
    });
  }

  updateShowFlat(list) {
    this.showFlatList = list;
  }

  createListCard(flats, wrap, amount) {
    flats.forEach((id, index) => {
      if (index >= this.currentShowAmount && index < (this.currentShowAmount + amount)) {
        wrap.insertAdjacentHTML('beforeend', Card(this.i18n, this.getFlat(id), this.favouritesIds$, this.show_prices));
      }
    });
    this.currentShowAmount += amount;
  }

  selectRandomAvailableFlats(count = 4) {
    let selectedFlatsCount = 0;
    const selectedFlats = this.defaultShowingFlats.filter(flatId => {
      const flat = this.getFlat(flatId);
      if (flat.sale !== 1 || selectedFlatsCount >= count) return false;
      selectedFlatsCount += 1;
      return true;
    });
    return selectedFlats;
  }
}

export default Plannings;
