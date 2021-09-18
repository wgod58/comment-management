import config from 'constants/config';
import responses from 'constants/responses';
import logger from 'utils/logger';

const nameSpace = 'utils/responseHandler';

/**
 * Wrap handle function. Connect client request to the handler function
 * and return the result to client using response
 * @param {function} handler business logic
 */
const wrapResponse = (handler) => async (req, res) => {
  try {
    await handleResponse({ req, res, handler });
  } catch (error) {
    logger.error(`${nameSpace} :wrapResponse => ${error.message} `);

    if (config.ENVIRONMENT === 'production') {
      res.status(responses.SERVER_ERROR.status).json('Error occurred');
    } else {
      res
        .status(error.status || responses.SERVER_ERROR.status)
        .json(error.message || responses.SERVER_ERROR.message);
    }
  }
};

/**
 * Handle express request and response
 * @param {Object} req express req
 * @param {Object} res express res
 * @param {Function} handlerFunction the function need to execute
 * @param {Object} decodedToken auth token
 */
const handleResponse = async ({ req, res, handler, decodedToken }) => {
  req.body = { ...req.query, ...req.body, ...req.params, decodedToken };

  if (
    !(
      req.body &&
      req.body.operationName &&
      req.body.operationName === 'IntrospectionQuery'
    )
  ) {
    logger.debug(
      `${nameSpace} :handleResponse => ${JSON.stringify(req.body)} `,
    );
  }

  const result = await handler(req.body);

  // Clone the result because the delete object function will remove the memory value
  const cloneResult = { ...result };
  const { status = 200 } = cloneResult;

  delete cloneResult.status;
  if (Object.keys(cloneResult).length > 0)
    return res.status(status).json(cloneResult);
  res.status(status).json();
};

export { wrapResponse };
