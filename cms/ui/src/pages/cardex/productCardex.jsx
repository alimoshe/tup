import React, {useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';
import vendorApi from "../../api/vendor";
import FailureAlertComponent from "../../components/alert/failureAlert";


// Define States
const API_BASE_URL = "http://localhost:3080";
const PicturesCard = ({imageName}) => {
    if (imageName) {
        return (
            <img className="img-thumbnail"
                 alt="200x200"
                 style={{width: '200px', height: '200px'}}
                 src={imageName} data-holder-rendered="true"/>
        )
    } else
        return <></>
}


const ProductVendors = ({vendors, render, onSave, onRemove}) => {

    const onSaveChange = (e) => {
        e.preventDefault();
        onSave();
    }


    if (vendors && render === true) {

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
                        vendors.map((data, index) => (
                            <tr key={index}>
                                <td>{data.vendorId}</td>
                                <td>{data.vendorTitle}</td>
                                <td>
                                    <button className="btn btn-danger ml-1"
                                            data-tag={data.vendorId}
                                            data-toggle="modal"
                                            onClick={onRemove}
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
                       vendorCode,
                       saveOK,
                       onCancel
                   }) => {

    const [displayError, setDisplayError] = useState('none');
    const [displayVendor, setDisplayVendor] = useState(false);
    const [foundedVendor, setFoundedVendor] = useState({});
    const useSubmitClick = (e) => {
        e.preventDefault();
        saveOK(foundedVendor);
    }

    const useCancelForm = (e) => {
        e.preventDefault();
        onCancel();
    }

    const searchVendor = (e) => {
        e.preventDefault();
        const vc = vendorCode.current.value;
        vendorApi.loadVendorById(Number(vc), (data) => {
            //console.log(data);
            const vendor = data.data;
            if (vendor) {
                setFoundedVendor(vendor);
                setDisplayVendor(true);
                setDisplayError('none');
            } else {
                setFoundedVendor({});
                setDisplayVendor(false);
                setDisplayError('');
            }
        });
    }
    return (
        <div className="row" style={{display: render === true ? '' : 'none'}}>
            <div className="col-lg-5">
                <FailureAlertComponent isShow={displayError}
                                       message="تامین کننده مورد نظر یافت نشد"/>
                <form className={""} action="#">
                    <div className="form-group">
                        <label>کد تامین کننده</label>
                        <input type="text"
                               data-parsley-type="string"
                               className="form-control"
                               required
                               ref={vendorCode}
                               placeholder="چیزی را تایپ کنید"/>
                        <button type="submit"
                                onClick={searchVendor}
                                className="btn btn-primary mt-3 waves-effect waves-light">
                            جستجوی تامین کننده
                        </button>
                        <br/>
                        {
                            displayVendor && (
                                <h4 className="mt-3"> {foundedVendor.vendorTitle}</h4>
                            )
                        }

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
    const [renderNewVendor, setRenderNewVendor] = useState(false);
    const [renderTable, setRenderTable] = useState(true);
    const [cloneVendor, setCloneVendor] = useState([]);
    const [picturePanelRender, setPicturePanelRender] = useState(false);
    const [vendorPanelRender, setVendorPanelRender] = useState(false);
    const refFilter = useRef('0');
    const vendorCode = useRef('');

    const filterProduct = (filter) => {
        if (filter && filter > 0) {
            productApi.filterProduct(filter, (selected) => {
                setProduct(selected);
                console.log(selected[0].vendors);
                setCloneVendor(selected[0].vendors);
                setVendorPanelRender(true)
            });

        }
    }

    const saveChanges = () => {

    }

    const newVendorOk = (vendor) => {

        const filtered = cloneVendor.filter((item) => {
            return Number(item.vendorId) === Number(vendor.vendorId)
        });
        console.log(filtered);
        if(filtered.length < 1){
            const copyVendors = [...cloneVendor];
            copyVendors.push(vendor);
            setCloneVendor(copyVendors);
            setRenderNewVendor(false);
            setRenderTable(true);
        }



    }

    const loadImg = (filter) => {
        productApi.loadPicturesLength(filter,
            (img) => {
                setShowFailMessage('none');
                setImages(img)
                setPicturePanelRender(true);

            },
            () => {
            setShowFailMessage('');
            setPicturePanelRender(false);
            setVendorPanelRender(false);
        });
    }

    const onNewVendorClick = (e) => {
        setRenderNewVendor(true);
        setRenderTable(false);
    }

    const deleteVendor = (e) => {
        const candidateToRemove = Number(e.target.attributes['data-tag'].value);
        const removed = cloneVendor.filter((item) => {
            return Number(item.vendorId) !== candidateToRemove;
        })
        setCloneVendor(removed);
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
                            {
                                picturePanelRender && (
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
                                )
                            }

                        </div>
                        <div className="col-lg-6">
                            {
                                vendorPanelRender && (
                                    <div className="card m-b-30">
                                        <div className="card-body">
                                            <h4 className="mt-0 header-title">تامین کنندگان کالا</h4>
                                            {
                                                !renderNewVendor && (
                                                    <button type="button"
                                                            className="btn btn-success waves-effect waves-light mb-3"
                                                            data-toggle="modal"
                                                            onClick={onNewVendorClick}
                                                            data-target=".bs-example-modal-center">تامین کننده جدید
                                                    </button>
                                                )
                                            }

                                            <NewVendor render={renderNewVendor}
                                                       vendorCode={vendorCode}
                                                       onCancel={onCancelNewVendor}
                                                       saveOK={(v) => newVendorOk(v)}

                                            />
                                            <ProductVendors vendors={cloneVendor}
                                                            render={renderTable}
                                                            onRemove={deleteVendor}
                                                            onSave={saveChanges}
                                            />
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductProfile;