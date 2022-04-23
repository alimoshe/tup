import React, {useEffect, useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import './style.css';
import $ from 'jquery';
import masterData from "../../api/masterData";
import GalleryApi from "../../api/gallery";
import SuccessAlertComponent from "../../components/alert/successAlert";
import ModalComponent from "../../components/modal/modal";
import FailureAlertComponent from "../../components/alert/failureAlert";
import productApi from "../../api/product";

const IMAGE_API_URL = 'http://localhost:3080/common/getImg';


const ImageContainer = ({image, selectImage, width, height}) => {
    const selectPicture = (e) => {
        e.preventDefault();
        selectImage(e);
    }
    return (
        <React.Fragment>

            <a className="ml-3 img-thumbnail" onClick={selectPicture} style={{display: 'inline-block'}}
               data-target=".bs-example-modal-center" data-toggle="modal">
                <img className="img-fluid d-block image-container" src={IMAGE_API_URL + '/' + image}
                     alt="" width={width} height={height} data-tag={image}/>
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
    const [searchButtonRender, setSearchButtonRender] = useState(true);
    const [showFailureMessage, setShowFailureMessage] = useState('none');
    const [failureMessage, setFailureMessage] = useState('');
    const [currentPictureSelected, setCurrentPictureSelected] = useState(0);
    const [showProductExistAlert, setShowProductExistAlert] = useState('none');
    const [foundProductInfo, setFoundProductInfo] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const categorySelected = useRef();
    const searchBoxRef = useRef();

    const selectPicture = (e) => {
        e.preventDefault();
        $('.btnChoosePicture').click();

    }

    useEffect(() => {
        setActivityGroups(masterData.activityGroups);
        setSuperCategory(filterSuperCategory(1));
        setCategory(filterCategory(1));
        setSuccessAddImage('none');
        setSearchButtonRender(true);
    }, [])

    const filterSuperCategory = (filter) => {
        return masterData.superCategory.filter((item) => {
            return item.activityGroupId === filter;
        });
    }

    const filterCategory = (filter) => {
        return masterData.category.filter((item) => {
            return item.superCategoryId === filter;
        });
    }

    const addImageToGallery = async (postImageResult) => {
        const galleryItem = {
            itemId: await GalleryApi.getGalleryLen() + 1,
            sectionId: Number(categorySelected.current.value),
            title: '',
            typeId: -1,
            isMain: false,
            picturePath: '',
            expireDate: null,
            visible: true,
            blobName: postImageResult.data.imageName,
        }
        GalleryApi.assignItemIdAndSend(galleryItem, (res) => {
            $('.searchButton').click();
        })

    }

    const handleSelectedFile = (e) => {
        GalleryApi.checkExistenceImage(e.target.files[0].name).then(res => {
            if (!res) {
                setShowFailureMessage('none');

                GalleryApi.sendImagesToApi(e.target.files[0], (imageName) => addImageToGallery(imageName));
            } else {
                setShowFailureMessage('');
                setFailureMessage('فایلی با همین نام در گالری تصاویر وجود دارد');
                setTimeout(()=>{
                    setShowFailureMessage('none');
                },5000);
            }

        });
        //
    }

    const loadImagesFromDb = () => {

        const categoryFilter = Number(categorySelected.current.value);

        GalleryApi.loadImages(categoryFilter, (currentFile) => {
            let imageArr = [];
            let found = false;
            currentFile.map((element) => {
                found = true;
                const filtered = imageArr.filter((byValue) => {
                    return Number(byValue) === Number(element.itemId)
                });

                if (filtered.length < 1) {
                    imageArr.push(element.itemId);
                }
            });
            setImages(imageArr);


            console.log(images);

        });

    }

    const handleActivityChanged = (e) => {
        const value = Number(e.target.value);
        const filtered = filterSuperCategory(value);
        if (filtered.length < 1) {
            setCategory([]);
            setSuperCategory(filtered);
        } else {
            setSuperCategory(filtered);
            setCategory(filterCategory(1));
        }

    }

    const handleSuperCategoryChanged = (e) => {
        setSearchButtonRender(true);
        const value = Number(e.target.value);
        setCategory(filterCategory(value));
    }

    const handleSelectImage = (e) => {
        setShowProductExistAlert('none');
        setFoundProductInfo('');
        setCurrentPictureSelected(Number(e.target.attributes['data-tag'].value));
    }

    const removeImageAndReload = () => {
        GalleryApi.removeImageFromGallery(Number(currentPictureSelected)).then((result) => {
            if (result.data.error) {
                console.log(result);

                setFailureMessage('به دلیل استفاده ار این عکس امکان حذف وجود ندارد');
                setShowFailureMessage('');
                $('.close').click();
                setTimeout(()=>{
                    setShowFailureMessage('none');
                },5000);

            } else {
                $('.searchButton').click();
                $('.close').click();
            }
        })

    }

    const handleCategoryChange = (e) => {

    }

    const productSearch = () => {
        setFoundProductInfo('');
        setShowProductExistAlert('none');

        const productId = searchBoxRef.current.value;
        productApi.filterProduct(productId, (searchResult) => {
            setFoundProductInfo(searchResult[0].title);
            const productGalleryItem = {
                itemId: -1,
                galleryItemId: currentPictureSelected,
                productItemId: searchResult[0].productId,
            }
            GalleryApi.createProductGalleryItem(productGalleryItem, (result) => {
                $('.close').click();
            }, (result) => {
                if (result.data.error === 1) {
                    setAlertMessage('این تصویر قبلا به همین کالا تخصیص داده شده است');
                    setShowProductExistAlert('');
                }
            });
        }, () => {

            setAlertMessage('کالایی با کد وارد شده یافت نشد');
            setShowProductExistAlert('');
        })
    }
    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-10" style={{display: 'inline-block'}}>
                                    <h4 className="mt-0 header-title">{formType}</h4>
                                    <SuccessAlertComponent show={successAddImage}
                                                           message="تصویر موردنظر در پایگاه داده ذخیره شد"
                                    />
                                    <FailureAlertComponent isShow={showFailureMessage}
                                                           message={failureMessage}/>
                                    <div className="row">
                                        <div className="col-lg-1">
                                            <button type="button" className="btn btn-success waves-effect waves-light "
                                                    data-toggle="modal"
                                                    onClick={selectPicture}
                                                    data-target=".hatash-hakhmar-hapoo-payshiorno">تصویر جدید
                                            </button>
                                        </div>
                                        <div className="col-lg-1">
                                            <label className="mt-3" style={{float: 'left', textAlign: 'center'}}>گروه
                                                فعالیتی</label>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form-group m-t-10">
                                                <select className="form-control" onChange={handleActivityChanged}>
                                                    {
                                                        masterData.activityGroups.map((data, index) => (
                                                            <option key={data.id}
                                                                    value={data.id}>{data.title}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <label className="mt-3" style={{float: 'left', textAlign: 'center'}}> گروه
                                                تصاویر</label>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form-group m-t-10">
                                                <select className="form-control" onChange={handleSuperCategoryChanged}>
                                                    {
                                                        superCategory.map((data, index) => (
                                                            <option key={data.id}
                                                                    value={data.id}>{data.title}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                        </div>
                                        <div className="col-lg-1">
                                            <label className="mt-3" style={{float: 'left', textAlign: 'center'}}> زیر
                                                گروه </label>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="form-group m-t-10">
                                                <select ref={categorySelected} className="form-control"
                                                        onChange={handleCategoryChange}>
                                                    {
                                                        category.map((data, index) => (
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
                                                    <button type="button"
                                                            className="btn btn-success waves-effect waves-light searchButton"
                                                            data-toggle="modal"
                                                            onClick={loadImagesFromDb}> جستجوی عکس ها
                                                    </button>
                                                )
                                            }

                                        </div>
                                        <div className="col-lg-1">


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
                                <div className="col-lg-12" style={{display: images.length > 0 ? '' : 'none'}}>
                                    {

                                        images.map((url, index) => (

                                            <ImageContainer key={index}
                                                            image={url}
                                                            selectImage={handleSelectImage}
                                                            width={"500"}
                                                            height={"500"}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <ModalComponent modalId="bs-example-modal-center"
                                                    modalTitle={"معرفی کالا"}
                                                    elementStyle={{textAlign: 'center'}}
                                    >
                                        <ImageContainer image={currentPictureSelected}/>
                                        <FailureAlertComponent isShow={showProductExistAlert}
                                                               message={alertMessage}/>
                                        <div className="modal-footer">
                                            <div>
                                                <input type="text"
                                                       className="form-control"
                                                       placeholder="کد کالا را جهت جستجو وارد نماپید"
                                                       ref={searchBoxRef}
                                                />
                                                <hr/>
                                                {
                                                    foundProductInfo && (
                                                        <div>
                                                            <span>نام کالا : {foundProductInfo}</span>
                                                            <hr/>
                                                        </div>

                                                    )
                                                }

                                                <button
                                                    className="btn btn-info waves-effect ml-2"
                                                >
                                                    اختصاص به خدمات
                                                </button>
                                                <button
                                                    className="btn btn-info waves-effect ml-2"
                                                    onClick={productSearch}
                                                >
                                                    اختصاص به محصول
                                                </button>
                                                <button data-dismiss="modal"
                                                        onClick={removeImageAndReload}
                                                        className="btn btn-danger waves-effect ml-2">
                                                    حذف عکس ازآلبوم
                                                </button>
                                            </div>
                                        </div>
                                    </ModalComponent>
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