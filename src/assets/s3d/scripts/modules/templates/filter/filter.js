import $amountFlat from './$filter-amount';
import $filterClose from './$filterClose';
import $ranges from './$ranges';
import $checkboxes from './$checkboxes';
import $reset from './$reset';
import Checkbox from '../../../../../s3d2/scripts/templates/components/filter/Checkbox';
import Link from '../../../../../s3d2/scripts/templates/common/Link';
import TextInput from '../../../../../s3d2/scripts/templates/common/inputs/TextInput';
import CheckboxWithLabel from '../../../../../s3d2/scripts/templates/components/filter/CheckboxWithLabel';
import { SEARCH_PARAMS_FILTER_PREFIX } from '../../../../../s3d2/scripts/constants';
import { parseSearchUrl } from '../../history';
import getConfig from '../../../../../s3d2/scripts/getConfig';

function Filter(i18n, filterData = []) {
  const searchParams = parseSearchUrl(window.location);

  const CONFIG = getConfig();

  window.addEventListener('flats-loaded', data => {
    filterData.forEach(singleFilter => {
      const flats = { ...data.detail };
      let valuesForThisFitler = [
        ...new Set(
          Object.values(flats)
            .filter(flat => {
              if (singleFilter.ignoreParams) {
                return Object.entries(singleFilter.ignoreParams).every(
                  ([paramName, paramValue]) => {
                    return !paramValue.includes(flat[paramName]);
                  },
                );
              }
              if (singleFilter.innerParamsFilter) {
                return Object.entries(singleFilter.innerParamsFilter).every(
                  ([paramName, paramValue]) => {
                    return paramValue.includes(flat[paramName]);
                  },
                );
              }
              return true;
            })
            .map(flat => flat[singleFilter.paramaterByWhatWillBeFilter]),
        ),
      ].sort((a, b) => Number(a) - Number(b));
      const containerForThisFilter = document.querySelector(
        `[data-${
          singleFilter.id ? singleFilter.id : singleFilter.paramaterByWhatWillBeFilter
        }-container] .s3d-filter-checkboxes`,
      );

      if (singleFilter.wide) {
        containerForThisFilter.classList.add('s3d-filter__checkbox__row--wide');
      }

      if (singleFilter.needTranslation) {
        containerForThisFilter.style.width = '100%';
        containerForThisFilter.style.flexWrap = 'wrap';
        containerForThisFilter.style.gap = '8px';
      }

      containerForThisFilter.innerHTML = valuesForThisFitler
        .map(singleVlaue => {
          const isInitialyChecked =
            searchParams[
              `${SEARCH_PARAMS_FILTER_PREFIX}${singleFilter.paramaterByWhatWillBeFilter}_${singleVlaue}`
            ] == singleVlaue;

          if (singleFilter.viewType === 'checkbox_with_label') {
            return CheckboxWithLabel({
              name: singleFilter.paramaterByWhatWillBeFilter,
              checked: isInitialyChecked,
              value: singleVlaue,
              title: singleFilter.needTranslation
                ? i18n.t(singleFilter.translationNS + '' + singleVlaue)
                : singleVlaue,
              wide: singleFilter.needTranslation,
            });
          }
          return Checkbox({
            name: singleFilter.paramaterByWhatWillBeFilter,
            value: singleVlaue,
            checked: isInitialyChecked,
            title: singleFilter.needTranslation
              ? i18n.t(singleFilter.translationNS + '' + singleVlaue)
              : singleVlaue,
            wide: singleFilter.needTranslation,
          });
        })
        .join('');
    });
  });

  return `
  <div class="s3d-filter-wrap js-s3d-filter">
    ${$filterClose()}
    <div class="s3d-filter__top">
      <div class="s3d-filter__title text-style-3-d-fonts-1920-h-2-semi-bold"><span>${i18n.t(
        'Filter.title',
      )}</span></div>

      <div style="display:flex;justify-content:space-between;align-items: center; width: 100%; padding: 0 var(--filter-offset-hor); margin: var(--space-4) 0;">
        <div class="text-gray-700 text-style-3-d-fonts-1920-body-bold">
          ${i18n.t('Filter.found')}
          <span class="js-s3d__amount-flat__num"></span>
          ${i18n.t('Filter.from')}
          <span class="js-s3d__amount-flat__num-all"></span>
        </div>

        ${Link({
          text: i18n.t('Filter.reset'),
          attributes: 'id="resetFilter" ',
          iconName: 'Trash',
        })}
      </div>

      <div class="s3d-filter">
        ${$ranges(i18n)}
        <div class="s3d-filter__input-wrapper" style="display: none">
          <div class="s3d-filter__param">
            <div class="s3d-filter__param-title text-style-3-d-fonts-1920-body-bold">${i18n.t(
              'Filter.Search by number',
            )}</div>
            ${TextInput({
              attributes: 'data-type="number" ',
              text: i18n.t('Filter.enterUnitNumber'),
              value: searchParams[`${SEARCH_PARAMS_FILTER_PREFIX}number`] || '',
            })}
            <!--<input data-type="number"  type="text" placeholder="Enter Unit Number">-->
          </div>
        </div>
        ${filterData
          .map(
            singleFilter => `
          <div class="s3d-filter__checkboxes-wrapper">
            <div class="s3d-filter__param">
              <div class="s3d-filter__param-title text-style-3-d-fonts-1920-body-bold">${i18n.t(
                singleFilter.title,
              )}</div>
              <div class="js-s3d-filter__checkboxes s3d-filter__checkbox__row" data-${
                singleFilter.id ? singleFilter.id : singleFilter.paramaterByWhatWillBeFilter
              }-container>
                <div class="s3d-filter-checkboxes s3d-filter__checkbox__row">
                </div>
              </div>
            </div>
          </div>
        `,
          )
          .join('')}
          <div class="smarto_powered">
          <span class="text-style-3-d-fonts-1920-body-medium text-gray-900">  Powered by </span>
          <span class="text-style-3-d-fonts-1920-body-bold text-gray-900" target="_blank">
            smarto.agency
          </span>

        </div>
      </div>
      <div class="s3d-filter__view-type">
        <button data-switch-filter-view-type="card">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.7478 5.9978C6.33359 5.9978 5.9978 6.33359 5.9978 6.7478V10.5669C5.9978 10.9811 6.33359 11.3169 6.7478 11.3169H10.5669C10.9811 11.3169 11.3169 10.9811 11.3169 10.5669V6.7478C11.3169 6.33359 10.9811 5.9978 10.5669 5.9978H6.7478ZM7.4978 9.81688V7.4978H9.81688V9.81688H7.4978ZM6.7478 12.6812C6.33359 12.6812 5.9978 13.017 5.9978 13.4312V17.2503C5.9978 17.6645 6.33359 18.0003 6.7478 18.0003H10.5669C10.9811 18.0003 11.3169 17.6645 11.3169 17.2503V13.4312C11.3169 13.017 10.9811 12.6812 10.5669 12.6812H6.7478ZM7.4978 16.5003V14.1812H9.81688V16.5003H7.4978ZM12.6812 6.7478C12.6812 6.33359 13.017 5.9978 13.4312 5.9978H17.2503C17.6645 5.9978 18.0003 6.33359 18.0003 6.7478V10.5669C18.0003 10.9811 17.6645 11.3169 17.2503 11.3169H13.4312C13.017 11.3169 12.6812 10.9811 12.6812 10.5669V6.7478ZM14.1812 7.4978V9.81688H16.5003V7.4978H14.1812ZM13.4312 12.6812C13.017 12.6812 12.6812 13.017 12.6812 13.4312V17.2503C12.6812 17.6645 13.017 18.0003 13.4312 18.0003H17.2503C17.6645 18.0003 18.0003 17.6645 18.0003 17.2503V13.4312C18.0003 13.017 17.6645 12.6812 17.2503 12.6812H13.4312ZM14.1812 16.5003V14.1812H16.5003V16.5003H14.1812Z"/>
            </svg>
        </button>
        <button data-switch-filter-view-type="list">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00305 7.75366C5.00305 7.33945 5.33884 7.00366 5.75305 7.00366H18.2484C18.6627 7.00366 18.9984 7.33945 18.9984 7.75366C18.9984 8.16788 18.6627 8.50366 18.2484 8.50366H5.75305C5.33884 8.50366 5.00305 8.16788 5.00305 7.75366ZM5.00305 12.0016C5.00305 11.5874 5.33884 11.2516 5.75305 11.2516H18.2484C18.6627 11.2516 18.9984 11.5874 18.9984 12.0016C18.9984 12.4158 18.6627 12.7516 18.2484 12.7516H5.75305C5.33884 12.7516 5.00305 12.4158 5.00305 12.0016ZM5.75305 15.4996C5.33884 15.4996 5.00305 15.8354 5.00305 16.2496C5.00305 16.6638 5.33884 16.9996 5.75305 16.9996H18.2484C18.6627 16.9996 18.9984 16.6638 18.9984 16.2496C18.9984 15.8354 18.6627 15.4996 18.2484 15.4996H5.75305Z"/>
            </svg>
        </button>
      </div>
      <div class="s3d-filter__hide" id="hideFilter" data-hide-text="${i18n.t(
        'Filter.hide',
      )}" data-show-text="${i18n.t('Filter.show')}">${i18n.t('Filter.hide')}</div>
    </div>
    <div class="s3d-filter__table js-s3d-filter__table">
      <div class="s3d-filter__head js-s3d-filter__head">
          <div class="s3d-filter__tr">
            <div class="s3d-filter__th--offset" data-sort="none"></div>
            <div class="s3d-filter__th" data-sort="floor">
              ${i18n.t('Filter.list.floor')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="rooms">
              ${i18n.t('Filter.list.rooms')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="area">
              ${i18n.t('Filter.list.area')} ${i18n.t('area_unit')}
            </div>
            <!--<div class="s3d-filter__th" data-sort="price_m2" style="display: ${
              CONFIG.show_prices ? '' : 'none'
            }">
              ${i18n.t('Filter.list.price')} ${i18n.t('currency_label')} ${i18n.t('area_unit')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>-->
            <div class="s3d-filter__th" data-sort="price" style="display: ${
              CONFIG.show_prices ? '' : 'none'
            }">
              ${i18n.t('Filter.list.price')} ${i18n.t('currency_label')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="sale">
              ${i18n.t('Filter.list.status')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="none">
              <!--${i18n.t('Filter.list.favourite--add')}-->
            </div>
            <div class="s3d-filter__th--offset" data-sort="none"></div>
          </div>
        </div>
      <table>
        <colgroup>
          <col>
          <col span="5" > <!-- С помощью этой конструкции задаем цвет фона для первых двух столбцов таблицы-->
          <col>
        </colgroup>
        <tbody class="s3d-filter__body js-s3d-filter__body"></tbody>
      </table>
    </div>
    <div class="s3d-filter__grid js-s3d-filter__grid">
    </div>
    <!--${$amountFlat(i18n)}-->
    <div style="display:flex;justify-content:space-between;align-items: center; width: 100%; padding: 0 var(--filter-offset-hor); margin: var(--space-4) 0;">
        <div class="text-gray-700 text-style-3-d-fonts-1920-body-bold">
          ${i18n.t('Filter.found')}
          <span class="js-s3d__amount-flat__num"></span>
          ${i18n.t('Filter.from')}
          <span class="js-s3d__amount-flat__num-all"></span>
        </div>
      </div>
  </div>
`;
}

function checkboxItem(name, value, title, wide) {
  return `
    <div class="s3d-filter__checkbox ${wide ? 's3d-filter__checkbox--wide-buttons' : ''}" ${
    wide ? 'style="margin:0"' : ''
  }>
      <input type="checkbox" data-type="${name}" data-${name}="${value}" id="${name}-${value}">
      <label class="s3d-filter__checkbox--label" for="${name}-${value}">${title}</label>
    </div>
  `;
}

export default Filter;
