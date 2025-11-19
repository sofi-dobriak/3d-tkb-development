import { hideElementsAttribute } from "../../../s3d/scripts/features/hideElementsOnPages";
import s3d2spriteIcon from "./spriteIcon";

export default function SpinNav() {
  return `
    <div class="SpinNav" ${hideElementsAttribute(['floor', 'flat', 'plannings', 'favourites'])}>
      <div class="SpinNav__load-element" data-flyby-visual-load-element></div>
      <button class="SpinNav__arrow js-s3d__button-left" data-type="prev" type="button">
        ${s3d2spriteIcon('Big arrow left')}
      </button>
      <span class="SpinNav__counter fs-preloader-amount">360°</span>
      <button class="SpinNav__arrow js-s3d__button-right" data-type="next" type="button">
        ${s3d2spriteIcon('Big arrow right')}
      </button>
    </div>
  `
}