import React, {Component, useEffect, useRef, useState} from 'react';
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import {useRecoilState, useRecoilValue} from "recoil";
import vendorGlobal from "../../global/vendor/vendor.global";
import axios from "axios";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import FailureAlertComponent from "../../components/alert/failureAlert";
import SuccessAlertComponent from "../../components/alert/successAlert";
import ReactPaginate from "react-paginate";


const API_BASE_URL = "http://localhost:3080";

const NewVendor = ({
                       render,
                       vendorEcoCode,
                       vendorAddress,
                       vendorTitle,
                       validationFail,
                       saveOK,
                       onCancel,
                   }) => {
    const validation = () => {
        const title = vendorTitle.current.value;
        const address = vendorAddress.current.value;
        const ecoCode = vendorEcoCode.current.value;

        return title.length >= 3 && address.length >= 5 && ecoCode.length >= 5;
    }
    const allItemsCont = useRecoilValue(vendorGlobal.vendorSelector);

    const useSubmitClick = (e) => {
        e.preventDefault();
        if (!validation()) {
            validationFail();
            return;
        }

        const postVendor = async () => {

            const result = await axios.post(`${API_BASE_URL}/vendor`,
                {
                    vendorId: allItemsCont.length + 1,
                    vendorTitle: vendorTitle.current.value,
                    vendorAddress: vendorAddress.current.value,
                    vendorEcoCode: vendorEcoCode.current.value
                })
            //console.log(result.data);
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
                               ref={vendorAddress}
                               placeholder="آدرس"/>
                    </div>
                    <div className="form-group">
                        <label>کد اقتصادی</label>
                        <input type="text"
                               data-parsley-type="string"
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


const VendorList = (props) => {

    return (

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


                props.allVendors.map((data) => (
                    <tr key={data.vendorId}>
                        <td>{data.vendorId}</td>
                        <td>{data.vendorTitle}</td>
                        <td>
                            <button className="btn btn-warning mr-1"
                                    data-target=".bs-example-modal-center"
                                    data-toggle="modal"

                                    data-tag={data.vendorId}
                            >ویرایس
                            </button>
                            &nbsp;
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

    );
}


function VendorsTable(props) {
    const [vendors, setVendors] = useRecoilState(vendorGlobal.vendorState);

    const fetchData = async () => {
        const result = await axios.get(`${API_BASE_URL}/vendor`);
        setVendors(result.data);
    };
    useEffect(() => {
        const res = fetchData();
    }, [])
    //console.log(vendors.data);
    //return <div>test</div>
    if (props.render) {
        return <VendorList allVendors={vendors}/>
    } else {
        return <></>
    }

}

const useVendorsByCaller = () => {
    const [vendors, setVendors] = useRecoilState(vendorGlobal.vendorState);
    const fetchData = async () => {
        const result = await axios.get(`${API_BASE_URL}/vendor`);
        setVendors(result.data);
    };
}
const VendorComponent = (props) => {

    const [newPanel, setNewPanel] = useState(false);
    const [listPanel, setListPanel] = useState(true);
    const [paginationButtonCount, setPaginationButtonCount] = useState(1);
    const [validationFail, setValidationFail] = useState('none');


    useEffect(() => {
        setValidationFail('none');
        setPaginationButtonCount(3);
    }, []);

    const vendorTitle = useRef();
    const vendorAddress = useRef();
    const vendorEcoCode = useRef();

    const newVendorClick = () => {
        setListPanel(false);
        setNewPanel(true);
    }

    const validation = () => {
        setValidationFail('');
    }


    const useOk = () => {
        setListPanel(true);
        setNewPanel(false);

        useVendorsByCaller();
    }

    const useCancel = (e) => {
        setListPanel(true);
        setNewPanel(false);
    }

    const handlePaginateClick = (e) => {
        console.log(e);
    }
    return (
        <React.Fragment>

            <FormToolbarComponent formHeader="معرفی تامین گنندگان کالا"/>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10">
                                    <h4 className="mt-0 header-title"> </h4>
                                    <button type="button" className="btn btn-success waves-effect waves-light"
                                            data-toggle="modal"
                                            onClick={newVendorClick}
                                            data-target=".bs-example-modal-center">تامین کننده جدید
                                    </button>

                                </div>
                                <div className="col-lg-2">

                                </div>
                            </div>
                            <hr/>
                            تامین کنندگان کالا را به درستی وارد نماپید
                            <div className="row">
                                <div className="col-lg-12">


                                    <VendorsTable render={listPanel}/>
                                    <NewVendor render={newPanel}
                                               vendorTitle={vendorTitle}
                                               vendorEcoCode={vendorEcoCode}
                                               vendorAddress={vendorAddress}
                                               validationFail={validation}
                                               saveOK={useOk}
                                               onCancel={useCancel}
                                    />
                                    <div style={{display:listPanel === true ? '' : 'none'}}>
                                    <ReactPaginate pageCount={paginationButtonCount}
                                                   containerClassName="pagination"
                                                   nextClassName="page-item"
                                                   nextLinkClassName="page-link"
                                                   previousClassName="page-item"
                                                   previousLinkClassName="page-link"
                                                   pageClassName="page-item"
                                                   pageLinkClassName="page-link"
                                                   previousLabel="قبلی"
                                                   nextLabel="بعدی"
                                                   onClick={handlePaginateClick} />
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )


}


export default VendorComponent;