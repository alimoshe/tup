import React, {Component} from "react";
import FileUploadComponent from "../file-upload/fileUpload";
import axios from "axios";

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
            errorMessage : '',
            categories : [],
        }
    }

    validation = () => {

        if(!this.productName.current.value || !this.category.current.value  ||
           !this.mainPrice.current.value || !this.description.current.value){
            this.setState({showError : true, errorMessage : 'اطلاعات جهت ثبت کامل نیست'});
            
            return false;
        }else{
            this.setState({showError:false});
            return true;
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(!this.validation())
            return;
        // clear Previous Vendors exist in array
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
                this.setState({showError: true, errorMessage : 'در ثبت اطلاعات خطایی رخ داده است'})
                console.log(res);
            }else {
                this.props.onCreateNewProduct();
            }
        });
    }

    showAllError = () => {
        return this.state.showError === false ? 'none' : '';
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/category/`, {mode: 'cors'})
            .then((data) => data.json())
            .then(data => {
                this.setState({categories: data})
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="alert alert-danger mb-2" style={{display:this.showAllError()}} role="alert">
                    {this.state.errorMessage}
                </div>
                <form className="" action="#">
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

                        <div>
                            <label>عکس های کالا</label>
                            <div className="col-lg-6">
                                <FileUploadComponent toBeRender={false}
                                                     onAddImage={this.handleAddImage}/>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <label>توضیحات مربوط به کالا</label>
                        <div>
                                                <textarea required ref={this.description} className="form-control"
                                                          rows="5"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div>
                            <button type="submit" onClick={this.handleFormSubmit}
                                    className="btn btn-primary waves-effect waves-light">
                                ارسال
                            </button>
                            <button data-dismiss="modal"
                                    className="btn btn-secondary waves-effect m-l-5">
                                لغو
                            </button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default ProductEntryComponent;