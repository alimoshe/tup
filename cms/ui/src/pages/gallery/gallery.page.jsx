import React, {useEffect, useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import './style.css';
import $ from 'jquery';
import masterData from "../../api/masterData";
import GalleryApi from "../../api/gallery";
import SuccessAlertComponent from "../../components/alert/successAlert";
const IMAGE_API_URL = 'http://localhost:3080/common/getImg';

const ImageContainer = ({image}) => {
    return (
        <React.Fragment>

                <a className="ml-3 img-thumbnail" style={{display:'inline-block'}} data-toggle="modal" data-target="remove-elem">
                    <img className="img-fluid d-block image-container" src={IMAGE_API_URL + '/' + image}
                         alt="" width="200" height="200"/>
                </a>

        </React.Fragment>
    )
}

const GalleryPage = ({formHeader, formType}) => {

    const [images, setImages] = useState([]);
    const [superCategory, setSuperCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [activityGroups, setActivityGroups] = useState([]);
    const [successAddImage, setSuccessAddImage] = useState('none');
    const [searchButtonRender, setSearchButtonRender] =  useState(true);
    const [currentCategory, setCurrentCategory] = useState(1);
    const categorySelected = useRef();

    const selectPicture = (e) => {
        e.preventDefault();
        $('.btnChoosePicture').click();

    }

    useEffect( ()=>{
        setActivityGroups(masterData.activityGroups);
        setSuperCategory(filterSuperCategory(1));
        setCategory(filterCategory(1));
        setSuccessAddImage('none');
        setSearchButtonRender(true);
    },[])

    const filterSuperCategory = (filter) => {
        return masterData.superCategory.filter((item) => {
            return item.activityGroupId === filter;
        });
    }

    const filterCategory = (filter) =>{
        return masterData.category.filter((item) => {
            return item.superCategoryId === filter;
        });
    }

    const addImageToGallery = async (postImageResult) => {
        const galleryItem = {
            itemId : await GalleryApi.getGalleryLen() + 1,
            sectionId : Number(categorySelected.current.value),
            title : '',
            typeId:-1,
            isMain:false,
            picturePath : '',
            expireDate:null,
            visible:true,
            blobName : postImageResult.data.imageName,
        }
        GalleryApi.assignItemIdAndSend(galleryItem, (res) => {

        })
    }

    const handleSelectedFile = (e) => {
        GalleryApi.sendImagesToApi(e.target.files[0],(imageName) => addImageToGallery(imageName));
    }

    const loadImagesFromDb = async () => {

        const categoryFilter = Number(categorySelected.current.value);

        await GalleryApi.loadImages(categoryFilter,(currentFile)=>{
            let imageArr = [...images];
            currentFile.map((element) => {
                imageArr.push(element.itemId);
            })
            setImages(imageArr)
            console.log(images);
        });





    }

    const handleActivityChanged = (e) => {
        const value = Number(e.target.value);
        const filtered = filterSuperCategory(value);
        if(filtered.length < 1){
            setCategory([]);
            setSuperCategory(filtered);
        }else {
            setSuperCategory(filtered);
            setCategory(filterCategory(1));
        }

    }

    const handleSuperCategoryChanged = (e) => {
        setSearchButtonRender(true);
        const value = Number(e.target.value);
        setCategory(filterCategory(value));


    }

    const handleCategoryChange = (e)=>{
        console.log(e.target.value);
    }

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10" style={{display:'inline-block'}}>
                                    <h4 className="mt-0 header-title">{formType}</h4>
                                    <SuccessAlertComponent show={successAddImage}
                                                           message="تصویر موردنظر در پایگاه داده ذخیره شد"
                                    />
                                    <div className="row">
                                        <div className="col-lg-1">
                                            <button type="button" className="btn btn-success waves-effect waves-light"
                                                    data-toggle="modal"
                                                    onClick={selectPicture}
                                                    data-target=".bs-example-modal-center">تصویر جدید
                                            </button>
                                        </div>
                                        <div className="col-lg-1">
                                            <label className="mt-3" style={{float:'left', textAlign:'center'}}>گروه فعالیتی</label>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form-group m-t-10">
                                                <select className="form-control" onChange={handleActivityChanged} >
                                                    {
                                                        masterData.activityGroups.map((data, index)=> (
                                                            <option key={data.id}
                                                                    value={data.id}>{data.title}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <label className="mt-3" style={{float:'left', textAlign:'center'}}> گروه تصاویر</label>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form-group m-t-10">
                                                <select className="form-control" onChange={handleSuperCategoryChanged}>
                                                    {
                                                        superCategory.map((data, index)=> (
                                                            <option key={data.id}
                                                                    value={data.id}>{data.title}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                        <div className="col-lg-1">
                                            <label className="mt-3" style={{float:'left', textAlign:'center'}}> زیر گروه </label>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form-group m-t-10">
                                                <select ref={categorySelected} className="form-control"  onChange={handleCategoryChange}>
                                                    {
                                                        category.map((data, index)=> (
                                                            <option key={index}
                                                                    value={data.id}>{data.title}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                        <div className="col-lg-1">
                                            {
                                                searchButtonRender && (
                                                    <button type="button" className="btn btn-success waves-effect waves-light"
                                                            data-toggle="modal"
                                                            onClick={  loadImagesFromDb}
                                                            data-target=".bs-example-modal-center"> جستجوی عکس ها
                                                    </button>
                                                )
                                            }

                                        </div>
                                        <div className="col-lg-1">
                                            {
                                                searchButtonRender && (
                                                    <button type="button" className="btn btn-danger waves-effect waves-light"
                                                            data-toggle="modal"

                                                            data-target=".bs-example-modal-center">انصراف
                                                    </button>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <input className="input-group btnChoosePicture"
                                           accept=".gif,.jpg,.jpeg,.png"
                                           id="btnChoosePicture"
                                           onInput={handleSelectedFile}
                                           type="file" style={{display: 'none'}}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-lg-12" style={{display:images.length > 0 ? '' : 'none'}}  >
                                    {

                                        images.map((url, index) => (

                                            <ImageContainer key={index} image={url}/>
                                        ))
                                    }
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