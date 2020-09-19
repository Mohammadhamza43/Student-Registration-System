const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

const auth = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            res.status(401).send({error: 'Unauthorised access!'});
            return ;
        }
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, 'StdRegSystemMeanTest');

        const user = await User.findOne({_id: data._id, 'tokens.token': token});
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send(e + 'Unauthorised access!');
    }
};
module.exports = {auth};
