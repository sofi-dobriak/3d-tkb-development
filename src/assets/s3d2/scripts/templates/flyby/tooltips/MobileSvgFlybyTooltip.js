import $projectLogo from "../../../../../s3d/scripts/modules/templates/$projectLogo";
import s3d2spriteIcon from "../../spriteIcon";

/**
 * Renders an SVG flyby tooltip.
 *
 * @param {number} x - The x-coordinate of the tooltip.
 * @param {number} y - The y-coordinate of the tooltip.
 * @param {string} flyby - The flyby value.
 * @param {string} side - The side value.
 * @param {number} flatsFilteredCountInFlyby - The count of filtered flats in the flyby.
 * @returns {string} - The rendered SVG flyby tooltip.
 */
export default function MobileSvgFlybyTooltip({ x, y, flyby, side, flatsFilteredCountInFlyby, flatsFilteredCountInFlybyPostfix, totalFlatsInFlyby, title}) {
  return `
    <foreignObject class="s3d2-svg-flyby-tooltip"  x="${x}" y="${y}"  width="250" height="160" data-build-flat-count-element>
      <div xmlns="http://www.w3.org/1999/xhtml" class="MobileSvgFlybyTooltip">

          <div class="MobileSvgFlybyTooltip__title">${title}</div>
          <div class="MobileSvgFlybyTooltip__bottom">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 1.24988H1H6.66667H15H15.75V1.99988V7.53834V8.28834H15H14.4167V13.9999V14.7499H13.6667H4.5H3.75V13.9999V11.673H1H0.25V10.923V1.99988V1.24988ZM5.25 11.673V13.2499H12.9167V8.28834H12H11.25V6.78834H12H13.6667H14.25V2.74988H7.41667V3.99988V4.74988H5.91667V3.99988V2.74988H1.75V10.173H4.5H5.91667V7.99988V6.92296V6.17296H7.41667V6.92296V7.24988H9H9.75V8.74988H9H7.41667V10.923V11.673H6.66667H5.25Z" fill="#6C7A88"/>
            </svg>
            Available ${totalFlatsInFlyby} 
          </div>
      </div>
    </foreignObject>
  `;
}