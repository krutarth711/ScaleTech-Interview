const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserToken = (user, type = 'user') => {
    console.log("UserData ============>", user);
    const payload = {
        id: user.id.toString()
    };
    const token = jwt.sign(payload, process.env.jwt_secret);     // process.env
    console.log("Token :-", token);
    payload.token = token;
    console.log("payload :-", payload);

    return payload;
};

const isAuthorized = () => async (req, res, next) => {
    let token = null;
    if(req.headers.authorization){
        token = req.headers.authorization.replace("Bearer", "").trim();        
    }

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};


module.exports = {
    createUserToken,
    isAuthorized
};