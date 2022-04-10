const productModel = require('./product.model');

async function getAllProduct(){
    return productModel.find({
        isVisible:true
    });
}
async function getAllPaginateProduct(query){

    return productModel.find({
        isVisible:true
    })
        .skip(query.skip)
        .limit(query.limit);
}

async function getProductsByVendor(_vendorId){
    return productModel.findOne({vendorId : _vendorId})
}

async function getProductsWithoutFilter(){
    return productModel.find({});
}
async function createProduct(product){
    return productModel.create(product);
}

async function expireProduct(productId) {

    return productModel.updateMany({
        productId: productId
    }, {
        isVisible: false,
        expireDate: Date.now()
    });

}

async function updateProduct(productId, prod) {

    return productModel.updateMany({
        productId: productId
    }, {
        title:prod.title,
        mainPrice:prod.mainPrice,
        categoryId : prod.categoryId,
        description:prod.description
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

async function getProductById(prodId){
    if(prodId){
        return productModel.findOne({
            productId : prodId
        });
    }
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
    createProduct,
    getAllProduct,
    getProductsByTitle,
    getProductsWithoutFilter,
    getAllProductPics,
    getAllPaginateProduct,
    getProductById,
    getProductsByVendor,
    updateProductImage,
    expireProduct,
    clearProductPictures,
    assignImage,
    updateProduct,

}