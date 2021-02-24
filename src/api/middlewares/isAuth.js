const jwt = require('jsonwebtoken');
const { JWT_ACCESS, JWT_REFRESH } = require('../../config');
const tokenService = require('../../services/tokenService');

module.exports = function isAuth(req, res, next)
{
    const accessToken = req.cookies.accessToken_HeaderPayload + req.cookies.accessToken_Signature
    const refreshToken = req.cookies.refreshToken;

    jwt.verify(accessToken, JWT_ACCESS.SECRET, { algorithms: JWT_ACCESS.ALGORITHM }, (errAcc, decodedAcc) => 
    {
        if (errAcc)
        {
            jwt.verify(refreshToken, JWT_REFRESH.SECRET, { algorithms: JWT_REFRESH.ALGORITHM }, (errRef, decodedRef) =>
            {
                if (errRef) 
                {
                    res.locals.isAuth = false;
                    next();
                    //return res.status(403).redirect('/users/register');
                }
                else
                {
                    const payload = {
                        id: decodedRef.id,
                        email: decodedRef.email,
                        user_role: decodedRef.user_role
                    };

                    res.locals.user = decodedRef;
                    res.locals.isAuth = true;
                    Promise.all(
                        [
                            tokenService.generateAccessToken(payload),
                            tokenService.generateRefreshToken(payload)
                        ]
                    ).then(([newAccessToken, newRefreshToken]) => 
                    {
                        const [newAccessToken_HeaderPayload, newAccessToken_Signature] = tokenService.splitToken(newAccessToken);
                        tokenService.setTokenCookies(res, newAccessToken_HeaderPayload, newAccessToken_Signature, newRefreshToken);
                        next();
                    });
                }
            });
        }
        else
        {
            res.locals.isAuth = true;
            res.locals.user = decodedAcc;
            if (!refreshToken)
            {
                const payload = {
                    id: decodedAcc.id,
                    email: decodedAcc.email,
                    user_role: decodedAcc.user_role
                };

                tokenService.generateRefreshToken(payload)
                    .then((newRefreshToken) => 
                    {
                        tokenService.setTokenCookies(res, null, null, newRefreshToken);
                        next();
                    });
            }
            else
                next();
        }
    });
}