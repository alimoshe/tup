const productGalleryModel = require('./productGallery.model');

async function getAllProductGalleryItems(){
    return productGalleryModel.find({visible:true});
}

async function createProductGalleryItem(item) {
    const resultSet = await productGalleryModel.find({visible:true});
    const all = await getAllProductGalleryItems();

    const filtered = all.filter((current)=>{
       return current.productId !== item.productId && current.galleryItemId !== item.galleryItemId;
    });
    console.log(filtered);
    if(filtered.length < 1) {
        item.itemId = resultSet.length + 1;
        return productGalleryModel.create(item);
    }
    return item;
}

async function getGalleryItemsByProductId(productId, galleryItem){
    return productGalleryModel.find({
        galleryItemId : galleryItem,
        productItemId : productId
    });
}
module.exports = {
    getAllProductGalleryItems,
    getGalleryItemsByProductId,
    createProductGalleryItem,
}