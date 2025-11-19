import $ from 'jquery';
import { has, debounce, get } from 'lodash';
import tippy from 'tippy.js';
import paginationScroll from './pagination';
import sortArray from './sort';
import Card from './templates/card/card';
import s3d2spriteIcon from '../../../s3d2/scripts/templates/spriteIcon';
import { numberWithCommas } from '../../../s3d2/scripts/helpers/helpers_s3d2';

class FlatsList {
  constructor(config, filter) {
    // this.subject = config.subject;
    this.hoverData$ = config.hoverData$;
    this.currentFilteredFlatIds$ = config.currentFilteredFlatIds$;
    this.currentFilteredFlatIdsAviableStatus$ = config.currentFilteredFlatIdsAviableStatus$;
    // this.updateCurrentFilterFlatsId = config.updateCurrentFilterFlatsId;
    this.getFlat = config.getFlat;
    this.checkNextFlyby = config.checkNextFlyby;
    this.changePopupFlyby = config.changePopupFlyby;
    this.currentShowAmount = 0;
    this.showFlatList = [];
    // this.wrapperNode = document.querySelector('.js-s3d-filter__table');
    this.updateFsm = config.updateFsm;
    // this.filterHide = false;
    // this.nameSort = undefined;
    this.directionSortUp = true;
    this.filter = filter;
    this.favouritesIds$ = config.favouritesIds$;
    this.i18n = config.i18n;
    this.history = config.history;
    this.typeSelectedFlyby$ = config.typeSelectedFlyby$;
    this.unit_statuses = config.unit_statuses || {};
    this.show_prices = filter.show_prices;
    this.init();
  }

  init() {
    const filterContainer = document.querySelector('.js-s3d-filter');
    const tableContainer = document.querySelector('.js-s3d-filter__table');
    const bodyContainer = document.querySelector('.js-s3d-filter__body');

    this.currentFilteredFlatIdsAviableStatus$.subscribe(value => {
      tableContainer.scrollTop = 0;
      bodyContainer.textContent = '';
      this.currentShowAmount = 0;
      this.updateShowFlat(value);
      this.createListFlat(value, bodyContainer, 30);
    });

    this.hoverData$.subscribe(data => {
      const { id } = data;
      if (!id) return;
      this.setActiveFlat(id);
    });

    tableContainer.addEventListener(
      'scroll',
      debounce(
        event => {
          if (this.filter.isListScrollBlocked) return;
          paginationScroll(
            event.target,
            this.showFlatList,
            this.currentShowAmount,
            this.createListFlat.bind(this),
          );
        },
        150,
        {
          leading: true,
          trailing: true,
        },
      ),
    );

    $('.js-s3d-filter__body').on('click', '.s3d-filter__tr', event => {
      const id = +event.currentTarget.dataset.id;
      if (
        $(event.originalEvent.target).hasClass('js-s3d-add__favourite') ||
        event.originalEvent.target.nodeName === 'INPUT'
      ) {
        return;
      }

      if (event.target.closest('.js-s3d-add__favourite') !== null) return;
      switch (this.typeSelectedFlyby$.value) {
        case 'flat':
          this.showFlatOnFlyby(event, id);
          break;
        case 'floor':
          this.showFloorWhereFlatIsSpecified(event, id);
          break;
        default:
          break;
      }

      return;
      /**Старый вариант перехода для подсветки квартиры (пока не удалять) */
      const config = this.checkNextFlyby({ type: 'flyby' }, id);
      if (config === null) {
        return null;
      }
      if (config.change) {
        this.changePopupFlyby(config, event.currentTarget);
        return;
      }
      event.currentTarget.classList.add('active');
      if (window.innerWidth <= 992) {
        this.filter.emit('hideFilter');
      }
      this.updateFsm({ ...config, id });
    });

    $('.js-s3d-filter__head').on('click', '.s3d-filter__th', e => {
      const nameSort =
        e.currentTarget && e.currentTarget.dataset && has(e.currentTarget.dataset, 'sort')
          ? e.currentTarget.dataset.sort
          : undefined;
      if (nameSort === undefined || (nameSort && nameSort === 'none')) {
        return;
      }
      if (e.currentTarget.classList.contains('s3d-sort-active')) {
        this.directionSortUp = !this.directionSortUp;
      } else {
        this.directionSortUp = true;
      }
      $('.s3d-sort-active').removeClass('s3d-sort-active');
      if (this.directionSortUp) {
        $(e.currentTarget).addClass('s3d-sort-active');
      }

      this.currentFilteredFlatIdsAviableStatus$.next(
        sortArray(this.showFlatList, nameSort, this.getFlat, this.directionSortUp),
      );
    });
  }

