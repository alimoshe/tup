import React, {Component} from "react";
import FailureAlertComponent from "../alert/failureAlert";
import axios from 'axios';
import $ from 'jquery';


const API_BASE_URL = 'http://localhost:3080';

const productSpec = {
    productId  : -1,
    specKey : '',
    specValue : '',
};
class ProductSpecsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            showFailureAlert : 'none',
            inEditMode : false,
        }
        this.specTitle = React.createRef();
        this.specValue = React.createRef();
    }



    handleFormSubmit = () => {
        if(!this.validation())
            return ;

        productSpec.specKey = this.specTitle.current.value;
        productSpec.specValue = this.specValue.current.value;
        productSpec.productId = this.props.selectedProd;
        const dataForSendToApi = {
            data : productSpec,
            mode : this.state.inEditMode === true ? 'edit' : 'new'
        }
        axios.post(`${API_BASE_URL}/spec/`, dataForSendToApi)
            .then(res => {
                if(res.statusText.toLowerCase() === 'ok'){
                    $('.close').click();
                }
            })
    }



    validation = () => {

        if(!this.specTitle.current.value || !this.specValue.current.value){
            this.setState({errorMessage : 'اطلاعات خواسته شده را کامل کنید', showFailureAlert:''})
            return false;
        }else{
            this.setState({errorMessage : '', showFailureAlert:'none'})
            return true;
        }
    }

    handleRemove(e){
        const id = e.target.attributes['data-target'].value;
        const dataForSendToApi = {
            data : productSpec,
            id:id
        }
        axios.post(`${API_BASE_URL}/spec/rm`, dataForSendToApi)
            .then(res => {
                if(res.statusText.toLowerCase() !== 'ok'){
                    this.setState({errorMessage : 'حذف اطلاعات با خطا مواجه شد', showFailureAlert:''})
                }else{
                    $('.close').click();
                }
            })
    }

    componentDidMount() {


    }


    render() {
        return (
            <React.Fragment>
                <FailureAlertComponent message={this.state.errorMessage} isShow={this.state.showFailureAlert}/>
                <form className={""} action="#">
                    <div className="form-group">
                        <label>عنوان کالا</label>
                        <input type="text"
                               data-parsley-type="string"
                               className="form-control"

                               ref={this.specTitle}
                               placeholder="عنوان را تایپ کنید"/>
                    </div>
                    <div className="form-group">
                        <label>قیمت</label>
                        <div>
                            <input data-parsley-type="number"
                                   type="text"
           معرفی مشخصات کا                        className="form-control"

                                   ref={this.specValue}
                                   placeholder="فقط مقدار را وارد کنید"/>
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleFormSubmit}
                            className="btn btn-success waves-effect waves-light mb-3">
                        تایید
                    </button>
                </form>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">عنوان</th>
                            <th scope="col">مقدار</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            this.props.productSpecifications.map(data => (
                                <tr key={data._id.toString()}>
                                    <th>{data.specKey}</th>
                                    <th>{data.specValue}</th>
                                    <th><button className="btn btn-danger"
                                                onClick={this.handleRemove}
                                                data-target={data._id.toString()}>حذف</button></th>
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

export default ProductSpecsComponent;