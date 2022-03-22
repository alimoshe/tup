const productModel = require('./product.model');

async function getAllProduct(){
    return productModel.find({});
}

async function getProductsByTitle(searchTitle){
    return productModel.find({
        title:`/${searchTitle}/`
    });
}

module.exports = {
    getAllProduct,
    getProductsByTitle,
}