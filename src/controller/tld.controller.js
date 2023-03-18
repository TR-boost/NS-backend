const initModels = require('../models/init-models');
const _ = require('lodash');
const { sequelize } = require('../models');
const models = initModels(sequelize)
const { successFormat, errorMsgFormat } = require('../utils/messageFormat.js')

exports.getTld = async(req,res) =>{
    try {
        const { tld_id } = req.params;
        const tld = await models.tld.findOne({
            where :{
                id : tld_id
            },
            attributes:['id', 'tldName','tldNameHash']
        })
        if (!tld){
            return res.send(`No TLD with ${tld.id} exists`)
        }
        else{
            return res.send(successFormat({id : tld_id, tldName : tld.tldName, tldNameHash : tld.tldNameHash }), "TLD")        }
    } catch (error) {
        return res.status(500).send(errorMsgFormat(error.message, 'TLD', 500));

    }
}

exports.createTld = async(req,res) =>{
    try { 
        const {
            name,
            name_Hash
        } = req.body;
        const _isExist = await models.tld.findOne({
            where : {
                tldName : name,
                tldNameHash : name_Hash
            }
        })
        if(!_isExist){
        await models.tld.create({
            tldName : name,
            tldNameHash : name_Hash
        })
        return res.send("TLD created successfully!!");
    }else {
        return res.send(`TLD with ${name} and ${name_Hash} already exists!!`)
    }
    } catch (error) {
        return res.status(500).send(errorMsgFormat(error.message, 'TLD', 500))
    }
}