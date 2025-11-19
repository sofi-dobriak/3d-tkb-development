import { has } from "lodash";
import { BehaviorSubject } from "rxjs";
import ButtonWithoutIcon from "../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon";

/**
 * Creates a flyby side chooser component.
 * Prepare dropdown links, when flyby has 2 sides.
 *
 * @param {Object} i18n - The internationalization object.
 * @param {Object} config - The configuration object.
 * @returns {string} - The HTML string representing the flyby side chooser component.
 */
export function $s3dFlybySideChooser(i18n, config) {

    // console.log(config['hide_s3dFlybySideChooser']);

    if (config['hide_s3dFlybySideChooser']) return;

    
    const selector = 'data-s3dflybysidechooser';
    const translationPath = 'ctr.flybysidechooser';

    const currentData$ = new BehaviorSubject({});
    currentData$.subscribe(data => {
        if (!document.querySelector(`[${selector}]`)) return clearContainer(selector);
        if (data.page !== 'flyby') {
            return clearContainer(selector);
        }

        const urlParams = new URLSearchParams(data.url);
        const flybyNumber = urlParams.get('flyby');
        const flybySide = urlParams.get('side');

        if (!has(config.flyby[flybyNumber], 'outside') || !has(config.flyby[flybyNumber], 'inside')) {
            return clearContainer(selector);
        }
        document.querySelector(`[${selector}]`).innerHTML = `
            ${title(flybySide === 'outside' ? i18n.t(translationPath+'.outside') : i18n.t(translationPath+'.inside'))}
            ${item(flybySide === 'outside' ? i18n.t(translationPath+'.inside') : i18n.t(translationPath+'.outside'), {side: flybySide === 'outside' ? 'inside' : 'outside', flyby: flybyNumber})}
        `;
    });
    s3dFlybySideChooserHandler(currentData$);

    return `
    <div class="s3dFlybySideChooser" ${selector}>
        
    </div>
    `;
}

function clearContainer(selector) {
    document.querySelectorAll(`[${selector}]`).forEach(el => el.innerHTML = '');
}

function title(text) {
    return `
      ${ButtonWithoutIcon('', '', text, 'secondary')}
    `;
}

function item(text, data) {
    return `
    ${ButtonWithoutIcon('js-s3d-nav__btn', `data-type="flyby" data-side="${data.side}"  data-flyby="${data.flyby}"`, text)}
`;

}

function s3dFlybySideChooserHandler(state) {
    window.addEventListener('visit-page',function(evt){
        state.next(evt.detail);
    });
}