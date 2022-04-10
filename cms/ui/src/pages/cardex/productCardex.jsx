import React, {useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';

// Define States


const load = () =>{
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
                    <div className="card m-b-10">
                        <div className="card-body">
                            <div className="form-group">
                                <label>کد اقتصادی</label>
                                <input type="text"
                                       data-parsley-type="string"
                                       id="txtSearch"
                                       className="form-control"
                                       required
                                       onChange={filterProduct}
                                       placeholder="نام کالا"/>
                            </div>
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