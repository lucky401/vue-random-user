import axios from 'axios';
import endpoint from './endpoint';
import resource from '@/api/resource';

const AxiosCancelToken = axios.CancelToken;
const NAMESPACE = 'USER_COLLECTIONS';

export default {
  /**
   * @description List all users
   * @param {Object} params
   * @returns {Promise}
   */
  list(params) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_LIST`;
    const request = resource.get(`${endpoint.userCollections}`, {
      params,
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },
};
