
const jwt = require('jsonwebtoken');
const secret = 'thisissecretfromgnsserver'

exports.generateToken = async (user_info) => {
    try {
        let token = await jwt.sign({
            payload: user_info
        }, secret, {
            expiresIn: '7d'
        }
        );
        return token;
    } catch (error) {
        return console.log("error in generating token")
    }
}