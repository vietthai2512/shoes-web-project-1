import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../database/models';
import { JWT_ACCESS, JWT_REFRESH } from '../../config';
import { generateAccessToken, generateRefreshToken, setTokenCookies, splitToken } from '../../services/tokenService';

function isAuth(req: Request, res: Response, next: NextFunction) 
{
    const accessToken: string = req.cookies.accessToken_HeaderPayload + req.cookies.accessToken_Signature;
    const refreshToken: string = req.cookies.refreshToken;

    jwt.verify(accessToken, JWT_ACCESS.SECRET, { algorithms: [JWT_ACCESS.ALGORITHM] }, (errAcc, decodedAcc) => 
    {
        if (errAcc) 
        {
            jwt.verify(
                refreshToken,
                JWT_REFRESH.SECRET,
                { algorithms: [JWT_REFRESH.ALGORITHM] },
                (errRef, decodedRef) => 
                {
                    if (errRef) 
                    {
                        res.locals.isAuth = false;
                        next();
                        //return res.status(403).redirect('/users/register');
                    }
                    else 
                    {
                        const _decodedRef = decodedRef as User;
                        const payload = {
                            id: _decodedRef.id,
                            email: _decodedRef.email,
                            user_role: _decodedRef.user_role,
                        };

                        res.locals.user = _decodedRef;
                        res.locals.isAuth = true;
                        Promise.all([generateAccessToken(payload), generateRefreshToken(payload)]).then(
                            ([newAccessToken, newRefreshToken]) => 
                            {
                                const [newAccessToken_HeaderPayload, newAccessToken_Signature] = splitToken(
                                    newAccessToken,
                                );
                                setTokenCookies(
                                    res,
                                    newAccessToken_HeaderPayload,
                                    newAccessToken_Signature,
                                    newRefreshToken,
                                );
                                next();
                            },
                        );
                    }
                },
            );
        }
        else 
        {
            const _decodedAcc = decodedAcc as User;
            res.locals.isAuth = true;
            res.locals.user = _decodedAcc;
            if (!refreshToken) 
            {
                const payload = {
                    id: _decodedAcc.id,
                    email: _decodedAcc.email,
                    user_role: _decodedAcc.user_role,
                };

                generateRefreshToken(payload).then((newRefreshToken) => 
                {
                    setTokenCookies(res, undefined, undefined, newRefreshToken);
                    next();
                });
            }
            else next();
        }
    });
}

export default isAuth;
