/**
 * @typedef {Object} Response
 * @property {Number} status how the person is called
 * @property {String} message how many years the person lived
 */

const RESPONSES = {
  OK: {
    status: 200,
  },
  CREATE_SUCCESS: {
    status: 201,
  },
  UPDATE_SUCCESS: { status: 204 },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad request',
  },
  MISS_PARAMETERS: {
    status: 400,
    message: 'Miss parameters',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized access',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },
  SERVER_ERROR: {
    status: 500,
    message: 'Server Error',
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    message: 'Service unavailable',
  },
};

export default RESPONSES;
