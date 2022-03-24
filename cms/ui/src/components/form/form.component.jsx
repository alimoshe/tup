import React, {Component} from "react";
import FileUploadComponent from "../file-upload/fileUpload";
import axios from "axios";

const API_BASE_URL = "http://localhost:3080";

class FormComponent extends Component {
   product = {
        productId : -1,
        title:'',
        categoryId:1,
        vendorId:1,
        rate:0,
        mainPrice:0,
        discountPrice: 0,
        pictures:[],
        description : ''
    }
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            images : []
        }
    }

    handleAddImage =  (image) => {
        const clonedImages = [...this.state.images];
        const frmData = new FormData();
        frmData.append('file', image);
        const requestOptions = {
            method: 'POST',
            body: frmData
        };
        axios.post(`${API_BASE_URL}/common/upload`,frmData).then(res =>{
            console.log(res.statusText);
        })

        this.setState({images : clonedImages});
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/category/`)
            .then((data) => data.json())
            .then(data => {this.setState({categories : data})});
    }

    handleFormSubmit = (e) => {
       e.preventDefault();
       this.product.categoryId = this.refs['cmbCategory'].value;
       this.product.rate = 0;
       this.product.description = this.refs['txtDescription'].value;
       this.product.title = this.refs['txtProdName'].value;
       this.product.discountPrice = 0;
       this.product.mainPrice = Number(this.refs['txtPrice'].value);
       this.product.vendorId = 1;

       console.log(this.product);
    }

    render() {
        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title m-0">{this.props.formHeader}</h4>
                                </div>
                                <div className="col-md-4">
                                    <div className="float-right d-none d-md-block">
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="ti-settings mr-1"/> تنظیمات
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated">
                                                <a className="dropdown-item" href="#">عملیات</a>
                                                <a className="dropdown-item" href="#">اقدام دیگر</a>
                                                <a className="dropdown-item" href="#">چیز های دیگر</a>
                                                <div className="dropdown-divider"> </div>
                                                <a className="dropdown-item" href="#">پیوند جدا شده</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Component in two column */}

                <div className="row">
                    <div className="col-lg-5">
                        <div className="card m-b-30">
                            <div className="card-body">

                                <h4 className="mt-0 header-title">{this.props.formType}</h4>
                                <p className="text-muted m-b-30">{this.props.formDescription}</p>

                                <form className="" action="/product" method="post">
                                    <div className="form-group">
                                        <label>عنوان کالا</label>
                                        <input type="text"
                                               className="form-control"
                                               required
                                               ref="txtProdName"
                                               name="txtProdName"
                                               id="txtProdName"
                                               placeholder="چیزی را تایپ کنید"/>
                                    </div>

                                    <div className="form-group">
                                        <label>گروه کالا</label>
                                        <div className="form-group m-t-10">
                                            <select className="form-control" ref="cmbCategory">
                                                {
                                                    this.state.categories.map(data => (
                                                        <option key={data.categoryId} value={data.categoryId}>{data.title}</option>
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
                                                   ref="txtPrice"
                                                   minLength="2"
                                                   maxLength="9"
                                                   placeholder="فقط قیمت را وارد کنید"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>عکس های کالا</label>
                                        <div>
                                            <div className="col-lg-6">
                                                <FileUploadComponent onAddImage={this.handleAddImage} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label>توضیحات مربوط به کالا</label>
                                        <div>
                                            <textarea required ref="txtDescription" className="form-control" rows="5"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                            <button type="submit" onClick={this.handleFormSubmit} className="btn btn-primary waves-effect waves-light">
                                                ارسال
                                            </button>
                                            <button type="reset" className="btn btn-secondary waves-effect m-l-5">
                                                لغو
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>


                    <div className="col-lg-7">
                        <div className="card m-b-30">
                            <div className="card-body">

                                <h4 className="mt-0 header-title">اعتبار محدوده</h4>
                                <p className="text-muted m-b-30">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                    سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                                    بهبود ابزارهای کاربردی می باشد.</p>

             

                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default FormComponent