import React, {Component} from "react";
import FileUploadComponent from "../file-upload/fileUpload";
import axios from "axios";
import FailureAlertComponent from "../alert/failureAlert";

const API_BASE_URL="http://localhost:3080";

const product = {
    productId : -1,
    title:'',
    categoryId:1,
    categoryTitle:'',
    vendors:[],
    rate:0,
    mainPrice:0,
    discountPrice: 0,
    pictures:[],
    description : ''
}

class ProductEntryComponent extends Component {
    constructor(props) {
        super(props);
        this.productName = React.createRef();
        this.category = React.createRef();
        this.mainPrice = React.createRef();
        this.description = React.createRef();


        this.state = {
            showError: false,
            errorMessage: '',
            categories: [],
            images: [],
            imageNames: [],
        }
    }

    validation = () => {

        if (!this.productName.current.value || !this.category.current.value ||
            !this.mainPrice.current.value || !this.description.current.value) {
            this.setState({showError: true, errorMessage: 'اطلاعات جهت ثبت کامل نیست'});
            return false;
        } else {
            this.setState({showError: false});
            return true;
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (!this.validation())
            return;
        // clear Previous Vendors exist in array
        if(!this.props.editMode) {
            product.vendors.splice(0, product.length);

            product.categoryId = this.category.current.value;
            product.rate = 0;
            product.description = this.description.current.value;
            product.title = this.productName.current.value;
            product.discountPrice = 0;
            product.mainPrice = Number(this.mainPrice.current.value);
            product.vendors.push({
                vendorId: 1,
                vendorTitle: 'تاپ کلیک'
            })

            axios.post(`${API_BASE_URL}/product`, product).then(res => {
                if (res.statusText.toLowerCase() !== 'ok') {
                    this.setState({showError: true, errorMessage: 'در ثبت اطلاعات خطایی رخ داده است'})
                    console.log(res);
                } else {
                    this.props.onSubmit();
                    this.props.onHide();
                }
            });
        }else {
            product.categoryId = this.category.current.value;
            product.description = this.description.current.value;
            product.title = this.productName.current.value;
            product.mainPrice = Number(this.mainPrice.current.value);

            axios.post(`${API_BASE_URL}/product/ed`, {prod : product, productId : this.props.productForEdit.productId}).then(res => {
                if (res.statusText.toLowerCase() !== 'ok') {
                    this.setState({showError: true, errorMessage: 'در ثبت اطلاعات خطایی رخ داده است'})
                    console.log(res);
                } else {
                    this.props.onSubmit();
                    this.props.onHide();
                }
            });
        }
    }




    componentDidMount() {
        fetch(`${API_BASE_URL}/category/`, {mode: 'cors'})
            .then((data) => data.json())
            .then(data => {
                this.setState({categories: data})
            });
    }





    getDisplayStyle = () => {
        return this.state.showError === true ? '' : 'none';
    }
    render() {

        if(this.props.productForEdit && this.props.editMode === true) {
            //this.setState({selectedProduct : this.props.productForEdit})
            const prod = this.props.productForEdit;
            //console.log(prod);
            this.productName.current.value = prod.title;
            this.category.current.value = prod.categoryId;
            this.mainPrice.current.value = prod.mainPrice;
            this.description.current.value = prod.description;

            //console.log(prod.title);
        }
        return (
            <React.Fragment>
                <FailureAlertComponent message={this.state.errorMessage} isShow={this.getDisplayStyle()} />
                <form className={""} action="#">
                    <div className="form-group">
                        <label>عنوان کالا</label>
                        <input type="text"
                               data-parsley-type="string"
                               className="form-control"
                               required

                               ref={this.productName}
                               placeholder="چیزی را تایپ کنید"/>
                    </div>

                    <div className="form-group">
                        <label>گروه کالا</label>
                        <div className="form-group m-t-10">
                            <select className="form-control" ref={this.category}>
                                {
                                    this.state.categories.map(data => (
                                        <option key={data.categoryId}
                                                value={data.categoryId}>{data.title}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>قیمت</label>
                        <div>
                            <input data-parsley-type="number"
                                   type="text"
                                   className="form-control"
                                   required

                                   ref={this.mainPrice}
                                   minLength="2"
                                   maxLength="9"
                                   placeholder="فقط قیمت را وارد کنید"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>توضیحات مربوط به کالا</label>
                        <div>
                            <textarea required ref={this.description} className="form-control"
                                  rows="5"/>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <div>
                        <button type="submit" onClick={this.handleFormSubmit}
                                className="btn btn-success waves-effect waves-light">
                            تایید
                        </button>
                        <button data-dismiss="modal"
                                onClick={this.props.onHide}
                                className="btn btn-danger waves-effect ml-2">
                            لغو
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductEntryComponent;