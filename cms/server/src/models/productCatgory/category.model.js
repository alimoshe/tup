const categoryModel = require('./category.mongo');

async function getAllCategories(){
    // Get all Categories
    return categoryModel.find({});
}

async function createCategory(category){
    return categoryModel.create(category);
}

async function getCategoryById(_categoryId){
    return categoryModel.findOne({
        categoryId : _categoryId
    });
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
}