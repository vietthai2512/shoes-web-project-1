import express, { Errback, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import routes from '../api/routes';

export default (app: express.Application) =>
{
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors({ credentials: true, origin: true }));

    app.use('/', routes());

    // catch 404 and forward to error handler
    app.use(function (req, res, next)
    {
        next(createError(404));
    });

    // error handler
    app.use(function (err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction)
    {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};