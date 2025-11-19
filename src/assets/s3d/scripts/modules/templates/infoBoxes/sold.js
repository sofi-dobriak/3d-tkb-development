import $closeBtn from './$closeBtn';

function sold(i18n, data) {
  return `
    <div class="s3d-infoBox__sold">
      ${$closeBtn()}
      <span class="s3d-infoBox__title">
        ${i18n.t('infoBox.sold_short')}
      </span>
    </div>`;
}

export default sold;
