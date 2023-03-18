const db = require("../models")
const User = db.users;
const _ = require('lodash');
const { successFormat, errorMsgFormat } = require('../utils/messageFormat.js')
const { generateToken } = require('../utils/utils.js')

exports.getUser = async (req, res) => {
    const { user_id } = req.params;

    const user = await User.findOne({
        where: {
            id : user_id,
        },
    });
    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${user_id}`,
        });
    }
    return res.send(user);
};

exports.login = async (req,res) => {
    try {
        const isExist = await User.findOne({
            where : {
                userAddress : req.body.eth_key
            },
            attributes: ['id','userAddress']
        })
        if (_.isEmpty(isExist)){
            const newUser = await User.create({
                userAddress : req.body.eth_key
            })
            let token = await generateToken(isExist)
            return res.send(successFormat({id: newUser.id, token, userAddress: newUser.eth_key}, 'User'));
        }
        else{
            return res.send("Error in registering the address")
        }
    } catch (error) {
        console.log("Error in login")
        return res.status(500).send(errorMsgFormat(error.message, 'User', 500));
        
    }
}

exports.deleteUser = async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).send({
            message: 'Please provide a id for the user you are trying to delete!',
        });
    }
    
    const user = await User.findOne({
        where: {
            id : user_id,
        },
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${user_id}`,
        });
    }

    try {
        await user.destroy();
        return res.send({
            message: `User ${user_id} has been deleted!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.updateUser = async (req, res) => {
    var new_user = req.body
    const { user_id } = req.params;

    var user = await User.findOne({
        where: {
            id : user_id,
        },
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${user_id}`,
        });
    }

    try {
        if (new_user) {
            user = new_user
        }
        User.update(user, { where: { id : user_id } })

        return res.send({
            message: `User ${user_id} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};
