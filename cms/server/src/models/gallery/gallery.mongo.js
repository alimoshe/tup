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
        visible: true,
        sectionId: sectionId
    })
}


async function updateGallery(itemId, picture) {
    return galleryModel.updateOne({
        visible: true,
        itemId: itemId
    }, {blobData: picture});
}

module.exports = {
    getAllGalleryData,
    galleryItemCreate,
    getGalleryCountItems,
    getGalleryItemsBySectionId,
    updateGallery,
}

