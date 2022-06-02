import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import authController from './controllers/authController';
import globalErrorHandler from './controllers/errorController';
import orgRoutes from './routes/orgRoutes';
import subOrgRoutes from './routes/subOrgRoutes';
import gradeRoutes from './routes/gradeRoutes';
import sectionRoutes from './routes/sectionRoutes';
import subjectRoutes from './routes/subjectRoutes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NOTE: For routes related to organisation, use orgRoutes;

app.use('/api/v1/org', orgRoutes);
app.use('/api/v1/suborg', subOrgRoutes);
app.use('/api/v1/grade', gradeRoutes);
app.use('/api/v1/section', sectionRoutes);
app.use('/api/v1/subject', subjectRoutes);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'This is the root router',
  });
});

// NOTE: Any Error in the upper routes with be handled by the global error handler
app.use(globalErrorHandler);
export default app;
