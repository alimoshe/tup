import React, {useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';
import FailureAlertComponent from "../../components/alert/failureAlert";
import {useRecoilValue} from "recoil";
import vendorGlobal from "../../global/vendor/vendor.global";
import axios from "axios";


// Define States
const API_BASE_URL = "http://localhost:3080";
const PicturesCard = ({imageName, reload}) => {
    return (
        <img className="img-thumbnail"
             alt="200x200"
             style={{width: '200px', height: '200px'}}
             src={imageName} data-holder-rendered="true"/>
    )

}


const ProductVendors = ({product, render}) => {

    const onSaveChange = (e) => {
        e.preventDefault();
    }
    console.log(product);
    const referenceData = product[0];
    if (referenceData && render === true) {
        const allVendors = referenceData.vendors;
        return (
            <React.Fragment>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">کد تامین کننده</th>
                        <th scope="col"> نام تامین کننده</th>
                        <th scope="col">عملیات</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        allVendors.map((data, index) => (
                            <tr key={index}>
                                <td>{data.vendorId}</td>
                                <td>{data.vendorTitle}</td>
                                <td>
                                    <button className="btn btn-danger ml-1"
                                            data-tag={data.vendorId}
                                            data-toggle="modal"
                                            data-target=".bs-message-modal">حذف
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary waves-effect waves-light mb-3"
                        data-toggle="modal"
                        onClick={onSaveChange}
                        data-target=".bs-example-modal-center">ذخیره تغییرات
                </button>
            </React.Fragment>
        )
    } else
        return <></>
}


const NewVendor = ({
                       render,
                       vendorEcoCode,
                       vendorAddress,
                       vendorTitle,
                       validationFail,
                       saveOK,
                       onCancel
                   }) => {
    const validation = () => {
        const title = vendorTitle.current.value;
        const address = vendorAddress.current.value;
        const ecoCode = vendorEcoCode.current.value;

        return title.length >= 3 && address.length >= 5 && ecoCode.length >= 5;
    }

    const useSubmitClick = (e) => {
        e.preventDefault();
        if (!validation()) {
            validationFail();
            return;
        }

        const postVendor = async () => {
            const result = await axios.post(`${API_BASE_URL}/vendor`,
                {
                    vendorId: -1,
                    vendorTitle: vendorTitle.current.value,
                    vendorAddress: vendorAddress.current.value,
                    vendorEcoCode: vendorEcoCode.current.value
                })
            return result.statusText;

        }
        postVendor().then(data => {
            if (data.toLowerCase() === 'ok') {
                saveOK();
            }
        });
    }

    const useCancelForm = (e) => {
        e.preventDefault();
        onCancel();
    }

    return (
        <div className="row" style={{display: render === true ? '' : 'none'}}>
            <div className="col-lg-3">
                <form className={""} action="#">
                    <div className="form-group">
                        <label>نام تامین کننده</label>
                        <input type="text"
                               data-parsley-type="string"
                               className="form-control"
                               required
                               ref={vendorTitle}
                               placeholder="چیزی را تایپ کنید"/>
                    </div>
                    <div className="form-group">
                        <label>آدرس</label>
                        <input type="text"
                               data-parsley-type="string"
                               className="form-control"
                               required
                               id="txtVendorAddress"
                               ref={vendorAddress}
                               placeholder="آدرس"/>
                    </div>
                    <div className="form-group">
                        <label>کد اقتصادی</label>
                        <input type="text"
                               data-parsley-type="string"
                               id="txtEcoCode"
                               className="form-control"
                               required
                               ref={vendorEcoCode}
                               placeholder="کد اقتصادی"/>

                    </div>
                    <button type="submit"
                            onClick={useSubmitClick}
                            className="btn btn-success waves-effect waves-light">
                        تایید
                    </button>
                    <button data-dismiss="modal"
                            onClick={useCancelForm}
                            className="btn btn-danger waves-effect ml-2">
                        لغو
                    </button>
                </form>
            </div>
        </div>
    )
}

const ProductProfile = ({formHeader, formType}) => {


    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const [showFailMessage, setShowFailMessage] = useState('none');
    const [renderNewVendor , setRenderNewVendor] = useState(false);
    const [renderTable, setRenderTable] = useState(true);
    const [cloneProduct, setCloneProduct] = useState([]);

    const refFilter = useRef('0');
    const vendorTitle = useRef('');
    const vendorAddress = useRef('');
    const vendorEcoCode = useRef('');
    const filterProduct = (filter) => {
        if (filter && filter > 0) {
            productApi.filterProduct(filter, (selected) => {
                setProduct(selected);
                setCloneProduct(selected[0].vendors);
            });
        }
    }

    const loadImg = (filter) => {
        productApi.loadPicturesLength(filter,
            (img) => {
                setShowFailMessage('none');
                setImages(img)
            },
            () => setShowFailMessage(''));
    }

    const onNewVendorClick = (e) => {
      setRenderNewVendor(true);
      setRenderTable(false);
    }

    const onCancelNewVendor = () => {
      setRenderNewVendor(false);
      setRenderTable(true);
    }

    const load = (e) => {

        e.preventDefault();
        const filter = Number(refFilter.current.value);
        loadImg(filter);
        filterProduct(filter);

    }

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <FailureAlertComponent isShow={showFailMessage}
                                   message="کالای مورد نظر یافت نشد"/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-2">`
                            <div className="form-group">

                                <input type="text"
                                       data-parsley-type="number"
                                       id="txtSearch"
                                       className="form-control"
                                       required
                                       ref={refFilter}
                                       placeholder="کد کالا"/>
                            </div>
                        </div>
                        <div className="col-lg-2 mt-3">
                            <button type="button" className="btn btn-success waves-effect waves-light"
                                    data-toggle="modal"
                                    onClick={load}
                                    data-target=".bs-example-modal-center">جستجو
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
                                    <h4 className="mt-0 header-title">عکس های مربوطه به کالا</h4>
                                    {
                                        images.map((data, index) => (
                                            <PicturesCard key={index}
                                                          imageName={data}/>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card m-b-30">
                                <div className="card-body">
                                    <h4 className="mt-0 header-title">تامین کنندگان کالا</h4>
                                    {
                                        !renderNewVendor && (
                                            <button type="button" className="btn btn-success waves-effect waves-light mb-3"
                                                    data-toggle="modal"
                                                    onClick={onNewVendorClick}
                                                    data-target=".bs-example-modal-center">تامین کننده جدید
                                            </button>
                                        )
                                    }

                                    <NewVendor render={renderNewVendor}
                                               vendorAddress={vendorAddress}
                                               vendorTitle={vendorTitle}
                                               vendorEcoCode={vendorEcoCode}
                                               onCancel={onCancelNewVendor}

                                    />
                                    <ProductVendors product={cloneProduct}
                                                    render={renderTable}
                                    />
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