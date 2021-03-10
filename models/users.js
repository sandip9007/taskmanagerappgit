const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    gender : String
    
})

userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({ email })
    if(!user){
       
        throw new Error("Credemtails didnt match")
    }

    const checkPswd = await bcrypt.compare(password, user.password)
    // console.log(checkPswd) 
    if(!checkPswd){
        throw new Error("Credemtails didnt match")
    }
    return user
}

userSchema.methods.generateAuth = async function(){
    const user = this
    const token = await jwt.sign({ _id : user._id.toString()}, "thisiswebtoken")
    // console.log(token)
    user.tokens = await user.tokens.concat({ token })
    user.save()
    return token

}

const User = mongoose.model('user', userSchema)

module.exports = User