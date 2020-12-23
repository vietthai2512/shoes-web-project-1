const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { db } = require('../database');
const { JWT_ACCESS } = require('../config')

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

exports.logIn = async function (user)
{
    const result = await db.users.findByEmail(user.email);

    if (result === null)
    {
        throw new Error('Your email or password was incorrect.');
    }

    if (await argon2.verify(result.password, user.password))
    {
        console.log('Correct password');
        const payloadToken = {
            id: result.id,
            email: user.email
        }
        return generateAccessToken(payloadToken);
    }
    else
        throw new Error('Your email or password was incorrect.');
}

function generateAccessToken(payload)
{
    return jwt.sign(payload, JWT_ACCESS.SECRET, { algorithm: JWT_ACCESS.ALGORITHM, expiresIn: JWT_ACCESS.EXP });
}