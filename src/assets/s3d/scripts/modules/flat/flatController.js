class FlatController {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('changeFloorHandler', event => {
      const direction = event.getAttribute('data-floor_direction');
      this._model.changeFloorHandler(direction);
    });
    view.on('changeFloorHandlerByNumber', event => {
      const nextFloor = event.getAttribute('data-floor');
      this._model.changeFloorHandlerByNumber(nextFloor);
    });
    view.on('updateInfoBoxPosition', event => {
      this._model.updateInfoBoxPosition(event);
    });
    view.on('hideInfoBox', event => {
      this._model.hideInfoBox(event);
    });

    view.on('goToFlat', id => {
      this._model.history.update({ type: 'flat', id });
      this._model.update(id);
    });
    view.on('clickFlatHandler', elem => {
      const id = parseInt(elem.getAttribute('data-id'));
      if (!id) return;
      this._model.clickFlatHandler(elem);
    });
    view.on('mouseoverFlatHandler', elem => {
      const id = parseInt(elem.getAttribute('data-id'));
      if (!id) return;
      this._model.mouseoverFlatHandler(elem);
    });
    view.on('changeFlatExplication', ({ type, value }) => {
      this._model.changeFlatExplication(type, value);
    });
    view.on('toFloorPlan', () => {
      this._model.toFloorPlan();
    });
    view.on('look3d', () => {
      this._model.look3d();
    });
    view.on('changeRadioType', elem => {
      const type = elem.getAttribute('data-type');
      if (!type) return;
      this._model.radioTypeHandler(type);
    });
    view.on('changeRadioView', elem => {
      const type = elem.getAttribute('data-type');
      if (!type) return;
      this._model.radioViewHandler(type);
    });
    view.on('changeRadioChecked', event => {
      this._model.radioCheckedHandler(event.control.checked);
    });
    // view.on('updateHoverDataFlat', event => {
    //   this._model.updateMiniInfo(event);
    // });

    view.on('clickPdfHandler', elem => {
      this._model.getPdfLink();
    });
    view.on('showFlatInFlyby', elem => {
      this._model.showFlatInFlyby(elem);
    });
  }
}

export default FlatController;
