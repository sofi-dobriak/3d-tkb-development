import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';
import planningFilterMobBtn from '../filter/$planningFilterMobBtn';

function Plannings(i18n) {
  return `
  <div class="js-s3d__wrapper__plannings s3d__wrap s3d__wrapper__plannings" id="js-s3d__plannings">
    <div class="s3d-pl">
      <!--<div class="s3d-pl__amount-flat">${i18n.t('Plannings.found')}&nbsp;<span class="s3d-pl__amount-flat__num js-s3d__amount-flat__num"></span>&nbsp;${i18n.t('Plannings.found--from')}&nbsp;<span class="s3d-pl__amount-flat__num js-s3d__amount-flat__num-all"></span>&nbsp;${i18n.t('Plannings.found-flats')}</div>-->
      <div class="s3d-pl__container" data-plannings-info-container>
        <div class="s3d-pl__container-pending">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="s3d-pl__not-found js-s3d-pl__not-found">
          <div class="s3d-pl__not-found-top">
            ${s3d2spriteIcon('Warning')}
            ${i18n.t('Plannings.found')}&nbsp;
            <span class="s3d-pl__amount-flat__num js-s3d__amount-flat__num"></span>
            &nbsp;${i18n.t('Plannings.found--from')}&nbsp;<span class="s3d-pl__amount-flat__num js-s3d__amount-flat__num-all"></span>&nbsp;${i18n.t('Plannings.found-flats')}
          </div>
          <div class="s3d-pl__not-found-bottom">
            ${i18n.t('Plannings.notFound')}
          </div>
          </div>
        <div class="s3d-pl__list js-s3d-pl__list"></div>
      </div>
      <div class="s3d-pl__filter-container" data-plannings-filter-container></div>
     ${planningFilterMobBtn(i18n)}
    </div>
  </div>`;
}

export default Plannings;
