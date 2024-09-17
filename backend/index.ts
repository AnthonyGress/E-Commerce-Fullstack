import express, { Application, NextFunction, Request, Response } from 'express';
import { routes } from './src/routes';
import { Route } from './src/types/route';
import * as BodyParser from 'body-parser';
import { config } from 'dotenv';
import cors, { CorsOptions } from 'cors';
import { HttpError } from './src/error/http-error';

config();

const app: Application = express();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dynamicApiRouter: any = null;

// implement JWT checking in production
const checkAuth = () => null;

const setupDynamicRouter = (route_configs: Route[]): void => {
  dynamicApiRouter = express.Router();
  for (const route of route_configs) {
    if (route.isAuthenticated) {
      dynamicApiRouter.use(checkAuth)[route.method](route.path, route.handler);
    } else {
      dynamicApiRouter[route.method](route.path, route.handler);
    }
  }
};

const errorHandler = (error: HttpError, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error.stack);
  const status = error.status || 500;
  response.status(status).send({ error: error.message });
};

setupDynamicRouter(routes);


const origins: string = process.env.WHITELIST_ORIGINS as string;

const corsOptions: CorsOptions = {
  origin: origins
};

app.use(cors(corsOptions));
app.use(BodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => dynamicApiRouter(req, res, next));

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err: HttpError = new Error('Not found');
  err.status = 404;
  next(err);
});

app.listen(3001, () => {
  console.info('server running at localhost:3001');
});

app.use(errorHandler);
