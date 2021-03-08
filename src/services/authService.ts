import argon2 from 'argon2';
import { User } from '../database/models';
import { db } from '../database';
import { generateAccessToken, generateRefreshToken } from './tokenService';

export async function signUp(newUser: User): Promise<User>
{
    try 
    {
        const [hashedPassword, existsEmail] = await Promise.all([
            argon2.hash(newUser.password!, { type: argon2.argon2id }),
            db.users.existsEmail(newUser.email!),
        ]);

        if (existsEmail) throw new Error('This email address is not available. Choose a different email address.');

        newUser.password = hashedPassword;

        const userRecord = await db.users.insert(newUser);

        if (!userRecord) 
        {
            throw new Error('User cannot be created.');
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

export async function logIn(user: User) 
{
    const userRecord = await db.users.findByEmail(user.email!);

    if (userRecord === null) 
    {
        throw new Error('Your email or password was incorrect.');
    }

    if (await argon2.verify(userRecord.password!, user.password!)) 
    {
        console.log('Correct password');
        const payloadToken = {
            id: userRecord.id,
            email: user.email,
            user_role: userRecord.user_role,
        };

        const [accessToken, refreshToken] = await Promise.all([
            generateAccessToken(payloadToken),
            generateRefreshToken(payloadToken),
        ]);

        return [accessToken, refreshToken];
    }
    else throw new Error('Your email or password was incorrect.');
}
