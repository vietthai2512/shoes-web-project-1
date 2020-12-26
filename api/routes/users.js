const express = require('express');
const router = express.Router();
const { db, pgp } = require('../../database');
const userController = require('../../controllers/userController');
const middlewares = require('../middlewares');

const testUser =
{
    email: 'newnewnewuser@gmail.com',
    password: '12345',
    firstname: 'new',
    middlename: '',
    lastname: 'User',
    phonenumber: '01123',
    user_role: 'admin'
};

const updateUser =
{
    id: 'af599bd2-064d-4dd2-acb2-8eff4b5f41bb',
    email: 'ver@gmail.com',
    password: '2356789',
    middlename: 'tesst',
    user_role: 'customer'
};
const id = '77e366c7-7aab-4f46-bc39-77dc502049bd'
//const condition = pgp.as.format(' WHERE id = ${id}', updateUser);
//const query = pgp.helpers.update(updateUser, ['?id', 'email', 'password', 'middlename'], 'users') + condition;
//console.log(query);

//db.users.update(updateUser);
//db.users.insert(testUser);
/* GET users listing. */
router.get('/login', userController.userLogInGET);
//db.users.insert(testUser).then(result => console.log(`added ${result.id}`));
//db.users.empty();
//db.users.delete(id).then(result => console.log(`deleted ${result.id}`));
//db.users.count().then(console.log).catch(console.log);
//db.users.all().then(console.log).catch(console.log);
//db.none(query).catch(console.log);
//res.render('login');


router.post('/login', userController.userLogInPOST);

router.get('/register', userController.userCreateGET);

router.post('/register', userController.userCreatePOST);

router.get('/me', /*middlewares.isAuth, middlewares.attachCurrentUser,*/(req, res, next) => 
{
    console.log(req.cookies.refreshToken);
    res.send('hello');
    //res.render('me');
    //console.log(req.cookies);
    //return res.set('Authorization', 'Bearer ' + req.cookies['access_token']).json({ user: req.currentUser }).status(200);
});

router.post('/me'/*, middlewares.isAuth, middlewares.attachCurrentUser*/, (req, res, next) => 
{
    console.log(req.cookies);
    res.send('hello');
    //return res.json({ user: req.currentUser }).status(200);
});

router.post('/refresh_token');

module.exports = router;
