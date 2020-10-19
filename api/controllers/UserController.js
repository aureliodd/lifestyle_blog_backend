'use strict';

var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')

var User = mongoose.model('User')

exports.create_user = function(req, res){
    var new_user = new User(req.body)

    new_user.save(function(err, user) {
        if (err) res.send(err)

        res.json(user)
      })
}

exports.get_users = function(req, res){

    if(req.query.username && req.query.password)
        User.findOne({username: req.query.username},function(err, user){
            if(err) throw err
            
            if(user)
                user.comparePassword(req.query.password, function (err, isMatch){
                    if(err) throw err

                    const token = jwt.sign({token: user._id}, 'privatekey', {expiresIn: '1h'})

                    if(isMatch) res.json({token: token})
                    else res.json({message: "wrong password. try again"})
                })
            else
                res.json({message: "user not found"})
        })
    else
        res.json({message: "per favore inserire tutti i dati"})
}