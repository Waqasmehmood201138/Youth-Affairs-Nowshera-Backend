const mongoose = require('mongoose');
const eventShema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    categories:{
        type:String,
    
    }
    ,
    description:{
        type:String,
    },
    image:{
        type:String,
        
    },
    time:{
        type:String,
        
    }
} , {timestamps:true}
)

module.exports = mongoose.model('Event', eventShema);