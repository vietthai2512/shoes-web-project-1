/* eslint-disable @typescript-eslint/ban-types */
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS, JWT_REFRESH } from '../config';

export async function generateAccessToken(payload: object) 
{
    return jwt.sign(payload, JWT_ACCESS.SECRET, { algorithm: JWT_ACCESS.ALGORITHM, expiresIn: JWT_ACCESS.EXP });
}

export async function generateRefreshToken(payload: object) 
{
    return jwt.sign(payload, JWT_REFRESH.SECRET, { algorithm: JWT_REFRESH.ALGORITHM, expiresIn: JWT_REFRESH.EXP });
}

export function splitToken(token: string) 
{
    const dotLastIndex = token.lastIndexOf('.');
    const token_HeaderPayload = token.slice(0, dotLastIndex);
    const token_Signature = token.slice(dotLastIndex);

    return [token_HeaderPayload, token_Signature];
}

export function setTokenCookies(
    res: Response,
    valHeaderPayload?: string,
    valSignature?: string,
    valRefreshToken?: string,
) 
{
    // Set Access Token
    if (valHeaderPayload && valSignature) 
    {
        res.cookie('accessToken_HeaderPayload', valHeaderPayload, {
            expires: new Date(Date.now() + JWT_ACCESS.EXP),
            maxAge: JWT_ACCESS.EXP,
            secure: true /*sameSite: true*/,
        }).cookie('accessToken_Signature', valSignature, {
            expires: new Date(Date.now() + JWT_ACCESS.EXP),
            maxAge: JWT_ACCESS.EXP,
            secure: true /*, sameSite: true*/,
            httpOnly: true,
        });
    }

    // Set Refresh Token
    if (valRefreshToken)
        res.cookie('refreshToken', valRefreshToken, {
            expires: new Date(Date.now() + JWT_REFRESH.EXP),
            maxAge: JWT_REFRESH.EXP,
            secure: true /*, sameSite: true*/,
            httpOnly: true,
        });
}
