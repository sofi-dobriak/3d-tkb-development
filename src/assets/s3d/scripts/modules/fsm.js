import $ from 'jquery';
import { has } from 'lodash';
import fsmConfig from './fsmConfig';
import SliderModel from './slider/sliderModel';
import SliderView from './slider/sliderView';
import SliderController from './slider/sliderController';
import Plannings from './plannings';
import FlatModel from './flat/flatModel';
import FlatController from './flat/flatController';
import FlatView from './flat/flatView';
import FloorModel from './floor/floorModel';
import FloorController from './floor/floorController';
import FloorView from './floor/floorView';

function fsm() {
  return {
    firstLoad: true,
    state: '',
    settings: {},
    transitions: {
      genplan(config, i18n, change, sliderData, cb) {
        if (!this[config.id]) {
          config['typeCreateBlock'] = 'canvas';
          this.emit('createWrapper', config);
          config['wrapper'] = $(`.js-s3d__wrapper__${config.id}`);
          config['wrapperSvg'] = document.querySelector(`#js-s3d__svg-${config.id}`);
          const sliderDataWithHistory = {  flatId: config.history.history.markedFlat, ...sliderData};
          const courtyardModel = new SliderModel({ ...config, sliderDataWithHistory, cbOnInit: cb}, i18n);
          const courtyardView = new SliderView(courtyardModel, {
            wrapper: config['wrapper'],
            wrapperSvg: config['wrapperSvg'] ,
            wrapperEvent: '.js-s3d__svgWrap',
          });
          const complexController = new SliderController(courtyardModel, courtyardView);
          this[config.id] = courtyardModel;
          courtyardModel.init();
          if (has(this, 'helper')) {
            this.helper.init();
          }
        } else if (change) {
          this[config.id].toSlideNum(config.flatId, config.settings.slides);
        } else {
          this[config.id].showDifferentPointWithoutRotate(config.settings.slides, config.flatId);
        }
        this.changeViewBlock(config.id);
        this.iteratingConfig();
      },
      flyby(config, i18n, change, sliderData, cb) {
        if (!this[config.id]) {
          config['typeCreateBlock'] = 'canvas';
          this.emit('createWrapper', config);
          config['wrapper'] = $(`.js-s3d__wrapper__${config.id}`);
          config['wrapperSvg'] = document.querySelector(`#js-s3d__svg-${config.id}`);
          const sliderDataWithHistory = {  flatId: config.history.history.markedFlat, ...sliderData};
          const complexModel = new SliderModel({ ...config, sliderDataWithHistory, cbOnInit: cb}, i18n);
          const complexView = new SliderView(complexModel, {
            wrapper: config['wrapper'],
            wrapperEvent: '.js-s3d__svgWrap',
            wrapperSvg: config['wrapperSvg']
          });
          const complexController = new SliderController(complexModel, complexView);
          complexModel.init(config.flatId, config.settings.slides);
          this[config.id] = complexModel;
          if (has(this, 'helper')) {
            this.helper.init();
          }
        } else if (sliderData) {
          if (sliderData.showLoader) {
          }
          const sliderDataWithHistory = {  flatId: config.history.history.markedFlat, ...sliderData};
          this[config.id].toControlPoint(sliderData.flatId, sliderDataWithHistory.controlPoint, config.history.history.markedFlat);
        } else if (change) {
          this[config.id].toSlideNum(config.flatId, config.settings.slides, config.history.history.markedFlat);
        } else {
          this[config.id].showDifferentPointWithoutRotate(config.settings.slides, config.flatId, config.history.history.markedFlat);
        }
        this.changeViewBlock(config.id);
        this.iteratingConfig();
      },
      plannings(config, i18n) {
        if (!this.plannings) {
          this.plannings = new Plannings(config, i18n);
          this.plannings.init();
        }
        if (this.filter) {
          this.filter.reduceFilter(false);
        }
        this.changeViewBlock(this.fsm.state);
        this.iteratingConfig();
      },
      flat(config, i18n) {
        if (!this.flat) {
          config['typeCreateBlock'] = 'div';
          console.log('flat Fsm', config);
          const flatModel = new FlatModel(config, i18n);
          const flatView = new FlatView(flatModel, {}, i18n);
          const flatController = new FlatController(flatModel, flatView);
          this.flat = flatModel;
          flatModel.init(config);
          const flatBtn = $('.s3d-nav__btn[data-type="flat"]');
          this.preloader.turnOff(flatBtn);
        }
        this.changeViewBlock(this.fsm.state);
        this.compass(this.flat.currentCompassDeg);
        this.iteratingConfig();
        this.flat.update(config.flatId);
        // if (this.filter) {
        //   this.filter.emit('hideFilter');
        // }
      },
      floor(config, i18n) {
        if (!this.floor) {
          config['typeCreateBlock'] = 'div';
          const floorModel = new FloorModel(config, i18n);
          const floorView = new FloorView(floorModel, {});
          const flatController = new FloorController(floorModel, floorView);
          this.floor = floorModel;
          floorModel.init(config);
          const flatBtn = $('.s3d-nav__btn[data-type="floor"]');
          this.preloader.turnOff(flatBtn);
        } else {
          this.floor.update(config.settings);
        }
        this.changeViewBlock(this.fsm.state);
        this.iteratingConfig();
      },
      favourites() {
        // if (this.fsm.firstLoad) {
        //   this.fsm.firstLoad = false;
        // }
        this.favourites.update();
        this.iteratingConfig();
        this.changeViewBlock(this.fsm.state);
        const statePreloader = this.preloader.checkState();
        if (statePreloader.showing) {
          setTimeout(() => {
            this.preloader.hide();
          }, 500);
          return;
        }
      },
    },
    dispatch(settings, self, payload, i18n, sliderData, cb) {
      if (settings.type !== this.state || +settings.flyby !== this.settings.flyby || settings.side !== this.settings.side) {
        this.state = settings.type;
        this.settings = settings;
      }
      const action = this.transitions[this.state];
      if (!action) return;
      const config = { ...payload };
      config['settings'] = settings;
      config['type'] = this.state;
      action.call(self, config, i18n, settings.change, sliderData, cb);
    },
  };
}

export { fsm, fsmConfig };