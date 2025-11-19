import ControllerMenu from "./$controller-menu";
import menuButtons from "./$menu-buttons";
import compassWrapper from "./$compass-wrapper";
import $smarto from "../$smarto-logo";

function Controller(i18n, data, innerHtml = '') {
  return `
    <div class="s3d-ctr js-s3d-ctr unselectable" data-type="complex">
      ${ControllerMenu(i18n, data)}
      <div class="s3d-ctr__menu-3d js-s3d-ctr__menu-3d">
        ${compassWrapper(i18n)}
        ${menuButtons(i18n, data)}
      </div>
      ${$smarto()}
      <div class="js-s3d-infoBox s3d-infoBox" data-s3d-type="infoBox"></div>
      ${innerHtml}
    </div>`;
}

export default Controller;
