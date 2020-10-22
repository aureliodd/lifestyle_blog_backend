'use strict'
var mongoose = require('mongoose')
var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10

var schema = mongoose.Schema

var UserSchema = new schema({
    username:{
        type: String,
        index: {unique: true},
        required: "per favore inserire il nome utente"
    },

    password:{
        type: String,
        required: "per favore inserisci la password"
    }
})


//password hashing
//pre è il middleware
UserSchema.pre('save', function(next){
    var user = this

    //fa' l'hash se la password è nuova o è stata modificata
    if(!user.isModified('password')) return next()

    //genero un salt (tipo di crittografia)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err)

        //faccio l'hash della password usanto salt
        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err)

            //sovrascrivo la password in chiaro con quella con l'hash
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)