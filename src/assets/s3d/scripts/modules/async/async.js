import axios from 'axios';
import { AppError, AppNetworkCustomError } from '../errors';

async function asyncRequest(conf) {
  try {
    const { url, data } = conf;
    const method = conf['method'] ?? 'get';
    const params = method === 'post' ? new URLSearchParams(data).toString() : null;
    const response = await axios[method](url, params)
      .catch(err => {
        throw err;
      });
    // const response = method === 'get'
    //   ? await axios[method](url)
    //   : await axios[method](url, params.toString());
    return response.data;
  } catch (err) {
    if (err.isAxiosError) {
      const { config, request } = err.response;
      const reportData = {
        url: config.url,
        method: config.method,
        data: config.data,
        status: request.status,
        statusText: request.statusText,
      };
      throw new AppNetworkCustomError(reportData);
    }
    throw new AppError(err);
  }
}

export default asyncRequest;
