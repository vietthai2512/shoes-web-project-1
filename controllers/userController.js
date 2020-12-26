const { db } = require('../database');
const authService = require('../services/authService');
const { JWT_ACCESS, JWT_REFRESH } = require('../config')

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
        const dotLastIndex = accessToken.lastIndexOf('.');
        const accessToken_HeaderPayload = accessToken.slice(0, dotLastIndex);
        const accessToken_Signature = accessToken.slice(dotLastIndex);

        res.status(200)
            .cookie('accessToken_HeaderPayload', accessToken_HeaderPayload, { expires: new Date(Date.now() + JWT_ACCESS.EXP), maxAge: JWT_ACCESS.EXP/*, secure: true, /*sameSite: true*/ })
            .cookie('accessToken_Signature', accessToken_Signature, { expires: new Date(Date.now() + JWT_ACCESS.EXP), maxAge: JWT_ACCESS.EXP/*, secure: true/*, sameSite: true*/, httpOnly: true })
            .cookie('refreshToken', refreshToken, { expires: new Date(Date.now() + JWT_REFRESH.EXP), maxAge: JWT_REFRESH.EXP/*, secure: true/*, sameSite: true*/, httpOnly: true })
            .render('login', { success: `Correct password. Your access token is ${accessToken}, your refresh token is ${refreshToken}` });
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