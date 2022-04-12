import React, {useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';


// Define States

const PicturesCard = ({imageName}) => {
    return(
        <img className="img-thumbnail"
             alt="200x200"
             style={{width: '200px', height: '200px'}}
             src={imageName} data-holder-rendered="true"/>
    )

}




const ProductProfile = ({formHeader, formType}) => {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(0);
    const [singleImage, setSingleImage] = useState('');
    const [images, setImages] = useState([]);
    const load = (e) => {
        e.preventDefault();
        productApi.loadProduct()
            .then(data => {
                setProducts(data);
                if (Number(filter) > 0)
                {

                    const filtered = products.filter((item) => {
                        return Number(item.productId) === Number(filter);
                    });

                    if (filtered.length === 1) {
                        const fetchImg = async () => {
                            let convertedImages = [];

                            filtered[0].pictures.map(async (data, index) => {
                                const res = await productApi.loadImageFile(filter, index);
                                const imgBLOB = await res.blob();
                                const imageObjectUrl = URL.createObjectURL(imgBLOB);
                                convertedImages.push(imageObjectUrl);
                            },this)
                            //console.log(convertedImages);
                            setImages(convertedImages);

                        }
                        fetchImg().then();
                    }
                }


            });
        console.log(images);

    }

    const setFilterProduct = (e) => {
        setFilter(Number(e.target.value));
    }

    const addProdImage = (imageName) => {
       // setSingleImage(imageName);
        //console.log(imageName);
    }

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-2">`
                            <div className="form-group">

                                <input type="text"
                                       data-parsley-type="number"
                                       id="txtSearch"
                                       className="form-control"
                                       required
                                       onChange={setFilterProduct}
                                       placeholder="کد کالا"/>
                            </div>
                        </div>
                        <div className="col-lg-2 mt-3">
                            <button type="button" className="btn btn-success waves-effect waves-light"
                                    data-toggle="modal"
                                    onClick={load}
                                    data-target=".bs-example-modal-center">تامین کننده جدید
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card m-b-30">
                                <div className="card-body">
                                    <h4 className="mt-0 header-title">عکس های مربوطه به کالا</h4>
                                    {
                                        images.map((data, index)=>(
                                            <PicturesCard key={index} imageName={data} />
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductProfile;