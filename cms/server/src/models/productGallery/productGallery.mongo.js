const productGalleryModel = require('./productGallery.model');

async function getAllProductGalleryItems() {
    return productGalleryModel.find({visible: true});
}

async function createProductGalleryItem(item) {
    const resultSet = await productGalleryModel.find({visible: true});

    const filtered = await productGalleryModel.find({
        galleryItemId: item.galleryItemId,
        productItemId: item.productItemId
    })

    if (filtered.length < 1) {
        item.itemId = resultSet.length + 1;
        return productGalleryModel.create(item);
    }
    return item;
}

async function getGalleryItemsWithFilter(filter){
    return productGalleryModel.find(filter);
}

async function getGalleryItemsByProductId(productId, galleryItem) {
    return productGalleryModel.find({
        galleryItemId: galleryItem,
        productItemId: productId
    });
}

module.exports = {
    getAllProductGalleryItems,
    getGalleryItemsByProductId,
    getGalleryItemsWithFilter,
    createProductGalleryItem,
}