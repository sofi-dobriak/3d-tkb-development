import $projectLogo from '../../../../../s3d/scripts/modules/templates/$projectLogo';
import { numberWithCommas } from '../../../helpers/helpers_s3d2';
import s3d2spriteIcon from '../../spriteIcon';

/**
 * Renders an SVG flyby tooltip.
 *
 * @param {object} i18n - Translation
 * @param {number} x - The x-coordinate of the tooltip.
 * @param {number} y - The y-coordinate of the tooltip.
 * @param {string} flyby - The flyby value.
 * @param {string} side - The side value.
 * @param {number} flatsFilteredCountInFlyby - The count of filtered flats in the flyby.
 * @param {string} rightTitle1 - title on right side of tooltip
 * @param {string} rightTitle2 - title on right side of tooltip
 * @returns {string} - The rendered SVG flyby tooltip.
 */
export default function SvgFlybyTooltip({
  i18n,
  x,
  y,
  flyby,
  side,
  flatsFilteredCountInFlyby,
  id,
  flatsFilteredCountInFlybyPostfix,
  totalFlatsInFlyby,
  rightTitle1 = '',
  rightTitle2 = '',
  finishDate,
  title,
}) {
  const $finishDate = finishDate
    ? `<div class="SvgFlybyTooltip__bottom-item">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="snone" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 0.25H3H3.25H4.75H5H5.75V1.75H5H4.75V2.25H12H15H15.75V3.75H15H12.75V4.25H14H14.75V5V8V8.75H14H10H9.25V8V5V4.25H10H11.25V3.75H4.75V14.25H6H6.75V15.75H6H4.75H3.25H2H1.25V14.25H2H3.25V3.75H1H0.25V2.25H1H3.25V1.75H3H2.25V0.25ZM10.75 5.75V7.25H13.25V5.75H12H10.75Z" fill="#6C7A88"/>
    </svg>
    ${i18n.t(finishDate)}
  </div>`
    : '';

  return `
    <foreignObject class="s3d2-svg-flyby-tooltip"  x="${x}" y="${y}"  width="250" height="160" data-build-flat-count-element data-id="${id}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="SvgFlybyTooltip">

          <div class="SvgFlybyTooltip__title">${title}</div>
          <div class="SvgFlybyTooltip__bottom">

            <div class="SvgFlybyTooltip__bottom-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 1.24988H1H6.66667H15H15.75V1.99988V7.53834V8.28834H15H14.4167V13.9999V14.7499H13.6667H4.5H3.75V13.9999V11.673H1H0.25V10.923V1.99988V1.24988ZM5.25 11.673V13.2499H12.9167V8.28834H12H11.25V6.78834H12H13.6667H14.25V2.74988H7.41667V3.99988V4.74988H5.91667V3.99988V2.74988H1.75V10.173H4.5H5.91667V7.99988V6.92296V6.17296H7.41667V6.92296V7.24988H9H9.75V8.74988H9H7.41667V10.923V11.673H6.66667H5.25Z" fill="#6C7A88"/>
              </svg>
              ${totalFlatsInFlyby}
            </div>
            ${$finishDate}
          </div>
          <div class="SvgFlybyTooltip__right">
            <div class="SvgFlybyTooltip__right-item">${
              totalFlatsInFlyby ? numberWithCommas(rightTitle1) : ''
            }</div>

          </div>

      </div>
      ${
        flatsFilteredCountInFlyby === 0 || flatsFilteredCountInFlyby === totalFlatsInFlyby
          ? ''
          : `<div class="SvgFlybyTooltip-filter-part">${i18n.t('infoBox.filter_results', {
              count: flatsFilteredCountInFlyby,
            })}</div>`
      }
    </foreignObject>
  `;
}
