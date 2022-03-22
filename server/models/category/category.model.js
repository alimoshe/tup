const categoryModel = require('./category.mongo');

async function getAllCategories(){
    // Get all Categories
    return categoryModel.find({});
}


module.exports = {
    getAllCategories,
}