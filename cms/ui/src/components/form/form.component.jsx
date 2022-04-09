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
import ProductSpecsComponent from "../products/productSpecs";
import ReactPaginate from "react-paginate";

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
            selectedImgProductId : -1,
            selectedSpecProductId : -1,
            successAlertMessage :'',
            failureMessage:'',
            productSpecs : [],
            imageInEditMode: false,
            paginationSelection : 1,
            paginationButtonCount : 1,
            productInEditMode : false,
            productIdForEdit : -1,
            productForEdit : {},
        }
        this.addImageButton = React.createRef();
    }




    getAllProducts = (firstLoad) => {
        this.setState({productInEditMode : false});
        fetch(`${API_BASE_URL}/product/prodLen`)
            .then(data => data.json())
            .then(data => this.setState({paginationButtonCount : Math.ceil(data.dataLength / 5)},() => {


                fetch(`${API_BASE_URL}/product/${this.state.paginationSelection || 1}/${5}`, {mode: 'cors'})
                    .then(data => data.json())
                    .then(data => {
                        this.setState({products: data.products});
                        if(firstLoad !== 1){
                            setTimeout(()=>{
                                this.setState({showSuccessAlert:'none', successAlertMessage : 'کالای مورد نظر با موفقیت ثبت گردید'});
                            },2000);
                            this.setState({showSuccessAlert:''});
                        }
                    });
            }));



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
        if(isNaN(tag) || !tag) {
            this.setState({selectedImgProductId: -1});
            this.setState({selectedSpecProductId : -1});

        }else {
            this.setState({selectedImgProductId: tag});
            this.setState({selectedSpecProductId: tag});
            this.loadProductSpec();
        }
    }

    sendImagesToApi = (images) => {

        const frmData = new FormData();
        this.removeAllProductImage();
        images.map((image) => {

            frmData.delete('file');
            frmData.delete('productId');

            frmData.append('file', image);
            frmData.append('productId', this.state.selectedImgProductId)

            axios.post(`${API_BASE_URL}/common/upload`, frmData).then(res => {
                const localImageNames = [...this.state.imageNames];
                localImageNames.push(res.data.imageName);
                this.assignImageToProduct(res.data.imageName);
                this.setState({imageNames: localImageNames});
                $('.close').click();
                setTimeout(()=>{
                    this.setState({showSuccessAlert:'none'});
                },2000);
                this.setState({showSuccessAlert:'',successAlertMessage:'آپلود عکس ها با موفقیت انجام شد'});
            })

        });


    }

    assignImageToProduct = (img) => {
        axios.post(`${API_BASE_URL}/product/imgAssign`, {image: img, prodId: this.state.selectedImgProductId})
            .then(res => {
                console.log(res);
            });
    }

    removeAllProductImage = () => {
        if (this.state.selectedImgProductId !== -1) {
            this.state.products.map((data) => {
                if (data.productId === this.state.selectedImgProductId) {
                    const requestOptions = {
                        method: 'POST',
                        body: data.productId
                    };

                    axios.post(`${API_BASE_URL}/common/picRemove`, requestOptions).then(res => {
                        console.log(res);
                    });

                }
            });
        }
    }

    handleAddImage = (image) => {
        const clonedImages = [...this.state.images];
        clonedImages.push(image);
        this.setState({images: clonedImages});

    }

    selectProductForImage = (e) => {
        if(this.state.selectedImgProductId === -1){
            e.target.attributes['data-target'].value = '.bs';
            this.setState({showFailureAlert : '', failureMessage:'لطفا ابتدا یک محصول را انتخاب نمایید'});
            this.setState({imageInEditMode : true});
        }else{
            e.target.attributes['data-target'].value = '.bs-another-modal-center';
            this.setState({showFailureAlert : 'none', failureMessage:''});
        }
    }

    selectProductForSpecifications = (e) => {
        if(this.state.selectedSpecProductId === -1){
            e.target.attributes['data-target'].value = '.bs';
            this.setState({showFailureAlert : '', failureMessage:'لطفا ابتدا یک محصول را انتخاب نمایید'});
            //this.setState({ : true});
        }else{
            e.target.attributes['data-target'].value = '.bs-description-modal';
            this.setState({showFailureAlert : 'none', failureMessage:''});
            this.loadProductSpec();
        }
    }
    loadProductSpec = () => {
        if (this.state.selectedSpecProductId !== -1) {

            fetch(`${API_BASE_URL}/spec/${this.state.selectedSpecProductId}`)
                .then(data => data.json())
                .then(data => {
                    this.setState({productSpecs: data});
                });
        }
    }
    handlePaginateClick = (e) => {
        this.setState({paginationSelection : e.selected + 1}, () => {
            this.getAllProducts(1);
        })
       // console.log(e.selected);
    }

    handleEditProduct = (prodId) => {
        console.log(prodId);
        this.setState({productInEditMode : true});
        this.state.products.map((product)=>{
            if(Number(prodId) === Number(product.productId)){
                this.setState({productForEdit:product, productInEditMode : true});
            }
        })

    }

    handleNewProduct = (e) => {
        this.setState({productInEditMode : false});
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
                        <div className="card m-b-30" >
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-10">
                                        <h4 className="mt-0 header-title">{this.props.formType}</h4>
                                        <button type="button" className="btn btn-success waves-effect waves-light"
                                                data-toggle="modal"
                                                onClick={this.handleNewProduct}
                                                data-target=".bs-example-modal-center">کالای جدید
                                        </button>
                                        <button type="button" className="btn btn-info waves-effect waves-light ml-2"
                                                data-toggle="modal"
                                                onClick={this.selectProductForImage}
                                                ref={this.addImageButton}
                                                data-target=".bs-another-modal-center1">آپلود عکس کالاها
                                        </button>
                                        <button type="button" className="btn btn-info waves-effect waves-light ml-2"
                                                data-toggle="modal"
                                                onClick={this.selectProductForSpecifications}
                                                data-target=".bs-message-modal">معرفی توضبحات
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
                                <SuccessAlertComponent message={this.state.successAlertMessage}
                                                       show={this.state.showSuccessAlert}/>
                                <FailureAlertComponent message={this.state.failureMessage}
                                                       isShow={this.state.showFailureAlert} />
                                <h6>{this.props.formDescription}</h6>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ProductListComponent productList={this.state.products}
                                                              onDeleteItem={() => this.getAllProducts(1)}
                                                              onSelectItem={tag => this.handleSelectItem(tag)}
                                                              onEditItem={(prodId)=>this.handleEditProduct(prodId)}
                                        />

                                            <ReactPaginate pageCount={this.state.paginationButtonCount}
                                            containerClassName="pagination"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousLabel="قبلی"
                                            nextLabel="بعدی"
                                            onClick={this.handlePaginateClick}
                                            />


                                    </div>
                                </div>


                                <ModalComponent modalId="bs-example-modal-center"
                                                modalTitle={this.state.productInEditMode === true ? 'ویرایش کالا' : "معرفی کالا"}>
                                    <ProductEntryComponent
                                        onHide={this.handleHideImagePanel}
                                        getEditMode={() => {return this.state.productInEditMode}}
                                        editMode={this.state.productInEditMode}
                                        productForEdit={this.state.productForEdit}
                                        onSubmit={(e) => this.getAllProducts(0)}
                                    />
                                </ModalComponent>
                                <ModalComponent modalId="bs-description-modal"
                                                modalTitle="معرفی مشخصات کالا">

                                    <ProductSpecsComponent productSpecifications={this.state.productSpecs}
                                                           selectedProd = {this.state.selectedSpecProductId}
                                    />



                                </ModalComponent>
                                <ModalComponent modalId="bs-another-modal-center"
                                                modalTitle="آپلود عکس های کالا" >
                                    <FileUploadComponent toBeRender={true}
                                                         currentProductId={this.state.selectedImgProductId}
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