import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { router } from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin, // ex: https://seu-app.vercel.app
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1', router);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});