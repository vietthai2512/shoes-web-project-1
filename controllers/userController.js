const { db } = require('../database');
const { signUp } = require('../services/authService');

exports.userDetail = function userDetail(req, res, next)
{
    res.send('TODO: user detail');
}

exports.userCreateGET = function (req, res, next)
{
    res.render('register');
}

exports.userCreatePOST = function (req, res, next)
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

    signUp(newUser)
        .then(userInfo =>
        {
            res.render('login', { id: userInfo.id })
        })
        .catch(e => 
        {
            console.log(e.message);
            res.redirect('/users/register');
        });

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