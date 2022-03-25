import React, {Component} from "react";
import FileUploadComponent from "../file-upload/fileUpload";
import axios from "axios";

const API_BASE_URL = "http://localhost:3080";

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
class FormComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            images : [],
            imageNames: [],
            products:[]
        }
    }


    postImageToApi = () => {
        const frmData = new FormData();
        this.state.images.map((image)=> {
            frmData.append('file', image);
            const requestOptions = {
                method: 'POST',
                body: frmData
            };
            axios.post(`${API_BASE_URL}/common/upload`,frmData).then(res =>{
                const localImageNames = [...this.state.imageNames];
                localImageNames.push(res.data.imageName);
                return this.setState({imageNames : localImageNames});
            })
        })

    }

    handleAddImage =  (image) => {
        const clonedImages = [...this.state.images];
        clonedImages.push(image);
        this.setState({images : clonedImages});
        this.postImageToApi();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       // alert(this.state.imageNames.length);
    }

    getAllProducts = () => {
        fetch(`${API_BASE_URL}/product/`)
            .then((data) => data.json())
            .then(data => {
                console.log(data);
                return this.setState({products : data});
            });
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/category/`)
            .then((data) => data.json())
            .then(data => {this.setState({categories : data})});
        this.getAllProducts();
    }

    handleFormSubmit = (e) => {
       e.preventDefault();
       product.categoryId = this.refs['cmbCategory'].value;

       product.rate = 0;
       product.description = this.refs['txtDescription'].value;
       product.title = this.refs['txtProdName'].value;
       product.discountPrice = 0;
       product.mainPrice = Number(this.refs['txtPrice'].value);
       product.vendors.push({
           vendorId:1,
           vendorTitle: 'تاپ کلیک'
       })
       product.pictures = this.state.imageNames;
        const requestOptions = {
            method: 'POST',
            body: product
        };

        axios.post(`${API_BASE_URL}/product`, product).then(res =>{
            console.log(res)
        });

        this.getAllProducts();
    }

    handleTestEvents = (e) => {
       e.preventDefault();
    }

    handleExpireProduct = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: {dataTarget : e.target.attributes['data-target'].value}
        };

        axios.post(`${API_BASE_URL}/product/rm`, requestOptions).then(res =>{
            console.log(res);
        })


    }

    getTableDisplayStyle = () => {
        return this.state.products.length < 1 ? 'none' : '';
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
                                               data-parsley-type="string"
                                               className="form-control"
                                               required
                                               ref="txtProdName"
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
                                            <button type="reset" onClick={this.handleTestEvents} className="btn btn-secondary waves-effect m-l-5">
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

                                <table id="dataTable" className="table table-bordered dt-responsive nowrap"
                                       style={{borderCollapse: 'collapse', borderSpacing: '0', width: '100%', display: this.getTableDisplayStyle()}}>
                                    <thead>
                                    <tr>
                                        <th>نام</th>
                                        <th>قسمت</th>
                                        <th>دسته بندی</th>
                                        <th>تخفیف</th>
                                        <th>تامین کننده</th>
                                        <th>عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.products.map((data) => (
                                            <tr key={data.productId}>
                                                <td>{data.title}</td>
                                                <td>{data.mainPrice}</td>
                                                <td>{data.categoryTitle}</td>
                                                <td>{data.discountPrice}</td>
                                                <td>{data.vendors.length > 0 ? data.vendors[0].vendorTitle : ''}</td>
                                                <td><a className="btn btn-danger" href={`${data.productId}`} onClick={this.handleExpireProduct} data-target={data.productId}>حذف</a>&nbsp;&nbsp;&nbsp;
                                                    <a className="btn btn-info" href={`${data.productId}`}  data-target={data.productId}>ویرایش</a></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>

                                </table>
             

                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default FormComponent