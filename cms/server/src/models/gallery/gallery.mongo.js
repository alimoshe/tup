const galleryModel = require('./gallery.model');

async function getAllGalleryData() {
    return galleryModel.find({
        visible: true
    })
}

async function galleryItemCreate(gItem) {
    return galleryModel.create(gItem);
}

async function getGalleryCountItems() {
    return galleryModel.count({visible: true});
}

async function getGalleryItemsBySectionId(sectionId) {
    return galleryModel.find({
        visible:true,
        sectionId : sectionId
    })
}

module.exports = {
    getAllGalleryData,
    galleryItemCreate,
    getGalleryCountItems,
    getGalleryItemsBySectionId,
}

