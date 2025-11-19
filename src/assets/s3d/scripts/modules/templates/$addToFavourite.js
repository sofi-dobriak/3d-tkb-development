import s3d2spriteIcon from "../../../../s3d2/scripts/templates/spriteIcon";

function $addToFavourite(i18n, flat, favouritesIds$) {
  const { id } = flat;
  const isFavourite = favouritesIds$.value.includes(id);
  return `
      <label aria-label="button" aria-role="button" data-id="${id}" data-key="id" class="s3d__add-to-favourite js-s3d-add__favourite ${isFavourite ? 'added-to-favourites' : ''}">
         <input type="checkbox" data-key="checked" ${isFavourite ? 'checked' : ''}/>
         ${s3d2spriteIcon('Compare')}
      </label>
  `;
}

export default $addToFavourite;
