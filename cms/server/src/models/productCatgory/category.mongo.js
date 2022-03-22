const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryId : {
        type : Number,
        required : true,
    },
    title : {
        type: String,
        required: true,
    },
    path : {
        type: String,
        required: false,
    },
    superCategoryId:{
        type:Number,
        required:true,
        default:1
    }
});

module.exports = new mongoose.model('Category', categorySchema);