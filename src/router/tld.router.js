const router = require('express').Router();
const tldController = require('../controller/tld.controller');
const tldValidation = require('../validation/tld.validation')
const { validationFormat } = require('../utils/messageFormat')
const admin = require('../utils/admin.js')

router.get('/:tldId',(req,res)=>{
    return tldController.getTld(req,res);
})


// only for the TLD creators
router.post('/create',admin,(req,res)=>{
    try {
        let { error } = tldValidation(req);
        if (error) {
            return res.status(400).send(validationFormat(error, 'TLD', 400))
        }
        return tldController.createTld(req,res)
    } catch (error) {
        return res.send(error.message)
    }
    
})