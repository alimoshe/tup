import React, {useRef, useState} from "react";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import productApi from '../../api/product';


// Define States

const PicturesCard =  ({products, filter, addImage}) => {
    const [prodImage, setProdImage] = useState([]);


    if (Number(filter) > 0) {
        const filtered = products.filter((item) => {
            return Number(item.productId) === Number(filter);
        });


        if (filtered.length === 1) {
            const fetchImg = async () => {
                let images = [];
                filtered[0].pictures.map(async (data, index)=> {
                    const res = await productApi.loadImageFile(filter, index);
                    const imgBLOB = await res.blob();
                    const imageObjectUrl = URL.createObjectURL(imgBLOB);
                    images.push(imageObjectUrl);
                    addImage(imageObjectUrl);


                })
                return images;
            }

            // var imagesTag = [];
            // fetchImg().then(sample => {
            //
            //     sample.map((data,index) => {
            //         console.log(data);
            //         imagesTag.push(`<img class="img-thumbnail"
            //          alt="200x200"
            //          style=${{width: '200px', height: '200px'}}
            //          src=${data} data-holder-rendered="true" />`);
            //
            //     })
            //     console.log(imagesTag);
            // });

            return(

            <React.Fragment>
                <PicPane Pics={fetchImg().then(data => $scope.names = data)}/>
            </React.Fragment>
            )
            /*
            filtered[0].pictures.map((img) => {
                productApi.loadImagesPath(img).then((record) => {
                    path.push(record.data.path);
                })
            });*/
        }
    }
return <></>
}

const PicPane = ({Pics}) => {
    const persons = Pics.map((person) => {
        return person;
    })
    console.log(persons);
return(
    <div>
        {
            Pics.map(img => (
                <img className="img-thumbnail"
                     alt="200x200"
                     style={{width: '200px', height: '200px'}}
                     src={img} data-holder-rendered="true" />
            ))
        }
    </div>
)
}



const ProductProfile = ({formHeader, formType}) => {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(0);

    const load = (e) => {
        e.preventDefault();
        productApi.loadProduct()
            .then(data => {
                setProducts(data);
            });
    }

    const setFilterProduct = (e) => {
        setFilter(Number(e.target.value));
    }

    const addProdImage = (imageName) =>{

    }

    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
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
                                       onChange={setFilterProduct}
                                       placeholder="کد کالا"/>
                            </div>
                        </div>
                        <div className="col-lg-2 mt-3">
                            <button type="button" className="btn btn-success waves-effect waves-light"
                                    data-toggle="modal"
                                    onClick={load}
                                    data-target=".bs-example-modal-center">تامین کننده جدید
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
                                    <PicturesCard products={products || []}
                                                  filter={filter}
                                                  addImage={addProdImage}
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