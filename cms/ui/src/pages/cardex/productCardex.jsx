import React, {useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';

// Define States


const load = () => {
    console.log(productApi.loadProduct());
}

const ProductProfile = ({formHeader, formType}) => {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    const filterProduct = (e) => {
        setFilter(e.target.value);
    }

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-2">`
                            <div className="form-group">
                                <label>کد کالا</label>
                                <input type="text"
                                       data-parsley-type="string"
                                       id="txtSearch"
                                       className="form-control"
                                       required
                                       onChange={filterProduct}
                                       placeholder="کد کالا"/>
                            </div>
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