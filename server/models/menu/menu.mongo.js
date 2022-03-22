const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    menuId: {
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    categoryId:{
        type:Number,
        required:true,
    },
    expireDate:{
        type:Date,
        required:false,
    },
    isShown:{
       type:Boolean,
       required:true,
       default:true,
    }
})

module.exports = new mongoose.model('Menu', menuSchema);