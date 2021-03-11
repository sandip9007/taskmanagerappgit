const jwt = require('jsonwebtoken')
const User = require('../models/users')
const checkLogin = async (req, res, next)=>{
    const myToken = localStorage.getItem('myToken')
    try {
        const decode = jwt.verify(myToken, 'thisiswebtoken')
        const user = await User.findOne({ _id : decode._id, 'tokens.token' : myToken})
        req.user = user
      
    } catch (error) {
        req.error = "You must login to access this page"
    }
    next()
}

module.exports = checkLogin