const  bcrypt = require('bcrypt')
const User = require('../models/users')

const passwordHash = async (req, res, next)=>{
    const hashed = await bcrypt.hash(req.body.password, 8)
    req.body.password = hashed
    console.log(hashed)
    next()
}

const userCredentials = async (req, res, next)=>{
    const user = await User.findOne( { email : req.body.email })
    if(!user){
        return console.log("Something went wrong")
    }
    const checkPswd = await bcrypt.compare(req.body.password, user.password)
    console.log(checkPswd)
    req.checkPswd = checkPswd
    req.username = user.name
    next()
}

module.exports = {
    passwordHash,
    userCredentials
}