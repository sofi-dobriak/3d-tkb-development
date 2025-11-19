import { deviceType } from "detect-it";

class FloorController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('changeFloorHandler', event => {
      const direction = event.getAttribute('data-floor_direction');
      this._model.changeFloorHandler(direction);
      this._model.history.update({ type: 'floor', ...this._model.configProject });
    });
    view.on('changeFloorHandlerByDirectClick', button => {
      const transferClickDataToNumbers = Object.entries({ ...button.dataset }).reduce(( acc, el ) => {
        acc[el[0]] =  Number.isNaN(+el[1]) ? el[1] : +el[1];
        return acc;
      }, {})
      this._model.history.update(transferClickDataToNumbers);
      this._model.update(transferClickDataToNumbers);
    });
    view.on('clickFloorHandler', polygon => {
      if (deviceType === 'mouseOnly') {
        const id = polygon.getAttribute('data-id');

        this._model.selectFlat(id);
        return;
      }
      this._model.touchPolygonMobileHandler(polygon);
    });
    
    view.on('updateHoverDataFlat', event => {
      this._model.touchPolygonMobileHandler(event);
    });

    view.on('updateInfoboxPosition', (event) => {
      if (deviceType !== 'mouseOnly') return;
      if (!event) {
        return this._model.updateInfoboxPosition(false);
      }
      this._model.updateInfoboxPosition(event);
    });

    view.on('bedroomsFilter', event => {
      this._model.bedroomsFilter(event);
    });
  }
}

export default FloorController;
