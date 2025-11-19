export default function $floorList(list, active, i18n) {
    const mutatedList = [];
    list.forEach(({ floor,build,section }) => {

      if (mutatedList.some(el => {
        return el.floor == floor && el.section == section && el.build == build;
      })) {
        return;
      }
      mutatedList.push({
        floor,build,section
      })
    });

    return `
        <div class="floor-list" >
            <div class="floor-list__title" style="order: -10">${i18n.t('Floor.floor-list')}</div>
            ${[...new Set(mutatedList)].map(el => {
              const $datasets = Object.entries(el).map(( [ key ,value ] ) => {
                return `data-${key}="${value}"`;
              }).join(' ');
              return el.floor === active ?
                `<button style="order: ${el.floor}" ${$datasets} type="button" class="active">${el.floor}</button>` :
                `<button style="order: ${el.floor}" data-type="floor" ${$datasets} type="button">${el.floor}</button>`
            }).join(' ')}
        </div>
    `;
  }
