function sortArray(arr, name, getFlat, directionSortUp) {
  const result = arr.reduce((previous, current) => {
    const flat = getFlat(current);
    let value = flat[name];

    if (typeof value === 'string') {
      value = value.replace(/\s/g, '').replace(',', '.');
    }

    previous.push([flat.id, value]);
    return previous;
  }, []);

  return result.sort(directionSortUp ? sortUp : sortDown).map(el => el[0]);

  function sortUp(a, b) {
    const valA = parseFloat(a[1]) || 0;
    const valB = parseFloat(b[1]) || 0;
    return valA - valB;
  }

  function sortDown(a, b) {
    const valA = parseFloat(a[1]) || 0;
    const valB = parseFloat(b[1]) || 0;
    return valB - valA;
  }
}

export default sortArray;
