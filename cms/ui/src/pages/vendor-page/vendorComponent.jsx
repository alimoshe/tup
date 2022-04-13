import React, {Component, useEffect, useRef, useState} from 'react';
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import {useRecoilState, useRecoilValue} from "recoil";
import vendorGlobal from "../../global/vendor/vendor.global";
import axios from "axios";
import $ from 'jquery';
import ReactPaginate from "react-paginate";
import MessageBoxComponent from "../../components/messageBox/messageBox";
import FailureAlertComponent from "../../components/alert/failureAlert";
import ModalComponent from "../../components/modal/modal";
import FileUploadComponent from "../../components/file-upload/fileUpload";


const API_BASE_URL = "http://localhost:3080";

const NewVendor = ({
                       render,
                       vendorEcoCode,
                       vendorAddress,
                       vendorTitle,
                       validationFail,
                       saveOK,
                       onCancel,
                       selected
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
                    vendorId: -1,
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

    if (selected !== 0) {
        const toBeEdit = allItemsCont.filter((vendor) => {
            return vendor.vendorId === selected;
        });
        if (toBeEdit.length > 0) {
            vendorTitle.current.value = toBeEdit[0].vendorTitle;
            vendorAddress.current.value = toBeEdit[0].vendorAddress;
            vendorEcoCode.current.value = toBeEdit[0].vendorEcoCode;
        }
        console.log(toBeEdit);
    } else {
        // TODO Clear all input fields
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

const VendorList = ({onEdit, allVendors, onRemove}) => {

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


                allVendors.map((data) => (
                    <tr key={data.vendorId}>
                        <td>{data.vendorId}</td>
                        <td>{data.vendorTitle}</td>
                        <td>
                            <button className="btn btn-warning mr-1"
                                    data-target=".bs-example-modal-center"
                                    data-toggle="modal"
                                    onClick={onEdit}
                                    data-tag={data.vendorId}
                            >ویرایش
                            </button>
                            &nbsp;
                            <button className="btn btn-danger ml-1"
                                    data-tag={data.vendorId}
                                    onClick={onRemove}
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


function VendorsTable({editVendor, render, removeVendor, vendors}) {


    if (render) {
        return <VendorList allVendors={vendors} onEdit={editVendor} onRemove={removeVendor}/>
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
const VendorComponent = () => {

    const [newPanel, setNewPanel] = useState(false);
    const [listPanel, setListPanel] = useState(true);
    const [paginationButtonCount, setPaginationButtonCount] = useState(1);
    const [validationFail, setValidationFail] = useState('none');
    const [vendorToRemove, setVendorToRemove] = useState(0);
    const [selectedVendor, setSelectedVendor] = useState(0);
    const [vendors, setVendors] = useRecoilState(vendorGlobal.vendorState);

    const fetchData = async () => {
        const result = await axios.get(`${API_BASE_URL}/vendor`);
        setVendors(result.data);
    };
    useEffect(() => {
        const res = fetchData();
    }, [])

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
        setSelectedVendor(0);
    }

    const validation = () => {
        setValidationFail('');
    }


    const useOk = () => {
        setListPanel(true);
        setNewPanel(false);

        fetchData().then();
    }

    const useCancel = (e) => {
        setListPanel(true);
        setNewPanel(false);
    }

    const handlePaginateClick = (e) => {
        console.log(e);
    }

    const onEditVendor = (e) => {
        const selVendor = e.target.attributes['data-tag'].value;
        setSelectedVendor(Number(selVendor));

        setListPanel(false);
        setNewPanel(true);
    }
    const setRemoveVendorId = (e) => {
        const selVendor = e.target.attributes['data-tag'].value;
        setVendorToRemove(Number(selVendor));

    }
    const handleConfirmRemove = () => {
        axios.post(`${API_BASE_URL}/vendor/rm`,
            {vendorId: Number(vendorToRemove)})
            .then(data => {
                if(data.statusText.toLowerCase() === 'ok'){
                    fetchData().then();
                    $('.close').click();
                }
            });
}
    return (
        <React.Fragment>

            <MessageBoxComponent messageTitle="حذف تامین کننده"
                                 message="آیا از حذف تامین کننده اطمینان دارید ؟"
                                 onOk={handleConfirmRemove}
                                 onCancel={() => $('.close').click()}/>
            <FormToolbarComponent formHeader="معرفی تامین گنندگان کالا"/>


            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10">
                                    {/*<h4 className="mt-0 header-title"></h4>*/}
                                    {
                                        !newPanel &&
                                        <button type="button" className="btn btn-success waves-effect waves-light"
                                                data-toggle="modal"
                                                onClick={newVendorClick}
                                                data-target=".bs-example-modal-center">تامین کننده جدید
                                        </button>
                                    }


                                </div>
                                <div className="col-lg-2">

                                </div>
                            </div>
                            <hr/>
                            تامین کنندگان کالا را به درستی وارد نماپید
                            <div className="row">
                                <div className="col-lg-12">


                                    <VendorsTable render={listPanel}
                                                  editVendor={onEditVendor}
                                                  removeVendor={setRemoveVendorId}
                                                  vendors={vendors}
                                    />
                                    <NewVendor render={newPanel}
                                               vendorTitle={vendorTitle}
                                               vendorEcoCode={vendorEcoCode}
                                               vendorAddress={vendorAddress}
                                               validationFail={validation}
                                               saveOK={useOk}
                                               selected={selectedVendor}
                                               onCancel={useCancel}

                                    />
                                    <div style={{display: listPanel === true ? '' : 'none'}}>
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
                                                       onClick={handlePaginateClick}/>
                                    </div>


                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">

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