  showFloorWhereFlatIsSpecified(event, id) {
    const flatFlybys = this.getFlat(id).specifiedFloorFlybys || [];
    const flybyWithSameControlPoint = flatFlybys.find(el => {
      const { flyby, side, controlPoint } = this.history.history;
      return el.flyby == flyby && el.side == side && el.controlPoint == controlPoint;
    });
    const flybyWithDifferentControlPoint = flatFlybys.find(el => {
      const { flyby, side, controlPoint } = this.history.history;
      return el.flyby == flyby && el.side == side;
    });
    /**Квартира не найдена ни в одном облете */
    if (!flatFlybys || flatFlybys.length === 0) {
      const message = tippy(event.currentTarget, {
        content: this.i18n.t('Filter.not-marked-message'),
        placement: 'right',
        trigger: 'click',
        theme: 'tomato',
        showOnCreate: true,
        onHidden: a => {
          a.destroy();
        },
        onCreate: a => {
          a.popper.classList.add('flat-not-marked-message');
        },
      });

      return;
    }
    if (flybyWithSameControlPoint) {
      this.updateFsm({ ...flybyWithSameControlPoint, type: 'flyby', markedFlat: id }, true, {
        ...flybyWithSameControlPoint,
        showLoader: false,
        flatId: id,
      });
      return;
    }
    if (flybyWithDifferentControlPoint) {
      this.updateFsm({ ...flybyWithDifferentControlPoint, type: 'flyby', markedFlat: id }, true, {
        ...flybyWithDifferentControlPoint,
        showLoader: false,
        flatId: id,
      });
      return;
    }
    if (flatFlybys[0]) {
      this.changePopupFlyby(
        { ...flatFlybys[0], type: 'flyby', markedFlat: id },
        event.currentTarget,
      );
      // this.updateFsm({ ...flatFlybys[0], type: 'flyby', markedFlat: id }, true, {
      //   ...flatFlybys[0],
      //   showLoader: true,
      //   flatId: id
      // })
    }
  }

  showFlatOnFlyby(event, id) {
    const flatFlybys = this.getFlat(id).specifiedFlybys || [];
    const flybyWithSameControlPoint = flatFlybys.find(el => {
      const { flyby, side, controlPoint } = this.history.history;
      return el.flyby == flyby && el.side == side && el.controlPoint == controlPoint;
    });
    const flybyWithDifferentControlPoint = flatFlybys.find(el => {
      const { flyby, side, controlPoint } = this.history.history;
      return el.flyby == flyby && el.side == side;
    });
    /**Квартира не найдена ни в одном облете */
    if (!flatFlybys || flatFlybys.length === 0) {
      const message = tippy(event.currentTarget, {
        content: this.i18n.t('Filter.not-marked-message'),
        placement: 'right',
        trigger: 'click',
        theme: 'tomato',
        showOnCreate: true,
        onHidden: a => {
          a.destroy();
        },
        onCreate: a => {
          a.popper.classList.add('flat-not-marked-message');
        },
      });

      return;
    }
    if (flybyWithSameControlPoint) {
      this.updateFsm({ ...flybyWithSameControlPoint, type: 'flyby', markedFlat: id }, true, {
        ...flybyWithSameControlPoint,
        showLoader: false,
        flatId: id,
      });
      return;
    }
    if (flybyWithDifferentControlPoint) {
      this.updateFsm({ ...flybyWithDifferentControlPoint, type: 'flyby', markedFlat: id }, true, {
        ...flybyWithDifferentControlPoint,
        showLoader: false,
        flatId: id,
      });
      return;
    }
    if (flatFlybys[0]) {
      this.changePopupFlyby(
        { ...flatFlybys[0], type: 'flyby', markedFlat: id },
        event.currentTarget,
      );
      // this.updateFsm({ ...flatFlybys[0], type: 'flyby', markedFlat: id }, true, {
      //   ...flatFlybys[0],
      //   showLoader: true,
      //   flatId: id
      // })
    }
  }

