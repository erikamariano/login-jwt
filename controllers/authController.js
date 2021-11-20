const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('authorization-token');
    if(!token) return res.status(401).send('Access denied - You do not have any token!');

    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = userVerified;

        next();

    } catch (error){
        return res.status(401).send('Access denied - Token do not match!');
    }
}