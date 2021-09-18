import express from 'express';
import expressHealthCheck from 'express-healthcheck';
import swaggerUi from 'swagger-ui-express';
import versionHealthCheck from 'version-healthcheck';
import CONFIG from 'constants/config';
import commentsController from 'controllers/comment';
import apiSwagger from 'swagger/apis.json';

const router = express.Router();

/* Monitoring */
router.get(
  '/up',
  expressHealthCheck({
    healthy: () => ({ result: 'OK' }),
  }),
);

if (CONFIG.ENVIRONMENT === 'development') {
  router.get('/version', versionHealthCheck);
  /* Swagger Doc */
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(apiSwagger));
}

/* User endpoints */
router.get(
  '/orgs/:orgName/comments',
  commentsController.getCommentsByOrganization,
);

router.post(
  '/orgs/:orgName/comments',
  commentsController.updatePostAndOrganization,
);
router.delete('/orgs/:orgName/comments', commentsController.deleteComments);

export default router;
