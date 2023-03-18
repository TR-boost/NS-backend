const initModels = require('../models/init-models');
const _ = require('lodash');
const { sequelize } = require('../models');
const models = initModels(sequelize)
const { successFormat, errorMsgFormat } = require('../utils/messageFormat.js')

exports.getDomain = async(req,res) =>{
    try {
        const { domain_id } = req.params;
        const domain = await models.domains.findOne({
            where :{
                id : domain_id
            },
            attributes:['id', 'domainName','domainNameHash']
        })
        if (!domain){
            return res.send(`No TLD with ${domain_id} exists`)
        }
        else{
            return res.send(successFormat(
                {
                    id : domain.id,
                    domainName : domain.tldName, 
                    domainNameHash : domain.domainNameHash, 
                    tld_id : domain.tld_id,
                    user_id : domain.user_id 
                }),
                 "Domain"
            )}
    } catch (error) {
        return res.status(500).send(errorMsgFormat(error.message, 'Domain', 500));

    }
}

exports.createDomain = async(req,res) =>{
    try { 
        const {
            name,
            name_Hash,
            tldName,
        } = req.body;
        const user_id = req.user.id
        const tld = await models.tld.finOne({
            where :{
                tldName : tldName
            }
        })
        const _isExist = await models.domains.findOne({
            where : {
                user_id : user_id,
                domainName : name,
            }
        })
        if(!_isExist){
        await models.domains.create({
            domainName : name,
            domainNameHash : name_Hash,
            tld_id : tld.id,
            user_id : user_id
        })
        return res.send("TLD created successfully!!");
    }else {
        return res.send(`TLD with ${name} and ${name_Hash} already exists!!`)
    }
    } catch (error) {
        return res.status(500).send(errorMsgFormat(error.message, 'TLD', 500))
    }
}

exports.updatedomain = async(req,res) => {
    try {
        
    } catch (error) {
        console.log("Error in updating domain",error.message, error.stack)
    }
}

exports.deleteDomain = async(req,res) => {
    try {
        
    } catch (error) {
        console.log("Error in deleting Domain",error.msg, error.stack)
    }
}