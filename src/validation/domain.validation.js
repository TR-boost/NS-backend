const joi = require('joi');

exports.domainValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        domainName :joi.string().required(),
        domainNameHash: joi.number().required(),
        tldName: joi.number().required()
    }));
    return schema.validate(req, {abortEarly: false});
}
