import { Router } from 'express';

const route = Router();

export default (app: Router) => 
{
    app.use('/', route);

    route.get('/', function (req, res, next) 
    {
        res.render('index', { title: 'Shoes store' });
    });
};
