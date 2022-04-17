const galleryModel = require('./gallery.model');

async function getAllGalleryData() {
    return galleryModel.find({
        visible: true
    }, {blobData: 0})
}

async function getAllGalleryBLOB() {
    return galleryModel.find({
        visible: true
    }, {blobData: 0})
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
    return galleryModel.findOne({
        itemId: itemId,
        visible: true
    }, {
        _id: 0,
        __v: 0,
        itemId: 0,
        sectionId: 0,
        typeId:0,
        title: 0,
        picturePath: 0,
        blobName: 0,
        isMain: 0,
        expireDate: 0,
        visible: 0
    })
}

async function updateGallery(itemId, picture) {
    return galleryModel.updateOne({
        visible: true,
        itemId: itemId
    }, {blobData: picture});
}

async function getBlobName(itemId) {
    return galleryModel.findOne({
        visible: true,
        itemId: itemId
    }, {blobName : 1});
}


module.exports = {
    getAllGalleryData,
    galleryItemCreate,
    getGalleryCountItems,
    getGalleryItemsBySectionId,
    getGalleryItemBlobData,
    getBlobName,
    updateGallery,
}

