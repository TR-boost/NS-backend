const joi = require('joi');

exports.subdomainValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        subdomainName :joi.string().required(),
        subdomainNameHash : joi.number().required(),
        domainName : joi.number().required()
    }));
    return schema.validate(req, {abortEarly: false});
}