import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/UserRoutes';
import { SessionMiddleware } from './middleware/sessionMiddleware';

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

app.use(userRoutes);


export default app;