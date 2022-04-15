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

    assignItemIdAndSend: (galleryItem, processResultCallback) => {
        const extractLength = (len) => {
            galleryItem.itemId = len + 1;
            axios.post(`${API_BASE_URL}/gallery/`, {galleryItem})
                .then((result) => {
                    processResultCallback(result);
                })
        };
        axios.get(`${API_BASE_URL}/gallery/count`)
            .then(res => {
                if(res.statusText.toLowerCase() === 'ok'){
                    if(res.data.length !== null)
                        extractLength(res.data.length);
                    extractLength(0);
                }
            });

    }
}

export default GalleryApi;