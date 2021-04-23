const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('../config');

module.exports = {
    
    register(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        return User.create({
            username : req.body.username,
            password : hashedPassword
        })
        .then((user) => {
            // create a token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).json({ status: 200, data: user, token: token });
        }) 
        .catch((error) => res.status(400).json(error));            
    },

    login(req, res) {
        return User.findOne({ username: req.body.username })
        .then((user) => {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, message: 'invalid password', token: null });
            
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            return res.status(200).json({ auth: true, token: token });
        })
        .catch((error) => res.status(400).json(error));            
    }
}