const jwt = require('express-jwt');
const { JWT_ACCESS, JWT_REFRESH } = require('../../config');

const getTokenFromCookies = (req) => 
{
    //if(req.cookies)
}

module.exports = jwt(
    {
        secret: JWT_ACCESS.SECRET,
        algorithms: [JWT_ACCESS.ALGORITHM],
        requestProperty: 'token',
        getToken: getTokenFromCookies
    }
);

