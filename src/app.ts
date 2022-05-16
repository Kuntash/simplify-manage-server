import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import authController from './controllers/authController';
import globalErrorHandler from './controllers/errorController';
import orgRoutes from './routes/orgRoutes';
import subOrgRoutes from './routes/subOrgRoutes';
const app = express();

app.use(express.json());

// NOTE: For routes related to organisation, use orgRoutes;

app.use('/api/v1/org', orgRoutes);
app.use('/api/v1/suborg', subOrgRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Your request was successful',
  });
});

// NOTE: Any Error in the upper routes with be handled by the global error handler
app.use(globalErrorHandler);
export default app;
