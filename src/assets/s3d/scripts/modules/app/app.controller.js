import { debounce } from '../general/General';

class AppController {
  deb = debounce(() => this.resize(), 300);

  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('chooseSlider', target => this._model.selectSlideHandler(target));
    view.on('resize', () => this.deb());
    // view.on('clickBackHandler', () => {
    //   window.history.back();
    // });
    view.on('chooseHandler', type => {
      this._model.changeChooseActive(type);
    });
    view.on('clickToHomeHandler', () => {
      this._model.history.update(model.defaultFlybySettings);
      model.updateFsm(model.defaultFlybySettings);
    });
  }

  resize() {
    this._model.iteratingConfig();
  }
}

export default AppController;
