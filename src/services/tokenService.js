const jwt = require('jsonwebtoken');
const { JWT_ACCESS, JWT_REFRESH } = require('../config');

exports.generateAccessToken = async function (payload)
{
    return await jwt.sign(payload, JWT_ACCESS.SECRET, { algorithm: JWT_ACCESS.ALGORITHM, expiresIn: JWT_ACCESS.EXP });
};

exports.generateRefreshToken = async function (payload)
{
    return await jwt.sign(payload, JWT_REFRESH.SECRET, { algorithm: JWT_REFRESH.ALGORITHM, expiresIn: JWT_REFRESH.EXP });
};

exports.splitToken = function (token)
{
    const dotLastIndex = token.lastIndexOf('.');
    const token_HeaderPayload = token.slice(0, dotLastIndex);
    const token_Signature = token.slice(dotLastIndex);

    return [token_HeaderPayload, token_Signature];
};

/**
 * Set JWT Cookies to res
 * @param {*} res  Express res Object
 * @param {*} valHeaderPayload  JWT's Header and Payload
 * @param {*} valSignature JWT's Signature
 * @param {*} valRefreshToken Refresh Token (Optional)
 */
exports.setTokenCookies = function (res, valHeaderPayload = null, valSignature = null, valRefreshToken = null)
{
    // Set Access Token
    if (valHeaderPayload && valSignature)
    {
        res.cookie('accessToken_HeaderPayload', valHeaderPayload, { expires: new Date(Date.now() + JWT_ACCESS.EXP), maxAge: JWT_ACCESS.EXP, secure: true, /*sameSite: true*/ })
            .cookie('accessToken_Signature', valSignature, { expires: new Date(Date.now() + JWT_ACCESS.EXP), maxAge: JWT_ACCESS.EXP, secure: true/*, sameSite: true*/, httpOnly: true });
    }

    // Set Refresh Token
    if (valRefreshToken)
        res.cookie('refreshToken', valRefreshToken, { expires: new Date(Date.now() + JWT_REFRESH.EXP), maxAge: JWT_REFRESH.EXP, secure: true/*, sameSite: true*/, httpOnly: true });
};