import React, {Component} from "react";
const API_URL = "http://localhost:3080/category/";
class FormComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categories : []
        }
    }


    componentDidMount() {
        fetch(API_URL)
            .then((data) => data.json())
            .then(data => {this.setState({categories : data})});
    }

    render() {
        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title m-0">{this.props.formHeader}</h4>
                                </div>
                                <div className="col-md-4">
                                    <div className="float-right d-none d-md-block">
                                        <div className="dropdown">
                                            <button className="btn btn-primary dropdown-toggle" type="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="ti-settings mr-1"/> تنظیمات
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated">
                                                <a className="dropdown-item" href="#">عملیات</a>
                                                <a className="dropdown-item" href="#">اقدام دیگر</a>
                                                <a className="dropdown-item" href="#">چیز های دیگر</a>
                                                <div className="dropdown-divider"> </div>
                                                <a className="dropdown-item" href="#">پیوند جدا شده</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Component in two column */}

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card m-b-30">
                            <div className="card-body">

                                <h4 className="mt-0 header-title">{this.props.formType}</h4>
                                <p className="text-muted m-b-30">{this.props.formDescription}</p>

                                <form className="" action="/product" method="post">
                                    <div className="form-group">
                                        <label>عنوان کالا</label>
                                        <input type="text"
                                               className="form-control"
                                               required
                                               name="txtProdName"
                                               id="txtProdName"
                                               placeholder="چیزی را تایپ کنید"/>
                                    </div>

                                    <div className="form-group">
                                        <label>گروه کالا</label>
                                        <div className="form-group m-t-10">
                                            <select className="form-control">
                                                <option>انتخاب</option>
                                                <option>انتخاب بزرگ</option>
                                                <option>انتخاب کوچک</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ایمیل</label>
                                        <div>
                                            <input type="email" className="form-control" required
                                                   parsley-type="email" placeholder="وارد کردن ایمیل"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>آدرس</label>
                                        <div>
                                            <input parsley-type="url" type="url" className="form-control"
                                                   required placeholder="آدرس"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>رقم</label>
                                        <div>
                                            <input data-parsley-type="digits" type="text"
                                                   className="form-control" required
                                                   placeholder="فقط رقم ها را وارد کنید"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>شماره</label>
                                        <div>
                                            <input data-parsley-type="number" type="text"
                                                   className="form-control" required
                                                   placeholder="فقط شماره را وارد کنید"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>الفبایی عددی</label>
                                        <div>
                                            <input data-parsley-type="alphanum" type="text"
                                                   className="form-control" required
                                                   placeholder="مقدار الفبایی را وارد کنید"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>منطقه متن</label>
                                        <div>
                                            <textarea required className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                            <button type="submit" className="btn btn-primary waves-effect waves-light">
                                                ارسال
                                            </button>
                                            <button type="reset" className="btn btn-secondary waves-effect m-l-5">
                                                لغو
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>


                    <div className="col-lg-6">
                        <div className="card m-b-30">
                            <div className="card-body">

                                <h4 className="mt-0 header-title">اعتبار محدوده</h4>
                                <p className="text-muted m-b-30">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                                    چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                    سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                                    بهبود ابزارهای کاربردی می باشد.</p>

                                <form action="#">

                                    <div className="form-group">
                                        <label>حداقل 6 عدد</label>
                                        <div>
                                            <input type="text" className="form-control" required
                                                   data-parsley-minlength="6" placeholder="حداقل 6 عدد."/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>حداکثر 6 عدد</label>
                                        <div>
                                            <input type="text" className="form-control" required
                                                   data-parsley-maxlength="6" placeholder="حداکثر 6 عدد."/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>طول محدوده</label>
                                        <div>
                                            <input type="text" className="form-control" required
                                                   data-parsley-length="[5,10]"
                                                   placeholder="متن بین 5 تا 10 حرف طول"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>مقدار حداقل</label>
                                        <div>
                                            <input type="text" className="form-control" required
                                                   data-parsley-min="6" placeholder="مقدار حداقل 6 است"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>حداکثر ارزش</label>
                                        <div>
                                            <input type="text" className="form-control" required
                                                   data-parsley-max="6" placeholder="حداکثر مقدار 6 است"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>محدوده ارزش</label>
                                        <div>
                                            <input className="form-control" required type="text range" min="6"
                                                   max="100" placeholder="شماره بین 6 تا 100"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>به طور منظم</label>
                                        <div>
                                            <input type="text" className="form-control" required
                                                   data-parsley-pattern="#[A-Fa-f0-9]{6}"
                                                   placeholder="هگزا رنگ"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>چک کردن حداقل</label>
                                        <div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck1" data-parsley-multiple="groups"
                                                       data-parsley-mincheck="2" />
                                                    <label className="custom-control-label" htmlFor="customCheck1">و
                                                        این</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck2" data-parsley-multiple="groups"
                                                       data-parsley-mincheck="2" />
                                                    <label className="custom-control-label" htmlFor="customCheck2">نمی
                                                        توانم این را بررسی کنم</label>
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck3" data-parsley-multiple="groups"
                                                       data-parsley-mincheck="2" />
                                                    <label className="custom-control-label" htmlFor="customCheck3">این
                                                        هم همینطور</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group m-b-0">
                                        <div>
                                            <button type="submit" className="btn btn-primary waves-effect waves-light">
                                                ارسال
                                            </button>
                                            <button type="reset" className="btn btn-secondary waves-effect m-l-5">
                                                لغو
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default FormComponent