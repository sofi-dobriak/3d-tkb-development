export function $sliderFloorList(data, active) {
    const mutatedList = [];
    data.forEach(({ floor,build,section }) => {

      if (mutatedList.some(el => {
        return el.floor == floor && el.section == section && el.build == build;
      })) {
        return;
      }
      mutatedList.push({
        floor,build,section
      })
    });
    const $list = mutatedList.sort(((a,b) => a.floor>b.floor ? 1 : -1 )).map(el => {
      const $datasets = Object.entries(el).map(( [ key ,value ] ) => {
          return `data-${key}="${value}"`;
      }).join(' ');

      return el.floor === active ?
        `<button ${$datasets} type="button" class="active swiper-slide swiper-floor-list__slide">${el.floor}</button>` :
        `<button class="swiper-slide swiper-floor-list__slide" data-type="floor" ${$datasets} type="button">${el.floor}</button>`
      }).join(' ');

      return `
          ${$list}
      `;
  }

  export function $slideFloorListWrapper() {
      return `<div data-swiper-floor-list class="swiper-floor-list">
          <div class="swiper-wrapper">
          </div>
      </div>`
  }
