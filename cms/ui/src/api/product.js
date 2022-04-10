const API_BASE_URL = 'http://localhost:3080/product/all';
const productApi = {
    loadProduct : async () => {
        let loaded = [];
        await fetch(API_BASE_URL)
            .then(data => data.json())
            .then(data => loaded = data);

        return loaded
    }

}

export default productApi;