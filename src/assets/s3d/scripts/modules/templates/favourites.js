import { showOn } from "../../../../s3d2/scripts/helpers/helpers_s3d2";
import ButtonIconLeft from "../../../../s3d2/scripts/templates/common/ButtonIconLeft";
import ButtonWithoutIcon from "../../../../s3d2/scripts/templates/common/ButtonWithoutIcon";
import s3d2spriteIcon from "../../../../s3d2/scripts/templates/spriteIcon";
import { $highlightSvgElements } from "./controller/$highlightSvgElements";


export function emptyFavouritesTitle(i18n) {
  return i18n.t('favourite--title');
} 

export function favouriteTitle(i18n) {
  return i18n.t('favourite--added');

}

function Favourites(i18n, count) {
  return `
  <div class="js-s3d__wrapper__favourites s3d__wrap" id="js-s3d__favourites">
    <div class="s3d-fv js-s3d-fv">
      <div class="s3d-fv__amount-flat text-gray-900 text-style-3-d-fonts-1920-h-2-bold">
        <div data-favourite-filled-title-wrapper style="text-transform: uppercase; margin-right: auto">
          ${i18n.t('favourite--added')}
        </div>
        <div data-favourite-empty-title-wrapper style="text-transform: uppercase; margin-right: auto">
          ${i18n.t('favourite--title')}
        </div>

        ${$highlightSvgElements(
            i18n, 
            'data-compare-show-differences', 
            'data-compare-show-differences', 
            i18n.t('favourite--show-differences'),
            'data-disable-when-compare-empty data-compare-show-differences'
          )
        }
        ${showOn(['desktop', 'tablet'], ButtonIconLeft('','data-disable-when-compare-empty data-compare-pdf','Download PDF','PDF','secondary'))}
        ${showOn(['mobile'], ButtonIconLeft('','data-disable-when-compare-empty data-compare-pdf','PDF','PDF','secondary'))}

      </div>
      <div class="s3d-fv__container">
        <div class="s3d-fv__list js-s3d-fv__list">
        
        </div>
      </div>
    </div>
  </div>`;
}


export function EmptyFavourites(i18n) {
  /*
  
    "favourite--empty-title":"Nothing found to compare",
    "favourite--empty-text": "Choose layouts and add them to the comparison list",
    "favourite--empty-button": "View plannings",
  */
  return `
    <div class="EmptyFavourites">
      ${s3d2spriteIcon('Compare', 'space-b-4')}
      <div class="text-style-3-d-fonts-1920-h-2-bold text-gray-900 space-b-2">
        ${i18n.t('favourite--empty-title')}
      </div>
      <div class="text-style-3-d-fonts-1920-body-medium text-gray-800 space-b-4">
        ${i18n.t('favourite--empty-text')}
      </div>
      ${ButtonWithoutIcon('','data-favourites-empty-button', i18n.t('favourite--empty-button'), 'secondary')}
    </div>
  `;
}

export default Favourites;
