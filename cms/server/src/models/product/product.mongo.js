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

async function getAllProductPics(prodId){
    return productModel.findOne({
        productId : prodId
    },{pictures:1, productId : 1});
}

async function clearProductPictures(prodId) {

    return productModel.findOne({
        productId: prodId,
        isVisible:true
    }).then(data => {
        console.log(data.pictures);
        productModel.updateMany({
            productId: prodId,
            isVisible:true

        }, {
            '$pullAll': {
                'pictures': data.pictures
            }
        }).exec();
    });


}

async function assignImage(img, prodId) {

    console.log(img, prodId);
    return productModel.findOne({
        productId: prodId,
        isVisible:true
    }).then(data => {
        productModel.updateMany({
            productId: prodId,
            isVisible:true

        }, {
            '$push': {
                'pictures': [img]
            }
        }).exec();
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
    getAllProductPics,
    clearProductPictures,
    assignImage,
}