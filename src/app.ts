import express from 'express';
import errorHandlerMiddleware from './middleware/errorHandler';

const app = express();

app.use(express.json());

// app.use('/', apiWebHookRoutes);
// app.use('/', authRoutes);

app.get('/', (req, res) => {
	res.json({ message: 'Hello World'});
});
app.use(errorHandlerMiddleware);

export default app;
