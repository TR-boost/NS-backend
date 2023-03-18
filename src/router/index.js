const router = require('express').Router();
const userRoute = require('./user.router');
const tldRoute = require('./tld.router');
const domainRoute = require('./domain.router');
const subdomainRoute = require('./subdomain.router');

router.use('/users',userRoute)
router.use('/tld',tldRoute)
router.use('/domain', domainRoute)
router.use('/subdomain', subdomainRoute)
router.use('**', (req, res) => {
    return res.status(404).send({ error: true, message: 'Not found' })
})

module.exports = router;
