import { format, parseISO } from "date-fns";
import s3d2spriteIcon from "../spriteIcon";
import { parse } from "path";

/**
 * Renders a flat document card component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.date - The date of the document.
 * @param {string} props.img - The URL of the document image.
 * @param {string} props.url - The URL of the document.
 * @param {string} props.title - The title of the document.
 * @param {string} props.description - The description of the document.
 * @param {Object} i18n - The i18n object for internationalization.
 * @returns {string} The rendered flat document card HTML.
 */
export default function FlatDocCard({
  date,
  img,
  url,
  title,
  description,
}, i18n) {

  const dateParsed = parseISO(date);
  const day = format(dateParsed, 'dd');
  const year = format(dateParsed, 'yyyy');

  return `
    <div class="FlatDocCard">
      <div class="FlatDocCard__date">${i18n.t('monthes.'+format(dateParsed, 'MMMM'))} ${day}, ${year}</div>
      <div class="FlatDocCard__title">${title}</div>
      <div class="FlatDocCard__img">
        <div class="FlatDocCard__img-wrap">
          <img src="${img}"/>
        </div>
      
      </div>
      <div class="FlatDocCard__description">${description}</div>
      <a download href="${url}" class="FlatDocCard__download">
        ${s3d2spriteIcon('Download', 'FlatDocCard__download-icon')}
      </a>
    </div>
  `
}