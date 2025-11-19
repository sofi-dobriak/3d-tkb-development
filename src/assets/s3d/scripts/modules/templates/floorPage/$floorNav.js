import IconButton from "../../../../../s3d2/scripts/templates/common/IconButton";

export default function $floorNav(floor) {
  return `
      <article class="s3d-floor__nav">
        ${IconButton('', ' data-floor_btn data-floor_direction="prev"', 'Arrow left')}
        <!--<button data-floor_btn data-floor_direction="prev" >
           <svg class="s3d-floor__nav-prev"><use xlink:href="#icon-arrow"></use></svg>
        </button>-->
        <div data-swiper-floor-list-wrapper></div>
        <p data-current-floor=${floor.floor}>${floor.floor}</p>
        ${IconButton('', ' data-floor_btn data-floor_direction="next"', 'Arrow right')}
      </article>
  `;
}
