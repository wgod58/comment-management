import express from 'express';
import expressHealthCheck from 'express-healthcheck';
import swaggerUi from 'swagger-ui-express';
import versionHealthCheck from 'version-healthcheck';
import CONFIG from 'constants/config';
import * as commentsController from 'controllers/comments';
import apiSwagger from 'swagger/apis.json';
import { wrapResponse } from 'utils/responseHandler';

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
  wrapResponse(commentsController.updateUser),
);

router.post(
  '/send-password-changed-email',
  wrapResponse(commentsController.sendPasswordChangedNotification),
);
router.delete(
  '/unsubscribe/:email',
  wrapResponse(commentsController.unsubscribe),
);

export default router;
