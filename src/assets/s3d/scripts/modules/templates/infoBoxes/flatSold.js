import $closeBtn from './$closeBtn';

function FlatSold(i18n) {
  return `
    <div class="s3d-infoBox__flatSold">
      ${$closeBtn()}
      <span class="s3d-infoBox__title">
        ${i18n.t('infoBox.flatSold')}
      </span>
    </div>`;
}

export default FlatSold;
