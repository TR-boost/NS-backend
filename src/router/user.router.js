const router = require('express').Router();
const userController = require('../controller/users.controller')
const { loginValidation } = require('../validation/user.validation')

router.post('/login', (req, res) => {
    try {
        let { error } = loginValidation();
        if (error) {
            return res.status(400).send(validationFormat(error, 'User', 400))
        }
        return userController.login(req, res)
    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/:user_id', (req,res) =>{
    return userController.getUser(req,res)
})

router.put('/update/:user_id', (req,res)=>{
    return userController.updateUser(req,res)
})

router.delete('/delete/:user_id',(req,res) =>{
    return userController.deleteUser(req,res)
})