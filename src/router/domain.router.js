const router = require('express').Router();
const domainController = require('../controller/domain.controller');
const domainValidation = require('../validation/domain.validation')
const { validationFormat } = require('../utils/messageFormat')
const auth = require('../utils/authenticate.js')

router.get('/:domainId',(req,res)=>{
    return domainController.getDomain(req,res);
})

router.post('/create',auth,(req,res)=>{
    try {
        let { error } = domainValidation();
        if (error) {
            return res.status(400).send(validationFormat(error, 'TLD', 400))
        }
        return domainController.createDomain(req,res)
    } catch (error) {
        return res.send(error.message)
    }
    
})

router.put('/update/:domainId', auth , (req,res) => {
    return domainController.updatedomain(req,res)
})

router.delete('/delete/:id', auth,(req,res) => {
    return domainController.deleteDomain(req,res)
})
