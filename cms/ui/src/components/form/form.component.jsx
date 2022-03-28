import React, {Component} from "react";
import FileUploadComponent from "../file-upload/fileUpload";
import axios from "axios";
import FormToolbarComponent from "../form-toolbar/formToolbar";
import ModalComponent from "../modal/modal";
import ProductListComponent from "../products/productList";
import ProductEntryComponent from "../products/productEntry";
import SuccessAlertComponent from "../alert/successAlert";

const API_BASE_URL = "http://localhost:3080";


class FormComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            images: [],
            imageNames: [],
            products: [],
            showSuccessAlert:'none'
        }
    }


    postImageToApi = () => {
        const frmData = new FormData();
        this.state.images.map((image) => {
            frmData.append('file', image);
            const requestOptions = {
                method: 'POST',
                body: frmData
            };
            axios.post(`${API_BASE_URL}/common/upload`, frmData).then(res => {
                const localImageNames = [...this.state.imageNames];
                localImageNames.push(res.data.imageName);
                return this.setState({imageNames: localImageNames});
            })
        })

    }

    handleAddImage = (image) => {
        const clonedImages = [...this.state.images];
        clonedImages.push(image);
        this.setState({images: clonedImages});
        this.postImageToApi();
    }

    getAllProducts = (firstLoad) => {
        fetch(`${API_BASE_URL}/product/`, {mode: 'cors'})
            .then((data) => data.json())
            .then(data => {
                this.setState({products: data});
                if(firstLoad !== 1){
                    setTimeout(()=>{
                        this.setState({showSuccessAlert:''});
                    },2000);
                    this.setState({showSuccessAlert:'none'});
                }
            });

    }

    componentDidMount() {
        this.getAllProducts(1);
    }

    handleHideModal = () => {

    }

    handleExpireProduct = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: {dataTarget: e.target.attributes['data-target'].value}
        };

        axios.post(`${API_BASE_URL}/product/rm`, requestOptions).then(res => {
            console.log(res);
        })


    }

    getTableDisplayStyle = () => {
        return this.state.products.length < 1 ? 'none' : '';
    }

    render() {
        return (
            <React.Fragment>
                <FormToolbarComponent formHeader={this.props.formHeader}/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card m-b-30">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-10">
                                        <h4 className="mt-0 header-title">{this.props.formType}</h4>
                                        <button type="button" className="btn btn-success waves-effect waves-light"
                                                data-toggle="modal"
                                                data-target=".bs-example-modal-center">کالای جدید
                                        </button>
                                        <button type="button" className="btn btn-info waves-effect waves-light ml-2"
                                                data-toggle="modal"
                                                data-target=".bs-example-modal-center">آپلود عکس کالاها
                                        </button>
                                    </div>
                                    <div className="col-lg-2 pt-4">

                                        <input type="text" className="form-control" placeholder="نام کالا را جهت جستجو وارد نماپید" />
                                    </div>
                                </div>
                                <hr />
                                <SuccessAlertComponent message="کالای مورد نظر با موفقیت ثبت شد" show={this.state.showSuccessAlert} />
                                <h6>{this.props.formDescription}</h6>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ProductListComponent productList={this.state.products}/>
                                    </div>
                                </div>
                                <ModalComponent modalTitle="معرفی کالا">
                                    <ProductEntryComponent onCreateNewProduct={(a)=>this.getAllProducts(0)} onHideModal={this.handleHideModal}/>
                                </ModalComponent>

                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default FormComponent