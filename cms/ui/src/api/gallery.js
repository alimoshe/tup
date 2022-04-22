import axios from "axios";

const API_BASE_URL = 'http://localhost:3080'
const GalleryApi = {
    sendImagesToApi: (image, getImageNameCallback) => {
        const frmData = new FormData();
        frmData.delete('file');
        frmData.append('file', image);

        axios.post(`${API_BASE_URL}/common/upload`, frmData).then(res => {
            getImageNameCallback(res);
        });
    },

    checkExistenceImage : async (fileName) => {
        const existence = await axios.get(`${API_BASE_URL}/common/ce/${fileName}`);
        return existence.data.exist;
    },

    assignItemIdAndSend: (galleryItem, processResultCallback) => {
        axios.post(`${API_BASE_URL}/gallery/`, galleryItem)
            .then(res => {
                const result = res;
                processResultCallback(`${API_BASE_URL}/common/${galleryItem.itemId}`);
            });
    },

    createProductGalleryItem : (galleryProductItem, success, fail) => {
        axios.post(`${API_BASE_URL}/product-gallery/`,galleryProductItem)
            .then((result) =>{
                console.log(result);
                if(!result.data.error)
                    success(result);
                else
                    fail(result);
            })
    },
    removeGalleryItem : () =>{

    },

    getGalleryLen: async () => {
        let length;
        return axios.get(`${API_BASE_URL}/gallery/`)
            .then(res => {
                length = res.data.length;
                return length
            });

    },

    removeImageFromGallery : (refId) => {
        return axios.delete(`${API_BASE_URL}/gallery/${refId}`);
    },

    loadImages:  (filter, imageLoadedFromApi) => {

         axios.get(`${API_BASE_URL}/gallery/sec/${filter}`)
            .then(res => {
                imageLoadedFromApi(res.data);
            });

    }
}

export default GalleryApi;