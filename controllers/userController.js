const { db } = require('../database');
const authService = require('../services/authService');

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
    const users = [];
    try
    {
        users.push(
            {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                phonenumber: req.body.phonenumber
            });
        //const authServiceInstance = new AuthService();
        //await authServiceInstance.SignUp(users[0]);
        authService.signUp(users[0]);

        res.redirect('/users/login');
    }
    catch (e)
    {
        console.log(e);
        res.redirect('/users/register');
    }
    //console.log(users);
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