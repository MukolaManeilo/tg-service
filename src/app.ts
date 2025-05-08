import express from 'express';
import helmet from 'helmet';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import webhookRoutes from './webhook/webhookRoutes';
import instanceApiRoutes from './instanceApi/instanceApiRoutes';

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/', webhookRoutes);
app.use('/', instanceApiRoutes);

app.get('/healthcheck', (req, res) => {
	res.json({ message: 'OK' });
});
app.use(errorHandlerMiddleware);

export default app;
