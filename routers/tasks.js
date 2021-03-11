const express = require('express')
const app = express()
const taskrouter = new express.Router
const auth = require('../auth/auth')
const Task = require('../models/tasks')

//Create Tasks
taskrouter.post('/memberpage', auth, (req, res)=>{

    // res.send(req.user)
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    // res.send(req.body)
    task.save().then((task)=>{
        res.render('tasks')
    }).catch((error)=>{
        res.send(error)
    })
})

//Show Tasks
taskrouter.get('/tasks', auth, async (req, res)=>{
    if(req.error){
        res.send(req.error)
    }
    else{
        try {
            // const task = await Task.find({ 'owner' : req.user._id })
            
            // if(!task){
            //    await res.status(404).send();
              
            // }
            // res.send(task) 
            await req.user.populate('usertasks').execPopulate()
            res.render('tasks', {
                tasks : req.user.usertasks
            })
       } catch (error) {
           res.status(500).send("Error" + error)
       } 
    }

    
})
module.exports = taskrouter