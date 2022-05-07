import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: 'success',
    message: 'get request to root route working perfectly',
  });
});

export default app;
