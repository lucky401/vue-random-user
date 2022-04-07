/* eslint-disable no-console */
const errorPrefix = '[ERROR] ';
const errorHandler = {
  somethingWrong() {
    console.error(errorPrefix, 'Something wrong');
  },

  badRequest() {
    console.error(errorPrefix, 'Bad Request');
  },
};

export default (error) => {
  const response = error.response;

  if (
    typeof response === 'undefined' ||
    typeof response.status === 'undefined'
  ) {
    errorHandler.somethingWrong();
    return Promise.reject(error);
  }

  switch (response.status) {
    case 400:
      errorHandler.badRequest();
      break;
    default:
      break;
  }

  return Promise.reject(error);
};
