const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { db } = require('../database');
const { JWT_ACCESS, JWT_REFRESH } = require('../config')

exports.signUp = async function (newUser)
{
    try
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

        const userRecord = await db.users.insert(newUser);

        if (!userRecord)
        {
            throw new Error('User cannot be created');
        }

        const createdUser = userRecord;
        Reflect.deleteProperty(createdUser, 'password');

        return createdUser;
    }
    catch (e)
    {
        throw e;
    }
}

exports.logIn = async function (user)
{
    const userRecord = await db.users.findByEmail(user.email);

    if (userRecord === null)
    {
        throw new Error('Your email or password was incorrect.');
    }

    if (await argon2.verify(userRecord.password, user.password))
    {
        console.log('Correct password');
        const payloadToken = {
            id: userRecord.id,
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

function generateRefreshToken(payload)
{
    return jwt.sign(payload, JWT_REFRESH.SECRET, { algorithm: JWT_REFRESH.ALGORITHM, expiresIn: JWT_REFRESH.EXP });
}