import { find, groupBy, isArray, isObject } from "lodash";
import { $breadCrumbsFlatItem, $breadcrumbsDropdown, $breadcrumbsFlybyItem, $breadcrumbsItem } from "../templates/header/$breadcrumbs";
const FIND_LAST_OUTSIDE = 'findlastoutsideflyby';
const FIND_LAST_INSIDE = 'findlastinsideflyby';
const FIND_FLAT_ID = 'findFlatId';

const schema = {
    earth: [ { type: 'earth' } ],
    map: [ { type: 'earth' }, { type: 'map' } ],
    flyby_3_outside: [ { type: 'earth' }, { type: 'map' }, { type: 'flyby_3_outside' } ],
    flyby_3_inside: [ { type: 'earth' }, { type: 'map' }, { type: 'flyby_3_outside' }, {type: 'flyby_3_inside'} ],
    flyby_4_outside: [ { type: 'earth' }, { type: 'map' }, { type: 'flyby_4_outside'}],
    flyby_4_inside: [ { type: 'earth' }, { type: 'map' }, { type: 'flyby_4_outside' }, { type: 'flyby_4_inside' } ],
    flat: [ { type: 'earth' }, { type: 'map' }, { type: FIND_LAST_OUTSIDE }, { type: FIND_LAST_INSIDE }, { type: 'flat', id: FIND_FLAT_ID }],
    default: [ { type: 'earth' }, { type: 'map' } ],
}
/*
    if (!schema) return schema[default]
    if  !findlastoutsideflyby {
        check where flat is marked and put this flyby in breadcrumbs, find outside flyby by flyby number
    }

*/

/**
 * 
 * @param {Array} visitData 
 */
const findLastOutside = (visitData) => {
    const item = visitData.findLast(historyItem => historyItem.side === 'outside');
    return item ? item : null;
}
/**
 * 
 * @param {Array} visitData 
 */
const findLastInside = (visitData) => {
    const item = visitData.findLast(historyItem => historyItem.side === 'inside');
    return item ? item : null;
}
/**
 * 
 * @param {Object} history 
 */
const findFlatId = (history) => {
    // const item = visitData.findLast(historyItem => historyItem.side === 'inside');
    return history.history.id;
}


const flybysWithInnerBreadLevel = {
    'flyby_3_inside': 'flyby_3_inside',
    'flyby_4_inside': 'flyby_4_inside',
}

export default class Breadcrumbs {
    constructor(props) {
        this.maxBreadCrumbsLeves = 6;
        this.history = props.history;
        this.globalConfig =  props.config;
        this.trigger = props.trigger;
        this.i18n = props.i18n;
        this.$container = document.querySelector('[data-s3d-breadcrumbs]');
        this.trigger((data) => {
            const { type, flyby, side } = data;
            const flybyBreadcrumbsKey = `${type}_${flyby}_${side}`;

            if (type !== 'flyby' && !schema[type]) return this.render(schema['default']);

            if (type === 'flyby' && schema[flybyBreadcrumbsKey]) {
                return this.render(schema[flybyBreadcrumbsKey].map(item => {
                    if (item.type.match(/_/)) {
                        const splited = item.type.split('_');
                        return {
                            type: splited[0],
                            flyby: splited[1],
                            side: splited[2]
                        }
                    }
                    return item;
                })); 
            }
            if (type === 'flat') {
                const flatBreadcrumbs = schema[type].map(breadItem => {
                    switch (breadItem.type) {
                        case FIND_LAST_OUTSIDE: return findLastOutside(this.history.histories);
                        case FIND_LAST_INSIDE: return findLastInside(this.history.histories);
                        default:
                            return {
                                ...breadItem,
                                id: findFlatId(this.history)
                            };
                            return breadItem
                            break;
                    }
                });

                return this.render(flatBreadcrumbs);
            }

            if (schema[type]) return this.render(schema[type]);
        })
    }

    render(data) {
        this.$container.innerHTML = data.map(el => {
            if (!el) return '';
            if (el.type === 'flat') return $breadCrumbsFlatItem(el, this.i18n);
            if (el.type === 'flyby') return $breadcrumbsFlybyItem(el, this.i18n);
            return $breadcrumbsItem(el, this.i18n);
        }).join('');
        // if (!document.documentElement.classList.contains('desktop')) {
            const openerId = 'breadcrumbs';
            this.$container.insertAdjacentHTML('afterbegin', `
                <label for="${openerId}" class="s3d-breadcrumbs__mobile">
                    Menu
                </label>
            `)
            this.$container.insertAdjacentHTML('afterbegin', `
                <input type="checkbox" id="${openerId}"/>
            `)
        // }
    }
}