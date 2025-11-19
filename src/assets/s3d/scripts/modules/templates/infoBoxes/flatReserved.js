import $closeBtn from './$closeBtn';

function FlatReserved(i18n) {
  return `
    <div class="s3d-infoBox__flatSold">
      ${$closeBtn()}
      <span class="s3d-infoBox__title">
        ${i18n.t('infoBox.flatReserved')}
      </span>
    </div>`;
}

export default FlatReserved;