const argon2 = require('argon2');
const { db } = require('../database');

exports.signUp = async function (newUser)
{
    try
    {
        newUser.password = await argon2.hash(newUser.password, { type: argon2.argon2id });
        //console.log(newUser.email);
        //db.users.existsEmail(newUser.email).then(console.log);
        if (await db.users.existsEmail(newUser.email))
        {
            console.log('email exists');
        }
        //await db.users.insert(newUser);
    }
    catch (e)
    {
        console.log(e);
    }
    //console.log(newUser);
}
