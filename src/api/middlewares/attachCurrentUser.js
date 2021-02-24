const { db } = require('../../database');

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async function (req, res, next)
{
    try
    {
        const userRecord = await db.users.findByID(req.token.id);

        if (!userRecord)
        {
            return res.sendStatus(401);
        }

        const currentUser = userRecord;
        Reflect.deleteProperty(currentUser, 'password');
        req.currentUser = currentUser;

        return next();
    }
    catch (e)
    {
        return next(e);
    }
};

module.exports = attachCurrentUser;