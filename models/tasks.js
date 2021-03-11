const mongoose = require('mongoose')
const { schema } = require('./users')
const TaskSchema = mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    completed : {
        type : String,
        default : "Incompleted"
        
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Users'
    }
}, {
    timestamps : true
})


const Task = mongoose.model('Task', TaskSchema)

module.exports = Task