const categoryModel = require('./category.mongo');

async function getAllCategories(){
    // Get all Categories
    return categoryModel.find({});
}

async function createCategory(category){
    categoryModel.create(category).then((res)=> {
        return {ok : true};
    })
}

module.exports = {
    getAllCategories,
}