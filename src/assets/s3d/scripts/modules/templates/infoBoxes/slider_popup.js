import $closeBtn from './$closeBtn';

function renderSliderPopup(i18n, data) {
    return `
      <div class="s3d-infoBox__infrastructure">
          ${$closeBtn()}
          <span class="s3d-infoBox__title">
            ${i18n.t([`slider_popup.${data.id}`, 'slider_popup.default'])}
          </span>
      </div>`;
}

export default renderSliderPopup;
