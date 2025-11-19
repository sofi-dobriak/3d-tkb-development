function Helper(i18n) {
  return `
  <div class="s3d__helper-gif__wrap js-s3d__helper-gif-wrap">
    <div class="s3d__helper-gif js-s3d__helper-gif" data-step="0">
        <div class="s3d__helper-gif__gif" data-type="gif">
          <object id="animated-svg-1" type="image/svg+xml" data="${window.defaultModulePath}/images/helper/step1.svg"></object>
          <object id="animated-svg-2" type="image/svg+xml" data="${window.defaultModulePath}/images/helper/step2.svg"></object>
          <object id="animated-svg-3" type="image/svg+xml" data="${window.defaultModulePath}/images/helper/step3.svg"></object>
          <object id="animated-svg-4" type="image/svg+xml" data="${window.defaultModulePath}/images/helper/step4.svg"></object>
        </div>
        <div class="s3d__helper-gif__title"  data-type="title"></div>
        <div class="s3d__helper-gif__group">
          <div class="s3d__helper-gif__count js-s3d__helper-gif__count">
            <span data-current_count></span>/<span data-all_count></span>
          </div>
          <div class="s3d__helper-gif__link js-s3d__helper-gif__link">
              <svg><use xlink:href="#icon-arrow"></use></svg>
          </div>
        </div>
        <div class="s3d__helper-gif__close js-s3d__helper-gif__close" data-type="close"></div>
    </div>
  </div>
`;
}

export default Helper;
