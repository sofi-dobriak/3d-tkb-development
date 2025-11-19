const attribute = 'data-show-elements-on-page';

export function showElementsOnPageAttribute(pages = []) {
  return `
         ${attribute}="${pages.join(',')}" 
    `;
}

export function handleShowElementsOnPage({ type, flyby, side }) {
  let currentPage = type === 'flyby' ? `flyby_${flyby}_${side}` : type;
  if (!type) currentPage = 'genplan';

  document.querySelectorAll(`[${attribute}]`).forEach(element => {
    const attributeValue = element.getAttribute(attribute);
    if (new RegExp(currentPage).test(attributeValue)) {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  });
}
