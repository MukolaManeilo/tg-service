import { Router } from 'express';
import { instanceApiHandler } from './instanceApiController';
import { internalAuth } from '../middlewares/internalAuthMiddleware';

const router = Router();
router.post('/sendMessage', internalAuth, instanceApiHandler);

export default router;
