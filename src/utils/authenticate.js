const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { errorMsgFormat } = require('./messageFormat');
const { sequelize } = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize)
const secret = 'thisissecretfromgnsserver'

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token)
            if (token) {
                jwt.verify(token, secret, async (err, decode) => {
                    if (err) {
                        console.log(err)
                       return res.send({
                            code: 400,
                            message: 'Invalid Token',
                            error:err.message
                        })
                    } else {
                        console.log('payload', decode.payload.id)
                       let isExists = await models.users.findOne({
                           where :{
                            id: decode.payload.id
                           }
                        });
                        if(_.isEmpty(isExists)) {
                            return res.send(errorMsgFormat('User not exists', 'Auth'))
                        }
                        req.user = decode.payload;
                        return next();
                    }
                })
            } else {
                console.log('token not found')
               return res.send({
                    error: true,
                    message: 'Token not Found',
                })
            }
        
    } catch (error) {
        console.log('error in auth', error.message, error.stack)
        return res.send(errorMsgFormat(error.message, 'Auth'))
    }
}