const { db } = require('../../database')

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
module.exports = async function (req, res, next)
{
    try
    {
        const decodedUser = req.token.data;
        const userRecord = await db.users.findByID(decodedUser.id);

        if (!userRecord)
        {
            return res.sendStatus(401);
        }

        const currentUser = userRecord.toObject();
        Reflect.deleteProperty(currentUser, 'password');
        req.currentUser = currentUser;

        return next();
    }
    catch (e)
    {
        return next(e);
    }
}