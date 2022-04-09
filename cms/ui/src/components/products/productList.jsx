import React, {Component} from "react";
import axios from "axios";
import $ from 'jquery';
import MessageBoxComponent from "../messageBox/messageBox";
import SuccessAlertComponent from "../alert/successAlert";
const API_BASE_URL='http://localhost:3080';

class ProductListComponent extends Component {
    constructor(props) {
        super(props);
        this.selectCheckBox = React.createRef();
        this.state = {
            selectedProduct: -1,
            showConfirmModal: false,
            productIdForRemove : -1,
            showSuccessAlert :'none',
            successAlertMessage : '',
            productIdForEdit : -1,


        };

    }

    handleSelectRow = (e) => {
        if (e.target.checked) {
            const dataTag = Number(e.target.attributes['data-tag'].value);
            this.setState({selectedProduct: dataTag})
            this.props.onSelectItem(dataTag);
        } else {
            const dataTag = -1;
            this.setState({selectedProduct: dataTag})
            this.props.onSelectItem(dataTag);
        }


    }

    handleEditProduct = (e) =>{
        const referenceId = e.target.attributes['data-tag'].value;
        //this.setState({productIdForEdit : referenceId});
        this.props.onEditItem(referenceId);
        //console.log(referenceId);
    }

    handleRemoveProduct = (e) => {
        const referenceId = e.target.attributes['data-tag'].value;
        this.setState({productIdForRemove : referenceId});
    }

    handleConfirmRemove = () => {
        // TODO Check All business roles to prevent unattended remove product
        axios.post(`${API_BASE_URL}/product/rm`, {productId: this.state.productIdForRemove})
            .then(res => {
                if(res.statusText.toLowerCase() === 'ok'){
                    setTimeout(()=>{
                        this.setState({showSuccessAlert:'none', successAlertMessage : 'کالای مورد نظر با موفقیت ثبت گردید'});
                    },2000);
                    $('.close').click();
                    this.setState({showSuccessAlert:'', successAlertMessage : 'کالای مورد نظر با موفقیت حذف گردید'});
                    this.props.onDeleteItem();
                }
            });
    }
    render() {
        return (
            <React.Fragment>
                <MessageBoxComponent messageTitle="حذف کالا"
                                     message="آیا از حذف کالا اطمینان دارید ؟"
                                     onOk={this.handleConfirmRemove}
                                     onCancel={()=>$('.close').click()} />
                <SuccessAlertComponent message={this.state.successAlertMessage}
                                       show={this.state.showSuccessAlert}/>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">انتخاب</th>
                            <th scope="col">نام کالا</th>
                            <th scope="col">دسته بندی</th>
                            <th scope="col">تامین کننده</th>
                            <th scope="col">قیمت</th>
                            <th scope="col">تخفبف مجاز</th>
                            <th scope="col">وضعیت</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.productList.map(data => (
                                <tr key={data.productId}>
                                    <th><input type="checkbox" onChange={this.handleSelectRow} ref={this.selectCheckBox}
                                               data-tag={data.productId}/></th>
                                    <th>{data.title}</th>
                                    <th>{data.categoryTitle}</th>
                                    <th>{data.vendors[0].vendorTitle}</th>
                                    <th>{data.mainPrice}</th>
                                    <th>0</th>
                                    <th>موجود در انبار</th>
                                    <th>
                                        <button className="btn btn-warning mr-1"
                                                data-target=".bs-example-modal-center"
                                                data-toggle="modal"
                                                onClick={this.handleEditProduct}
                                                data-tag={data.productId}
                                        >ویرایس</button>
                                        &nbsp;
                                        <button className="btn btn-danger ml-1"
                                                data-tag ={data.productId}
                                                data-toggle="modal"
                                                data-target=".bs-message-modal"
                                                onClick={this.handleRemoveProduct}>حذف
                                        </button>
                                    </th>
                                </tr>
                            ))

                        }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductListComponent;