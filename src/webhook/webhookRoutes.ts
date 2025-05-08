import { Router } from 'express';
import { webhookHandler } from './webHookController';

const router = Router();
router.post('/webhook', webhookHandler);

export default router;