  setActiveFlat(id) {
    $('.js-s3d-filter__body .polygon__flat-svg').removeClass('polygon__flat-svg');
    $(`.js-s3d-filter__body [data-id=${id}]`).addClass('polygon__flat-svg');
  }

  updateShowFlat(list) {
    this.showFlatList = list;
  }

  createListFlat(flats, wrap, amount) {
    const favourites = this.favouritesIds$.value;
    const arr = flats.reduce((previous, current, index) => {
      if (index >= this.currentShowAmount && index < this.currentShowAmount + amount) {
        previous.push(this.createElem(this.getFlat(+current), favourites));
      }
      return previous;
    }, []);

    this.currentShowAmount += amount;
    document.querySelector('.js-s3d-filter__body').dataset.viewType = this.filter.viewType;
    if (this.filter.viewType === 'card') {
      document.querySelector('.js-s3d-filter__body').insertAdjacentHTML('afterbegin', arr.join(''));
    } else {
      document.querySelector('.js-s3d-filter__body').append(...arr);
    }

    const { id } = this.hoverData$.value;
    if (!id) return;
    this.setActiveFlat(id);
  }

  createElem(flat, favourites) {
    const checked = favourites.includes(+flat.id) ? 'checked' : '';
    const tr = document.createElement('tr');
    const imageDefault = `${window.defaultModulePath}/images/examples/no-image.png`;
    const { rooms, area, floor, type, price, sale, price_m2, img_small: src, id } = flat;
    tr.dataset.id = flat.id;
    tr.classList = 's3d-filter__tr js-s3d-filter__tr';
    tr.addEventListener('mouseenter', function(evt) {
      document
        .querySelectorAll(`.s3d__svg__active polygon[data-type="flat"][data-id="${flat.id}"]`)
        .forEach(el => {
          el.classList.add('preview');
        });
    });
    tr.addEventListener('mouseleave', function(evt) {
      document
        .querySelectorAll(`.s3d__svg__active polygon[data-type="flat"][data-id="${flat.id}"]`)
        .forEach(el => {
          el.classList.remove('preview');
        });
    });

    const unitStatus = get(this.unit_statuses, sale, {});

    tr.innerHTML = `
          <td class="s3d-filter__th--offset"></td>
					<td class="s3d-filter__td">${floor || '-'}</td>
					<td class="s3d-filter__td">${rooms}</td>
					<td class="s3d-filter__td">${area}</td>
					${this.show_prices ? `<td class="s3d-filter__td">${numberWithCommas(price)}</td>` : ''}
					<!--${this.show_prices ? `<td class="s3d-filter__td">${numberWithCommas(price_m2)}</td>` : ''}-->
					<td class="s3d-filter__td">
            <div class="s3d-filter__td-status-label" style="background-color: ${
              unitStatus.background
            }">
            </div>
          </td>
					<td class="s3d-filter__td">
						<label data-id="${id}" class="s3d__favourite s3d-filter__favourite js-s3d-add__favourite">
							<input type="checkbox" ${checked}>
              ${s3d2spriteIcon('Compare')}
						</label>
					</td>
					<td class="s3d-filter__th--offset"></td>
			`;
    if (this.filter.viewType === 'card') {
      return `
        ${Card(this.i18n, flat, this.favouritesIds$, this.show_prices)}
      `;
    }
    return tr;
  }
}

export default FlatsList;
