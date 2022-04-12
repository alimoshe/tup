import React, {useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';
import FailureAlertComponent from "../../components/alert/failureAlert";


// Define States

const PicturesCard = ({imageName, reload}) => {
    return (
        <img className="img-thumbnail"
             alt="200x200"
             style={{width: '200px', height: '200px'}}
             src={imageName} data-holder-rendered="true"/>
    )

}


const ProductVendors = ({product}) => {
    if (product.vendors) {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">کد تامین کننده</th>
                    <th scope="col"> نام تامین کننده</th>
                    <th scope="col">عملیات</th>
                </tr>

                </thead>
                <tbody>
                {
                    product.vendors.map((data, index) => (
                        <tr key={index}>
                            <td>{data.vendorId}</td>
                            <td>{data.vendorTitle}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        );
    } else
        return <></>
}

const ProductProfile = ({formHeader, formType}) => {


    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const [showFailMessage, setShowFailMessage] = useState('none');
    const refFilter = useRef('0');

    const filterProduct = (filter) => {
        if (filter && filter > 0) {
            productApi.filterProduct(filter, (selected) => {
                setProduct(selected);
                console.log(product);
            });
        }
    }

    const loadImg = (filter) => {
        productApi.loadPicturesLength(filter,
            (img) => {
                setShowFailMessage('none');
                setImages(img)
            },
            () => setShowFailMessage(''));
    }


    const load = (e) => {

        e.preventDefault();
        const filter = Number(refFilter.current.value);
        loadImg(filter);
        filterProduct(filter);
    }

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <FailureAlertComponent isShow={showFailMessage}
                                   message="کالای مورد نظر یافت نشد"/>
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
                                       ref={refFilter}
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
                                        images.map((data, index) => (
                                            <PicturesCard key={index}
                                                          imageName={data}/>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card m-b-30">
                                <div className="card-body">
                                    <h4 className="mt-0 header-title">تامین کنندگان کالا</h4>
                                    <ProductVendors product={product}/>
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