const { db } = require('../database');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');

exports.userAdministration = function (req, res, next)
{
    if (!res.locals.isAuth)
    {
        res.redirect('/users/login');
    }
    else
    {
        if (res.locals.user.user_role === 'admin')
        {
            res.send('Welcome to admin page');
        }
        else
        {
            res.redirect('/users/me');
        }
    }
}

exports.userDetail = async function (req, res, next)
{
    if (!res.locals.isAuth)
    {
        res.redirect('/users/login');
    }
    else
    {
        const userDetail = await db.users.findByID(res.locals.user.id);
        Reflect.deleteProperty(userDetail, 'password');
        res.json(userDetail).status(200);
    }
}

exports.userCreateGET = function (req, res, next)
{
    if (res.locals.isAuth)
        res.redirect('/users/me');
    else
        res.render('users/register');
}

exports.userCreatePOST = async function (req, res, next)
{
    try
    {
        const newUser =
        {
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber
        };

        const createdUser = await authService.signUp(newUser);

        return res.status(201).render('users/login', { id: createdUser.id });
    }
    catch (e)
    {
        res.status(409).render('users/register', { error: e });
        //return next(e);
    }
}

exports.userLogInGET = function (req, res, next)
{
    if (res.locals.isAuth)
        res.redirect('/users/me');
    else
        res.render('users/login');
}

exports.userLogInPOST = async function (req, res, next)
{
    try
    {
        const user =
        {
            email: req.body.email,
            password: req.body.password
        }

        const [accessToken, refreshToken] = await authService.logIn(user);
        const [accessToken_HeaderPayload, accessToken_Signature] = tokenService.splitToken(accessToken);

        res.status(200);
        tokenService.setTokenCookies(res, accessToken_HeaderPayload, accessToken_Signature, refreshToken);
        //res.render('login', { success: `Correct password. Your access token is ${accessToken}, your refresh token is ${refreshToken}` });
        res.redirect('/users/me');
    }
    catch (e)
    {
        res.render('users/login', { error: e });
    }
}

exports.userUpdateGET = function (req, res, next)
{
    res.send('TODO: user update GET');
}

exports.userUpdatePOST = function (req, res, next)
{
    res.send('TODO: user update POST');
}

exports.userDeleteGET = function (req, res, next)
{
    res.send('TODO: user delete GET');
}

exports.userDeletePOST = function (req, res, next)
{
    res.send('TODO: user delete POST');
}