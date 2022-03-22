const categoryModel = require('./category.mongo');

async function getAllCategories(){
    // Get all Categories
    return categoryModel.find({});
}

async function createCategory(category){
    return categoryModel.create(category);
}

module.exports = {
    getAllCategories,
    createCategory,
}