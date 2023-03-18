const joi = require('joi');

exports.tldValidation = (req) => {
    let schema = joi.object().keys(Object.assign({
        name :joi.string().required(),
        name_hash: joi.number().required()
    }));
    return schema.validate(req, {abortEarly: false});
}