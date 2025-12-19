/**
 * Renders a compare item component.
 *
 * @param {Object} options - The options for the compare item.
 * @param {Object} options.i18n - The internationalization object.
 * @param {string} options.id - The ID of the compare item.
 * @param {Object} options.flat - The flat object to display in the compare item.
 * @param {Array} options.propertiesToShow - The properties to show in the compare item.
 * @returns {string} The HTML string representing the compare item component.
 */
import { get } from 'lodash';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';

export default function CompareItem({ i18n, id, flat, propertiesToShow = [] }) {
  return `
    <div class="CompareItem" data-compare-item="${id}"  data-id="${id}">
      ${s3d2spriteIcon('close', 'CompareItem__close', 'data-compare-item-close')}
      <div class="CompareItem__img">
        <img src="${flat['img_big']}">
      </div>
      <div class="CompareItem__table">
        ${propertiesToShow
          .map(({ keyPath, hide, valueFormat = e => e, title }) => {
            if (hide) return '';
            const value = get(flat, keyPath, undefined);
            if (value == '0') return '';
            if (value === undefined)
              return `
            <div class="CompareItem__table-row">
              <div class="CompareItem__table-cell">
                <span class="text-style-3-d-fonts-1920-body-medium">&nbsp;</span>
              </div>
            </div>
          `;
            return `
            <div class="CompareItem__table-row">
              <div class="CompareItem__table-cell">
                <span class="text-style-3-d-fonts-1920-body-bold">${title}</span>
                <span class="text-style-3-d-fonts-1920-body-medium">${valueFormat(value)}</span>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
      ${ButtonWithoutIcon(
        'CompareItem__link',
        `data-compare-item-open="${id}" data-id="${id}"`,
        i18n.t('Flat.goToFlat'),
        'secondary',
      )}
    </div>
  `;
}
