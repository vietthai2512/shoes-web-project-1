const { db } = require('../database');
const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const { JWT_ACCESS, JWT_REFRESH } = require('../config');

exports.userDetail = function userDetail(req, res, next)
{
    res.send('TODO: user detail');
}

exports.userCreateGET = function (req, res, next)
{
    res.render('register');
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

        return res.status(201).render('login', { id: createdUser.id });
    }
    catch (e)
    {
        res.status(409).render('register', { error: e });
        //return next(e);
    }
}

exports.userLogInGET = function (req, res, next)
{
    if (res.locals.isAuth)
        res.redirect('/users/me');
    else
        res.render('login');
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
        res.render('login', { error: e });
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