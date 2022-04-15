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

        axios.post(`${API_BASE_URL}/gallery/`, galleryItem)
            .then(res => console.log(res));
    },

    getGalleryLen: async () => {
        let length;
        return axios.get(`${API_BASE_URL}/gallery/`)
            .then(res => {
                length = res.data.length;
                return length
            });

    },

    loadImages: async (filter) => {
        const result = await axios.get(`${API_BASE_URL}/gallery/sec/${filter}`)
            .then(res => {

                return res.data
            });
        console.log(result);
    }
}

export default GalleryApi;