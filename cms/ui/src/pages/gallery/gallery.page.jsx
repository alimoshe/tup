import React, {useRef} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";

const GalleryPage = ({formHeader,formType}) => {

    const searchBox = useRef();

    return(
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30" >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10">
                                    <h4 className="mt-0 header-title">{formType}</h4>
                                    <button type="button" className="btn btn-success waves-effect waves-light"
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center">کالای جدید
                                    </button>
                                </div>
                                <div className="col-lg-2 pt-4">
                                    <input type="text" className="form-control"
                                           placeholder="نام کالا را جهت جستجو وارد نماپید"
                                           ref={searchBox}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default GalleryPage;