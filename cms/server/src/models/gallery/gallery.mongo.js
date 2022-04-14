const galleryModel = require('./gallery.model');

async function getAllGalleryData(){
    return galleryModel.find({
        visible:true
    })
}
async function galleryItemCreate(gItem){
    return galleryModel.create(gItem);
}
module.exports = {
    getAllGalleryData,
    galleryItemCreate,
}
