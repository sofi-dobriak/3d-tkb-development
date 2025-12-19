import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import IconButton from '../../../../../s3d2/scripts/templates/common/IconButton';
import TinyButton from '../../../../../s3d2/scripts/templates/common/TinyButton';

function $goToFlat(i18n, flat, floorList = []) {
  const $floorList = floorList
    .map(floor => {
      return TinyButton({
        className: floor.floor == flat.floor ? 'active swiper-slide' : 'swiper-slide',
        attributes: `data-floor_direct-btn data-build="${floor.build}" data-section="${floor.section}" data-floor="${floor.floor}"`,
        text: floor.floor,
      });
    })
    .join('');

  const $floorListSlider =
    floorList.length > 0
      ? `
    <div class="swiper-container" data-flat-floor-list>
      <div class="swiper-wrapper">
        ${$floorList}
      </div>
    </div>
  `
      : '';

  return `
    <div class="s3d-flat__floor">
      <div class="s3d-flat__floor-wrapper">
        <div class="s3d-flat__floor-info-wrapper">
          <div class="s3d-flat__floor-info">
          </div>
        </div>
        <article class="s3d-floor__nav">
          ${IconButton('', 'data-floor_btn data-floor_direction="prev"', 'Arrow left')}
          <!--<p data-current-floor="${flat.floor}">${flat.floor}</p>-->
          ${$floorListSlider}
          ${IconButton('', 'data-floor_btn data-floor_direction="next"', 'Arrow right')}
        </article>


        <!--<button class="s3d-flat__to--floor" id="s3d-to-floor">
          <span>${i18n.t('Flat.goToFloor')}</span>
        </button>-->
      </div>
      ${ButtonWithoutIcon(
        's3d-flat__to--floor',
        'id="s3d-to-floor"',
        i18n.t('Flat.goToFloor'),
        'secondary',
      )}
    </div>
`;
}

export default $goToFlat;
