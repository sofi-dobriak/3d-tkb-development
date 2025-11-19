/**
 * Renders a flat financial terms card component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {string[]} [props.iconsUrls=[]] - The URLs of the icons to be displayed.
 * @returns {string} The HTML markup for the flat financial terms card.
 */
export default function FlatFinancialTermsCard({
  title,
  description,
  iconsUrls = [],
}) {
  return `
    <div class="FlatFinancialTermsCard">
      <div class="FlatFinancialTermsCard__title">${title}</div>
      <div class="FlatFinancialTermsCard__description">${description}</div>
      <div class="FlatFinancialTermsCard__icons">
        ${iconsUrls.map((url) => `
          <img src="${url}" class="FlatFinancialTermsCard__icon"/>
        `).join('')}
      </div>
    </div>
  `;
}