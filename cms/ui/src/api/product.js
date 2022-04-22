import axios from "axios";

const API_BASE_URL = 'http://localhost:3080';
const productApi = {
    loadPicturesLength: (prodId, okListener, failListener) => {
        let loaded = [];
        const url = `${API_BASE_URL}/product/all`;
        fetch(url)
            .then(data => data.json())
            .catch(err => {
                console.log(err)
            })
            .then(data => {
                loaded = data
                const result = loaded.filter(item => {
                    return Number(item.productId) === Number(prodId);
                })

                if (result.length < 1) {
                    failListener();
                }

                result[0].pictures.map((data, row) => {
                    let converted = [];
                    fetch(`${API_BASE_URL}/common/getImg/${prodId}/${row}`)
                        .then(async (binaryImage) => {
                            const imgBLOB = await binaryImage.blob();
                            const imageObjectUrl = URL.createObjectURL(imgBLOB);
                            converted.push(imageObjectUrl);
                        })
                    okListener(converted);
                })

            });
        return 'test';

    },
    loadImagesPath: async (img) => {
        let picturePath = '';
        await axios.post(`${API_BASE_URL}/common/getImg`, {imageName: img})
            .then(data => {
                picturePath = data;

            });
        return picturePath;
    },
    loadImageFile: (prodId, row) => {

        return fetch(`${API_BASE_URL}/common/getImg/${prodId}/${row}`)

    },

    filterProduct: (prodId, okListener, failListener = () => {
    }) => {
        const url = `${API_BASE_URL}/product/all`;
        let loaded = [];
        fetch(url)
            .then(data => data.json())
            .catch(err => {
                console.log(err)
            })
            .then(data => {
                    loaded = data;

                    const result = loaded.filter(item => {
                        return Number(item.productId) === Number(prodId);
                    });
                    if (result.length < 1) {
                        failListener();
                    } else {
                        okListener(result);
                    }
                }
            )
    }

}


export default productApi;