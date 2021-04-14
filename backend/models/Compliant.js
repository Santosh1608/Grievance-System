const mongoose = require('mongoose')
const compliantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String,
        trim:true,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    resolvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
       type:String,
       default:"NEW" 
    }
},{
 timestamps:true   
})

module.exports = mongoose.model('Compliant',compliantSchema)