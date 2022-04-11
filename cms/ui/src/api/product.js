import axios from "axios";

const API_BASE_URL = 'http://localhost:3080';
const productApi = {
    loadProduct: async (prodId) => {
        let loaded = [];
        const url = `${API_BASE_URL}/product/all`;
        await fetch(url)
            .then(data => data.json())
            .catch(err => {console.log(err)})
            .then(data => {
                loaded = data
            });

        if (prodId) {
            return loaded.filter((item) => {
                return Number(item.productId) === Number(prodId);
            })
        } else {
            return loaded;
        }
    },
    loadImagesPath: async (img) => {
        let picturePath = '';
        await axios.post(`${API_BASE_URL}/common/getImg`, {imageName: img})
            .then(data => {
                picturePath = data;
            });
        return picturePath;
    }
}


export default productApi;