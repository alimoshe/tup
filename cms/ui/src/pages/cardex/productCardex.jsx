import React, {useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';

// Define States



const PicturesCard = ({pictures}) =>{
    return(
        <React.Fragment>
            {pictures[0].title}
        </React.Fragment>
    );
}

const ProductProfile = ({formHeader, formType}) => {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(0);

    const filterProduct = (e) => {
        setFilter(e.target.value);
    }

    const load = () => {

        productApi.loadProduct(filter)
            .then(data => {
                setProducts(data);
            });

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
                                       onChange={filterProduct}
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
                                    <PicturesCard pictures={products}/>
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