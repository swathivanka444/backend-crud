const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true 
    },
    description:{
        type:String,
        require:true 
    },
    mark:{
        type:Boolean,
        require:true
    }
})
const tasks=new mongoose.model("tasks",taskSchema);

module.exports=tasks;