const galleryModel = require('./gallery.model');
const productGalleryModel = require('../productGallery/productGallery.mongo');

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
    }, {
        _id: 0,
        __v: 0,
        blobName: 0,
        sectionId: 0,
        typeId: 0,
        title: 0,
        picturePath: 0,
        blobData: 0,
        isMain: 0,
        expireDate: 0,
        visible: 0
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
        typeId: 0,
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

async function getGalleryItemsByBlobName(blobName) {
    return galleryModel.find({blobName: blobName});
}

async function getBlobName(refId) {
    return galleryModel.findOne({
        visible: true,
        itemId: refId
    }, {blobName: 1});
}

async function removeGalleryItem(refId) {
    const productItemsInGallery = await productGalleryModel.getGalleryItemsWithFilter({
        productItemId: refId
    });

    if (Number(productItemsInGallery.length) > 0) {
        return ({error: 1, msg: 'Gallery item could not be delete'});
    } else
        return galleryModel.remove({itemId : refId});
    //return

}

module.exports = {
    getAllGalleryData,
    galleryItemCreate,
    getGalleryCountItems,
    getGalleryItemsBySectionId,
    getGalleryItemBlobData,
    getGalleryItemsByBlobName,
    getBlobName,
    updateGallery,
    removeGalleryItem,
}

