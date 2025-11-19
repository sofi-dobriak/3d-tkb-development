import asyncRequest from './async/async';

async function getFloor(conf) {
  let config = {
    url: `${defaultStaticPath}/dataFloor.json`,
  };
  if (window.status != 'local') {
    config = {
      url: '/wp-admin/admin-ajax.php',
      method: 'post',
      data: {
        action: 'getFloor',
        ...conf,
      },
    };
  }
  const floorData = await asyncRequest(config);

  return floorData;
}

export default getFloor;
