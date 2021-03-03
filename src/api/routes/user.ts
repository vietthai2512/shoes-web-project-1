import { Request, Response, Router, NextFunction } from 'express';
import middlewares from '../middlewares';
import * as userController from '../../controllers/userController';
import { User } from '../../database/models';

const testUser: User =
{
    email: 'newnewnewuser@gmail.com',
    password: '12345',
    first_name: 'new',
    middle_name: '',
    last_name: 'User',
    phone_number: '01123',
    user_role: 'admin'
};

const updateUser: User =
{
    id: 'af599bd2-064d-4dd2-acb2-8eff4b5f41bb',
    email: 'ver@gmail.com',
    password: '2356789',
    middle_name: 'tesst',
    user_role: 'customer'
};

const route = Router();

export default (app: Router) => 
{
    app.use('/user', route);

    route.get('/login', middlewares.isAuth, userController.userLogInGET);

    route.post('/login', userController.userLogInPOST);

    route.get('/register', middlewares.isAuth, userController.userCreateGET);

    route.post('/register', userController.userCreatePOST);

    route.get('/me', middlewares.isAuth, userController.userDetail);

    route.post('/me', middlewares.isAuth, (req, res, next) => 
    {
        //return res.json(res.locals.user).status(200);
    });

    route.post('/refresh_token');

    route.get('/logout', (req, res, next) =>
    {
        res.clearCookie('accessToken_HeaderPayload')
            .clearCookie('accessToken_Signature')
            .clearCookie('refreshToken')
            .redirect('/users/login');
    });

    route.get('/administration', middlewares.isAuth, userController.userAdministration);
};