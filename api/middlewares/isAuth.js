const jwt = require('express-jwt');
const { JWT_ACCESS, JWT_REFRESH } = require('../../config');

const getTokenFromHeader = (req) => 
{
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
    )
    {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

exports.isAuth = jwt(
    {
        secret: JWT_ACCESS.SECRET,

    }
)