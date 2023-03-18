const router = require('express').Router();
const subDomainController = require('../controller/subdomain.controller');
const subDomainValidation = require('../validation/subdomain.validation')
const { validationFormat } = require('../utils/messageFormat')
const auth = require('../utils/authenticate.js')

router.get('/:domainId',(req,res)=>{
    return subDomainController.getAllSubDomains(req,res);
})

router.post('/create',auth,(req,res)=>{
    try {
        let { error } = subDomainValidation();
        if (error) {
            return res.status(400).send(validationFormat(error, 'TLD', 400))
        }
        return subDomainController.createSubDomain(req,res)
    } catch (error) {
        return res.send(error.message)
    }

})

router.put('/update/:domainId', auth , (req,res) => {
    return subDomainController.updatesubdomain(req,res)
})

router.delete('/delete/:domainId', auth, (req,res) => {
    return subDomainController.deletesubDomain(req,res)
})         