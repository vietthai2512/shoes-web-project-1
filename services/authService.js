const argon2 = require('argon2');
const { db } = require('../database');
const { generateAccessToken, generateRefreshToken } = require('./tokenService')

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
            email: user.email,
            user_role: userRecord.user_role
        }
        return [accessToken, refreshToken] = await Promise.all(
            [
                generateAccessToken(payloadToken),
                generateRefreshToken(payloadToken)
            ]);
    }
    else
        throw new Error('Your email or password was incorrect.');
}