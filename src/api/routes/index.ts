import { Router } from 'express';
import userRoutes from './user';
import defaultRoutes from './default';

export default () =>
{
    const app = Router();

    userRoutes(app);
    defaultRoutes(app);

    return app;
};