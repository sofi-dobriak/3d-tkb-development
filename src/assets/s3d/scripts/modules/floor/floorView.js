import { delegateHandler } from '../general/General';
import EventEmitter from '../eventEmitter/EventEmitter';
import tippy from 'tippy.js';
import $floorList from '../templates/floorPage/$floorList';
import { $slideFloorListWrapper, $sliderFloorList } from '../templates/floorPage/$sliderFloorList';
import Swiper from 'swiper';
import { deviceType } from 'detect-it';

class FloorView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;
    this.i18n = this._model.i18n;

    this._model.wrapper.addEventListener('click', event => {
      const polygon = delegateHandler('.s3d-flat__polygon', event);
      const floorBtn = delegateHandler('[data-floor_btn]', event);
      const floorSingleButton = delegateHandler('button[data-type="floor"]', event);
      switch (true) {
        case _.isObject(floorSingleButton):
          event.preventDefault();
          this.emit('changeFloorHandlerByDirectClick', floorSingleButton);
          break;
        case _.isObject(polygon):
          event.preventDefault();
          this.emit('clickFloorHandler', polygon);
          break;
        case _.isObject(floorBtn):
          event.preventDefault();
          this.emit('changeFloorHandler', floorBtn);
          break;
        default:
          break;
      }
    });

    // model.wrapper.addEventListener('mouseout', event => {
    //   const elem = delegateHandler('.s3d-flat__polygon', event);
    //   if (!elem) return;
    //   this.emit('updateHoverDataFlat');
    // });

    model.wrapper.addEventListener('mouseover', event => {
      if (deviceType !== 'mouseOnly') return;
      const elem = delegateHandler('.s3d-flat__polygon', event);
      const sold = !(elem?.dataset['sold'] === 'false');
      if (sold) return;
      if (!elem) return;
      this.emit('updateHoverDataFlat', elem);
    });

    model.wrapper.addEventListener('mousemove', event => {
      const elem = delegateHandler('.s3d-flat__polygon', event);
      if (!elem) {
        return this.emit('updateInfoboxPosition', false);
      }
      this.emit('updateInfoboxPosition', event);
    })

    model.on('setFloor', html => { this.setFloor(html); });
    model.on('setFloorSvg', html => { this.setFloorSvg(html); });
    model.on('removeFloorSvg', () => { this.removeFloorSvg(); });
    model.on('removeElement', tag => { this.removeElement(tag); });
    model.on('changeClassShow', elem => { this.changeClassShow(elem); });
    model.on('updateImg', data => { this.setNewImage(data); });
    model.on('clearDataFlats', () => { this.clearHoverFlats(); });
    model.on('updateHoverDataFlat', html => { this.updateHoverDataFlat(html); });
    model.on('renderFloorChangeButtons', data => { this.renderFloorChangeButtons(data); });
    model.on('renderCurrentFloor', data => { this.renderCurrentFloor(data); });
    model.on('renderFloorList', data => { this.renderFloorList(data); });
    model.on('flatRoomsFilter', data => { this.flatRoomsFilter(data); });
    model.on('bedroomsFilter', data => { this.bedroomsFilter(data); });
  }

  flatRoomsFilter({data}) {
    const list = document.querySelectorAll('.s3d-floor.js-s3d-floor .s3d-flat__polygon.js-s3d-flat__polygon ');
    const btn = document.querySelectorAll('[data-rooms]');
    btn.forEach(el => el.addEventListener('click', (event) => {
      if (event.target.tagName != 'BUTTON') return false;
      const target = event.target.dataset.rooms;
      btn.forEach(button => {
        button.classList.remove('active');
      });
      el.classList.add('active');
      list.forEach((elem) => {
        elem.classList.add('not-active');
        if (elem.classList.contains(target) || target == 'all') {
          elem.classList.remove('not-active');
        }
      });
    }));
  }

  renderFloorList({ data, active }) {
    this._model.wrapper.querySelector('.s3d-floor__nav [data-swiper-floor-list-wrapper]').innerHTML = $slideFloorListWrapper();
    this._model.wrapper.querySelector('[data-swiper-floor-list] .swiper-wrapper').innerHTML = $sliderFloorList(data, active);
    this._model.wrapper.querySelector('.s3d-floor__nav [data-floor_direction="next"]').insertAdjacentHTML('beforeend', $floorList(data, active, this.i18n));
    this._model.wrapper.querySelector('.s3d-floor__nav [data-floor_direction="prev"]').insertAdjacentHTML('beforeend', $floorList(data, active, this.i18n));

    if (!this.sliderFloorList) {
      this.sliderFloorList = new Swiper('[data-swiper-floor-list]', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        centeredSlides: true,
        initialSlide: data.findIndex(el => el.floor == active),
      })
      return;
    }

    if (this.sliderFloorList) {
      this.sliderFloorList.destroy(true);
      this.sliderFloorList = new Swiper('[data-swiper-floor-list]', {
        slidesPerView: 'auto',
        spaceBetween: 8,
        centeredSlides: true,
        initialSlide: data.findIndex(el => el.floor == active),
      })
      return;
    }
  }

  setFloor(content) {
    this._model.wrapper.innerHTML = content;
  }

  setFloorSvg(content) {
    const node = document.querySelector('.js-s3d-floor');
    node.insertAdjacentHTML('afterbegin', content);
  }

  removeFloorSvg() {
    this.removeElement('.s3d-floor__svg');
  }

  removeElement(tag) {
    const element = document.querySelector(tag);
    if (element) element.remove();
  }

  renderCurrentFloor(data) {
    const { floor } = data;
    document.querySelectorAll('[data-current-floor]').forEach( el => {
      el.setAttribute('data-value', floor);
      el.innerHTML = floor;
    })
  }

  renderFloorChangeButtons(data) {
    document.querySelectorAll('[data-floor_direction="prev"]').forEach(el => {
      el.disabled = data.prev === null;
    });
    document.querySelectorAll('[data-floor_direction="next"]').forEach(el => {
      el.disabled = data.next === null;
    });;
  }

  setNewImage(url) {
    const imgContainer = document.querySelector('.js-s3d-flat__image');
    imgContainer.setAttribute('src', defaultProjectPath + url);
    imgContainer.setAttribute('data-mfpSrc', defaultProjectPath + url);
  }

  updateHoverDataFlat(html) {}

  clearHoverFlats() {
  }

  bedroomsFilter(data) {
    console.log(data);
    this._model.wrapper.querySelectorAll('.s3d-flat__polygon').forEach(el => {
      el.classList.add('not-active');
      if (data.has(el.dataset.rooms) || data.size === 0) {
        el.classList.remove('not-active');
      }
    });
  }
}

export default FloorView;
