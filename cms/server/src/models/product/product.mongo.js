const productModel = require('./product.model');

async function getAllProduct(){
    return productModel.find({
        isVisible:true
    });
}
async function getProductsWithoutFilter(){
    return productModel.find({});
}
async function createProduct(product){
    return productModel.create(product);
}

async function expireProduct(productId) {
    //console.log(`Product ID : ${productId}`);
    return productModel.updateOne({
        productId: productId
    }, {
        isVisible: false,
        expireDate: Date.now()
    });

}

async function updateProductImage(productId, images) {
    //console.log(`Product ID : ${productId}`);
    return productModel.updateOne({
        productId: productId
    }, {
        pictures:images

    });

}

async function getProductsByTitle(searchTitle){

    return productModel.find({
        title:`/${searchTitle}/`,
        isVisible:true
    });
}

module.exports = {
    getAllProduct,
    createProduct,
    getProductsByTitle,
    expireProduct,
    getProductsWithoutFilter,
    updateProductImage,

}