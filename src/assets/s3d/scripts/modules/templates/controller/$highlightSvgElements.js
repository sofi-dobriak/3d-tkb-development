import { hideElementsAttribute } from '../../../features/hideElementsOnPages';

export function $highlightSvgElements(
  i18n,
  dataAttr = 'data-hightlight-svg-elements',
  name = '',
  text,
  wrapperDataAttr = '',
  cheked = false,
) {
  return `
      <div class="s3d-ctr__menu-3d-btn-style" ${hideElementsAttribute([''])} ${wrapperDataAttr}>
        <span class="s3d-ctr__filter__text">${
          text ? text : i18n.t('ctr.menu.hightlightInfrastructure')
        }</span>
        <div class="checkbox-wrapper-6">
          <input name="${name}" ${dataAttr} class="tgl tgl-light" id="${dataAttr}" type="checkbox" />
          <label class="tgl-btn" for="${dataAttr}"></label>
        </div>
      </div>
    `;
}
