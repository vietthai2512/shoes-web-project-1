const argon2 = require('argon2');
const { promiseImpl } = require('ejs');
const { db } = require('../database');

exports.signUp = async function (newUser)
{
    let [hashedPassword, existsEmail] = await Promise.all(
        [
            argon2.hash(newUser.password, { type: argon2.argon2id }),
            db.users.existsEmail(newUser.email)
        ]
    );

    if (existsEmail)
    {
        throw new Error('This email address is not available. Choose a different address.');
    }

    newUser.password = hashedPassword;

    return await db.users.insert(newUser);
}
