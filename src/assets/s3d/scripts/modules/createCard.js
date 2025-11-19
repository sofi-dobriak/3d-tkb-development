function CreateCard(flat, node) {
  const checked = flat.favourite ? 'checked' : '';
  node.setAttribute('data-id', flat.id);

  const typeEl = node.querySelector('[data-key="type"]');
  const idEl = node.querySelector('[data-key="id"]');
  const numberEl = node.querySelector('[data-key="number"]');
  const floorEl = node.querySelector('[data-key="floor"]');
  const roomsEl = node.querySelector('[data-key="rooms"]');
  const areaEl = node.querySelector('[data-key="area"]');
  const srcEl = node.querySelector('[data-key="src"]');
  const checkedEl = node.querySelector('[data-key="checked"]');
  if (typeEl) {
    typeEl.innerHTML = flat.type || '-';
  }
  if (idEl) {
    idEl.dataset.id = flat.id || null;
  }
  if (numberEl) {
    numberEl.innerHTML = flat.number || '-';
  }
  if (floorEl) {
    floorEl.innerHTML = flat.floor || '-';
  }
  if (roomsEl) {
    roomsEl.innerHTML = flat.rooms || '-';
  }
  if (areaEl) {
    areaEl.innerHTML = flat.area || '-';
  }
  if (srcEl) {
    srcEl.src = flat['img_small'] || `${defaultProjectPath}/s3d/images/examples/no-image.png`;
  }

  checkedEl.checked = checked;

  return node;
}

export default CreateCard;
