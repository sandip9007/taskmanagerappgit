const mongoose = require('mongoose')
const express = require('express')
const router = new express.Router()
const bodyparser = require('body-parser')
const User = require('../models/users')
const checkLogin = require('../auth/auth')
const sendEmail = require('../email/email')
const auth = require('../auth/auth')
const {passwordHash, userCredentials } = require('../auth/authprac')
// const urlEncode = bodyparser.urlencoded({ extended: false })

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }


router.get('/', auth, (req, res)=>{
    if(req.error){
        res.render('index')
    }
    else{
        res.redirect('/memberpage')
    }
    
})

//Create user
router.post('/adduser', passwordHash, (req, res)=>{
    const user = new User(req.body)
    user.save().then((user)=>{
        sendEmail(req.body.email)
        res.send(req.body.email)
    }).catch((err)=>{
        console.log(err)
    })
})
//Login user
router.get('/login', auth, (req, res)=>{

    if(req.error){
        res.render('index')
    }
    else{
        res.redirect('/memberpage')
    }

    
})

router.post('/login', async(req, res)=>{
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuth()
        // res.send({ user : user.getPublicDetail(),token  })
        localStorage.setItem('myToken', token);
        // res.send({user, token})
        res.redirect('memberpage')
        
    } catch (error) {
        res.status(400).send( "Error" + error )
    }
})
router.get('/logout', async(req, res)=>{
    
    localStorage.removeItem('myToken')
    res.send('Logged out sucessfully')
})
router.get('/memberpage', checkLogin, (req, res)=>{
    if(req.error){
        res.send(req.error)
    }
    else{
        res.render('memberpage', {
            name : ""
        })
    }
    
})

router.patch('/me', (req, res)=>{
    res.send(req.body)
})
module.exports = router