const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidate, registerValidate } = require('./validate');

const userController = {

    register: async function (req, res){

        const {error} = registerValidate(req.body);
        if(error) return res.status(400).send(error.message);

        let selectedUser = await User.findOne({email: req.body.email});
        if(selectedUser) return res.status(400).send('Email already exists. Please try another.');

        const user = new User(req.body);
        user.password = bcrypt.hashSync(user.password);

        try{
            const savedUser = await user.save();
            res.send(savedUser);            
        } catch (error){
            res.status(400).send(error);
        }
    },

    login: async function (req, res){

        const {error} = loginValidate(req.body);
        if(error) return res.status(400).send(error.message);

        selectedUser = await User.findOne({email: req.body.email});
        if(!selectedUser) return res.status(400).send('Email OR password incorrect. Please try again.');

        let compareMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if(!compareMatch) return res.status(400).send('Email OR password incorrect. Please try again.');

        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET);
        res.header('authorization-token', token);

        res.send('User logged');
    }
}

module.exports = userController;