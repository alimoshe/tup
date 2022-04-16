const galleryModel = require('./gallery.model');

async function getAllGalleryData() {
    return galleryModel.find({
        visible: true
    },{blobData: 0})
}

async function getAllGalleryBLOB() {
    return galleryModel.find({
        visible: true
    },{blobData: 0})
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

async function getGalleryItemBlobData(itemId) {
    return galleryModel.find({
        itemId : itemId,
        visible:true
    },{blobData : 1})
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
    getGalleryItemBlobData,
    updateGallery,
}

