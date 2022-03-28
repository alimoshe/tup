import React, {Component} from "react";

class FormToolbarComponent extends Component {
    render() {
        return(
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
        )
    }
}

export default FormToolbarComponent;