function flatInfo(i18n, flats) {
  return `
     <div class="s3d-flat__info-container">
        <p class="s3d-info__title">${i18n.t('Flat.information.title')}</p>
        <table class="s3d-info__table">
          <tbody>
            <tr class="s3d-info__row" data-text="${flats.sale}">
              <th class="s3d-info__name">${i18n.t('Flat.information.sale')}:</th>
              <th class="s3d-info__value" data-sale=${flats.sale}>${i18n.t(`sales.${flats.sale}`)}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${flats.floor}">
              <th class="s3d-info__name">${i18n.t('Flat.information.floor')}:</th>
              <th class="s3d-info__value">${flats.floor}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${flats.area}">
              <th class="s3d-info__name">${i18n.t('Flat.information.allArea')}:</th>
              <th class="s3d-info__value" >${flats.area} ${i18n.t('Flat.information.area_unit')}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${flats.rooms}">
              <th class="s3d-info__name">${i18n.t('Flat.information.type')}:</th>
              <th class="s3d-info__value">${i18n.t(`rooms-abbreviation.${flats.rooms}`)} ${flats.type}</th>
            </tr>
            <tr class="s3d-info__row" data-text="${flats.number}">
              <th class="s3d-info__name">${i18n.t('Flat.information.number')}:</th>
              <th class="s3d-info__value">${flats.number}</th>
            </tr>
          </tbody>
        </table>
     </div>`;
}

export default flatInfo;
