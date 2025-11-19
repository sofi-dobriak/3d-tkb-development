export default function $checkboxes(i18n) {
  return `
    <div class="s3d-filter__checkboxes-wrapper js-s3d-filter__checkboxes">
      <div class="s3d-filter__param">
        <div class="s3d-filter__param-title">${i18n.t('Filter.checkboxes.rooms')}</div>
        <div class="s3d-filter__checkbox__row">
          <div class="s3d-filter__checkbox">
            <input type="checkbox" data-type="rooms" data-rooms="1" id="rooms-1">
            <label class="s3d-filter__checkbox--label" for="rooms-1">1</label>
          </div>
          <div class="s3d-filter__checkbox">
            <input type="checkbox" data-type="rooms" data-rooms="2" id="rooms-2">
            <label class="s3d-filter__checkbox--label" for="rooms-2">2</label>
          </div>
          <div class="s3d-filter__checkbox">
            <input type="checkbox" data-type="rooms" data-rooms="3" id="rooms-3">
            <label class="s3d-filter__checkbox--label" for="rooms-3">3</label>
          </div>
        </div>
      </div>
    </div>
  `;
}
