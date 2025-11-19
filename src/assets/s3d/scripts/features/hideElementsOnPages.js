const attribute = 'data-hide-elements';

export function hideElementsAttribute(pages = []) {
    return `
         ${attribute}="${pages.join(',')}" 
    `;
}


export function handleHidingElements({ type, flyby, side }) {

    const currentPage = type === 'flyby' ? `flyby_${flyby}_${side}` : type;

    document.querySelectorAll(`[${attribute}]`).forEach((element) => {
        const attributeValue = element.getAttribute(attribute);
        if (new RegExp(currentPage).test(attributeValue)) {
            element.style.display = 'none';
        } else {
            element.style.display = '';
        }
    }); 
}