import responses from 'constants/responses';
import commentService from 'services/comment';
import logger from 'utils/logger';

const nameSpace = 'controller/comment';

async function updatePostAndOrganization(req, res) {
  try {
    const data = { ...req.query, ...req.body, ...req.params };
    const { comment, orgName } = data;

    if (!(comment && orgName)) {
      logger.info(
        `${nameSpace} :updatePostAndOrganization =>Miss params comment:${comment} orgName:${orgName}`,
      );
      return res
        .status(responses.MISS_PARAMETERS.status)
        .json(responses.MISS_PARAMETERS.message);
    }

    await commentService.updatePostAndOrganization({ comment, orgName });

    res.status(responses.UPDATE_SUCCESS.status).json();
  } catch (error) {
    res.status(responses.SERVER_ERROR.status).json(error.message);
  }
}

async function getCommentsByOrganization(req, res) {
  try {
    const data = { ...req.query, ...req.body, ...req.params };
    const { orgName } = data;

    if (!orgName) {
      logger.info(
        `${nameSpace} :getCommentsByOrganization =>Miss params orgName:${orgName}`,
      );
      return res
        .status(responses.MISS_PARAMETERS.status)
        .json(responses.MISS_PARAMETERS.message);
    }

    const comments = await commentService.getCommentsByOrganization({
      orgName,
    });

    res.status(responses.OK.status).json(comments);
  } catch (error) {
    res.status(responses.SERVER_ERROR.status).json(error.message);
  }
}

async function deleteComments(req, res) {
  try {
    const data = { ...req.query, ...req.body, ...req.params };
    const { orgName } = data;

    if (!orgName) {
      logger.info(
        `${nameSpace} :deleteComments =>Miss params orgName:${orgName}`,
      );
      return res
        .status(responses.MISS_PARAMETERS.status)
        .json(responses.MISS_PARAMETERS.message);
    }

    await commentService.deleteComments({ orgName });

    res.status(responses.UPDATE_SUCCESS.status).json();
  } catch (error) {
    res.status(responses.SERVER_ERROR.status).json(error.message);
  }
}

export default {
  deleteComments,
  getCommentsByOrganization,
  updatePostAndOrganization,
};
