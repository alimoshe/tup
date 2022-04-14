import React, {useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import './style.css';
import $ from 'jquery';

const ImageContainer = ({image}) => {
    return (
        <React.Fragment>
            <a className="image-popup-no-margins" data-toggle="modal" data-target="remove-elem">
                <img className="img-fluid d-block image-container" src={image}
                     alt="" width="200" height="200"/>
            </a>
        </React.Fragment>
    )
}

const GalleryPage = ({formHeader, formType}) => {

    const [images, setImages] = useState([]);
    const [singleImage, setSingleImage] = useState('');
    const selectPicture = (e) => {
        e.preventDefault();
        $('.btnChoosePicture').click();
    }

    const handleSelectedFile = (e) => {
        console.log(e.target.files[0]);
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        setSingleImage(imgUrl);
    }

    const searchBox = useRef();

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10">
                                    <h4 className="mt-0 header-title">{formType}</h4>
                                    <button type="button" className="btn btn-success waves-effect waves-light"
                                            data-toggle="modal"
                                            onClick={selectPicture}
                                            data-target=".bs-example-modal-center">تصویر جدید
                                    </button>
                                    <input className="input-group btnChoosePicture"
                                           accept=".gif,.jpg,.jpeg,.png"
                                           id="btnChoosePicture"
                                           onInput={handleSelectedFile}
                                           type="file" style={{display: 'none'}}/>
                                </div>
                            </div>
                            <hr/>
                            <ImageContainer image={singleImage}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default GalleryPage;