import * as TYPES from './types';
import * as ROOT_TYPES from '@/store-namespace/root/types';

import services from '@/common/services';

export default {
  /**
   * @description Get all users
   * @param {Object} payload
   * @returns {Promise}
   */
  [TYPES.FETCH_USER_LIST]({ dispatch }, payload = {}) {
    const { filters } = payload;

    dispatch(
      `root/${ROOT_TYPES.FETCH_CLEAR_ERROR_DETAIL}`,
      { actionName: TYPES.FETCH_USER_LIST },
      {
        root: true,
      }
    );

    return new Promise((resolve, reject) => {
      services.userCollection
        .list(filters)
        .then((response) => {
          const { results: items, info } = response.data;
          resolve({ items, info });
        })
        .catch((error) => {
          dispatch(
            `root/${ROOT_TYPES.FETCH_ERROR_DETAIL}`,
            {
              ...error.response,
              actionName: TYPES.FETCH_USER_LIST,
            },
            { root: true }
          );
          reject(error);
        });
    });
  },
};
