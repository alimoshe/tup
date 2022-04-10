const API_BASE_URL = 'http://localhost:3080/product/all';
const productApi = {
    loadProduct : async (prodId) => {
        let loaded = [];
        await fetch(API_BASE_URL)
            .then(data => data.json())
            .then(data => loaded = data);

        if(prodId) {
            return loaded.filter((item) => {
                return Number(item.productId) === Number(prodId);
            })
        }else {
            return loaded;
        }


    }

}

export default productApi;