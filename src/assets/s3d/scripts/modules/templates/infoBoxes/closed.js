import $closeBtn from './$closeBtn';

function closed(i18n) {
  return `
    <div class="s3d-infoBox__sale-close">
      ${$closeBtn()}
      <span class="s3d-infoBox__title">
        ${i18n.t('infoBox.flatClosed')}
      </span>
    </div>`;
}

export default closed;
