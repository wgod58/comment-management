import { commentModel, organizationModel } from 'models/index';
import logger from 'utils/logger';

const nameSpace = 'service/comment';

async function updatePostAndOrganization({ comment, orgName }) {
  const [org] = await organizationModel.findOrCreate({
    where: { orgName },
  });
  const commentInstance = await commentModel.create({ comment });

  await org.addComment(commentInstance);

  logger.info(
    `${nameSpace} :updatePostAndOrganization success =>orgName:${orgName}  comment:${comment}`,
  );
}

async function getCommentsByOrganization({ orgName }) {
  const org = await organizationModel.findOne({
    where: { orgName },
  });
  const comments = await org.getComments({
    where: { deleteMark: false },
    raw: true,
  });

  logger.info(`${nameSpace} :getCommentsByOrganization =>${orgName}  `);

  return comments;
}

async function deleteComments({ orgName }) {
  const org = await organizationModel.findOne({ where: { orgName } });

  const [updateNumber] = await commentModel.update(
    { deleteMark: true },
    { where: { organizationId: org.id } },
  );

  logger.info(`${updateNumber} comments updated`);
}

export default {
  deleteComments,
  getCommentsByOrganization,
  updatePostAndOrganization,
};
