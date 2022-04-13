const API_BASE_URL='http://localhost:3080/vendor'

const vendorApi = {

    loadVendorById : (vendorId, callback) =>{

        fetch(`${API_BASE_URL}/${vendorId}`)
            .then(data => data.json())
            .then(data => callback(data));

    }

}

export default vendorApi;