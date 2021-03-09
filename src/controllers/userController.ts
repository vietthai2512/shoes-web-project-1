import { NextFunction, Request, Response } from 'express';
import { db } from '../database';
import { logIn, signUp } from '../services/authService';
import { setTokenCookies, splitToken } from '../services/tokenService';

export const userAdministration = (req: Request, res: Response, next: NextFunction) => 
{
    if (!res.locals.isAuth) 
    {
        res.redirect('/user/login');
    }
    else 
    {
        if (res.locals.user.user_role === 'admin') 
        {
            res.send('Welcome to admin page');
        }
        else 
        {
            res.redirect('/user/me');
        }
    }
};

export const userDetail = async (req: Request, res: Response, next: NextFunction) => 
{
    if (!res.locals.isAuth) 
    {
        res.redirect('/user/login');
    }
    else 
    {
        const userDetail = await db.users.findByID(res.locals.user.id);
        // eslint-disable-next-line @typescript-eslint/ban-types
        Reflect.deleteProperty(userDetail as object, 'password');
        res.json(userDetail).status(200);
    }
};

export const userCreateGET = async (req: Request, res: Response, next: NextFunction) => 
{
    if (res.locals.isAuth) res.redirect('/user/me');
    else res.render('user/register');
};

export const userCreatePOST = async (req: Request, res: Response, next: NextFunction) => 
{
    try 
    {
        const newUser = {
            first_name: req.body.firstname as string,
            middle_name: req.body.middlename as string,
            last_name: req.body.lastname as string,
            email: req.body.email as string,
            password: req.body.password as string,
            phone_number: req.body.phonenumber as string,
        };

        const createdUser = await signUp(newUser);

        return res.status(201).render('user/login', { id: createdUser.id });
    }
    catch (e) 
    {
        res.status(409).render('user/register', { error: e });
        //return next(e);
    }
};

export const userLogInGET = function (req: Request, res: Response, next: NextFunction) 
{
    if (res.locals.isAuth) res.redirect('/user/me');
    else res.render('user/login');
};

export const userLogInPOST = async function (req: Request, res: Response, next: NextFunction) 
{
    try 
    {
        const user = {
            email: req.body.email as string,
            password: req.body.password as string,
        };

        const [accessToken, refreshToken] = await logIn(user);
        const [accessToken_HeaderPayload, accessToken_Signature] = splitToken(accessToken);

        res.status(200);
        setTokenCookies(res, accessToken_HeaderPayload, accessToken_Signature, refreshToken);
        //res.render('login', { success: `Correct password. Your access token is ${accessToken}, your refresh token is ${refreshToken}` });
        res.redirect('/user/me');
    }
    catch (e) 
    {
        res.render('user/login', { error: e });
    }
};

export const userUpdateGET = function (req: Request, res: Response, next: NextFunction) 
{
    res.send('TODO: user update GET');
};

export const userUpdatePOST = function (req: Request, res: Response, next: NextFunction) 
{
    res.send('TODO: user update POST');
};

export const userDeleteGET = function (req: Request, res: Response, next: NextFunction) 
{
    res.send('TODO: user delete GET');
};

export const userDeletePOST = function (req: Request, res: Response, next: NextFunction) 
{
    res.send('TODO: user delete POST');
};
