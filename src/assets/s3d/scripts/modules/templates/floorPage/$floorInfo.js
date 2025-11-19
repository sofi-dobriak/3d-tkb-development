function infoFloor(i18n, floor) {
  return `
     <div class="s3d-floor__info-container">
        <p class="s3d-floor__info-container__title text-style-3-d-fonts-1920-body-bold">${i18n.t('Floor.information.title')}</p>
        <table class="s3d-info__table">
          <tbody>
            <tr class="s3d-info__row" data-text="${floor.floor}">
                <th class="s3d-info__name text-gray-800">${i18n.t('Floor.information.floor')}:</th>
                <th class="s3d-info__value text-gray-800">${floor.floor}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${floor.count}">
              <th class="s3d-info__name text-gray-800">${i18n.t('Floor.information.all-flats')}:</th>
              <th class="s3d-info__value text-gray-800">${floor.count}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${floor.free}">
              <th class="s3d-info__name text-gray-800">${i18n.t('Floor.information.free-flats')}:</th>
              <th class="s3d-info__value text-gray-800">${floor.free}</th>
            </tr>
          </tbody>
        </table>
     </div>`;
}

export default infoFloor;
