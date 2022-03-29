import React, {Component} from "react";
import axios from "axios";
import $ from 'jquery';
import FormToolbarComponent from "../form-toolbar/formToolbar";
import ModalComponent from "../modal/modal";
import ProductListComponent from "../products/productList";
import ProductEntryComponent from "../products/productEntry";
import SuccessAlertComponent from "../alert/successAlert";
import FileUploadComponent from "../file-upload/fileUpload";
import FailureAlertComponent from "../alert/failureAlert";

const API_BASE_URL = "http://localhost:3080";


class FormComponent extends Component {


    constructor(props) {
        super(props);
        this.searchBox = React.createRef();
        this.state = {
            categories: [],
            products: [],
            imageNames : [],
            showSuccessAlert:'none',
            showFailureAlert:'none',
            selectedProductId : -1,
            failureMessage:'',
            imageInEditMode: false,
        }
        this.addImageButton = React.createRef();
    }




    getAllProducts = (firstLoad) => {
        fetch(`${API_BASE_URL}/product/`, {mode: 'cors'})
            .then((data) => data.json())
            .then(data => {
                this.setState({products: data});
                if(firstLoad !== 1){
                    setTimeout(()=>{
                        this.setState({showSuccessAlert:'none'});
                    },2000);
                    this.setState({showSuccessAlert:''});
                }
            });

    }

    componentDidMount() {
        this.getAllProducts(1);
        this.setState({showFailureAlert :'none', failureMessage:''})
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

    filterProduct = () => {
        const filter = this.searchBox.current.value;
        if(filter) {
            const filtered = this.state.products.filter(d => d.title.includes(filter));
            this.setState({products: filtered});
        }else
            this.getAllProducts(1);
    }
    handleSelectItem = (tag) => {
        console.log(tag);
        if(isNaN(tag) || !tag) {
            this.setState({selectedProductId: -1});
        }else {
            this.setState({selectedProductId: tag});
        }
    }

    sendImagesToApi = (images) => {

        const frmData = new FormData();
       images.map((image) => {
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

    }

    selectProduct = (e) => {
        if(this.state.selectedProductId === -1){
            e.target.attributes['data-target'].value = '.bs';
            this.setState({showFailureAlert : '', failureMessage:'لطفا ابتدا یک محصول را انتخاب نمایید'});
            this.setState({imageInEditMode : true});
        }else{
            e.target.attributes['data-target'].value = '.bs-another-modal-center';
            this.setState({showFailureAlert : 'none', failureMessage:''});
        }
    }

    handleHideImagePanel = () => {
        $('.close').click();
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
                                                onClick={this.selectProduct}
                                                ref={this.addImageButton}
                                                data-target=".bs-another-modal-center1">آپلود عکس کالاها
                                        </button>
                                    </div>
                                    <div className="col-lg-2 pt-4">
                                        <input type="text" className="form-control"
                                               placeholder="نام کالا را جهت جستجو وارد نماپید"
                                               ref={this.searchBox}
                                               onChange={this.filterProduct}
                                        />
                                    </div>
                                </div>
                                <hr/>
                                <SuccessAlertComponent message="کالای مورد نظر با موفقیت ثبت شد"
                                                       show={this.state.showSuccessAlert}/>
                                <FailureAlertComponent message={this.state.failureMessage}
                                                       isShow={this.state.showFailureAlert} />
                                <h6>{this.props.formDescription}</h6>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ProductListComponent productList={this.state.products}
                                                              onSelectItem={tag => this.handleSelectItem(tag)}
                                        />
                                    </div>
                                </div>


                                <ModalComponent modalId="bs-example-modal-center"
                                                modalTitle="معرفی کالا">
                                    <ProductEntryComponent
                                        onHide={this.handleHideImagePanel}
                                        onSubmit={(e) => this.getAllProducts(0)}
                                    />
                                </ModalComponent>

                                <ModalComponent modalId="bs-another-modal-center"
                                                modalTitle="آپلود عکس های کالا" >
                                    <FileUploadComponent toBeRender={true}
                                                         currentProductId={this.state.selectedProductId}
                                                         onHide={this.handleHideImagePanel}
                                                         onPostToApi={(images) => this.sendImagesToApi(images)}
                                                         editMode={this.state.imageInEditMode}
                                    />
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