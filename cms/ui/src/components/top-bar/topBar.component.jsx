import React, {Component} from "react";

class TopBarComponent extends Component {
    render() {
        return(
            <div className="topbar">

                <div className="topbar-left	d-none d-lg-block">
                    <div className="text-center">
                        <a href="index.html" style={{ fontSize:'20px' }} className="logo">
                            سامانه مدیریت تاپ کلیک
                        </a>
                    </div>
                </div>

                <nav className="navbar-custom">


                    <div className="search-wrap" id="search-wrap">
                        <div className="search-bar">
                            <input className="search-input" type="search" placeholder="جستجو"/>
                            <a href="#" className="close-search toggle-search" data-target="#search-wrap">
                                <i className="mdi mdi-close-circle"></i>
                            </a>
                        </div>
                    </div>

                    <ul className="list-inline float-right mb-0">
                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link waves-effect toggle-search" href="#" data-target="#search-wrap">
                                <i className="mdi mdi-magnify noti-icon"></i>
                            </a>
                        </li>

                        <li className="list-inline-item dropdown notification-list">
                            <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown"
                               href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                <i className="mdi mdi-bell-outline noti-icon"></i>
                                <span className="badge badge-danger badge-pill noti-icon-badge">3</span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg dropdown-menu-animated">

                                <div className="dropdown-item noti-title">
                                    <h5>اعلانات (3)</h5>
                                </div>

                                <div className="slimscroll-noti">

                                    <a href="javascript:void(0);" className="dropdown-item notify-item active">
                                        <div className="notify-icon bg-success"><i className="mdi mdi-cart-outline"></i>
                                        </div>
                                        <p className="notify-details"><b>سفارش شما قرار داده شده است</b><span
                                            className="text-muted">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</span>
                                        </p>
                                    </a>


                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-danger"><i
                                            className="mdi mdi-message-text-outline"></i></div>
                                        <p className="notify-details"><b>پیام جدید دریافت شد</b><span
                                            className="text-muted">شما 87 پیام خوانده نشده دارید</span></p>
                                    </a>


                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-info"><i className="mdi mdi-filter-outline"></i>
                                        </div>
                                        <p className="notify-details"><b>مورد شما حمل می شود</b><span
                                            className="text-muted">این یک واقعیت طولانی است که خواننده خواهد بود</span>
                                        </p>
                                    </a>


                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-success"><i
                                            className="mdi mdi-message-text-outline"></i></div>
                                        <p className="notify-details"><b>پیام جدید دریافت شد</b><span
                                            className="text-muted">شما 87 پیام خوانده نشده دارید</span></p>
                                    </a>


                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="notify-icon bg-warning"><i className="mdi mdi-cart-outline"></i>
                                        </div>
                                        <p className="notify-details"><b>سفارش شما قرار داده شده است</b><span
                                            className="text-muted">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</span>
                                        </p>
                                    </a>

                                </div>



                                <a href="javascript:void(0);" className="dropdown-item notify-all">
                                    مشاهده همه
                                </a>

                            </div>
                        </li>


                        <li className="list-inline-item dropdown notification-list nav-user">
                            <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown"
                               href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                <img src="assets/images/users/avatar-6.jpg" alt="user" className="rounded-circle" />
                                    <span className="d-none d-md-inline-block ml-1">آقای جعفر عباسی
                                        <i className="mdi mdi-chevron-down"/>

                                    </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown">
                                <a className="dropdown-item" href="#"><i
                                    className="dripicons-user text-muted"></i> پروفایل</a>
                                <a className="dropdown-item" href="#"><i
                                    className="dripicons-wallet text-muted"></i> کیف پول من</a>
                                <a className="dropdown-item" href="#"><span
                                    className="badge badge-success float-right m-t-5">5</span><i
                                    className="dripicons-gear text-muted"></i> تنظیمات</a>
                                <a className="dropdown-item" href="#"><i className="dripicons-lock text-muted"></i> قفل
                                    صفحه</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className="dripicons-exit text-muted"></i> خروج</a>
                            </div>
                        </li>

                    </ul>

                    <ul className="list-inline menu-left mb-0">
                        <li className="list-inline-item">
                            <button type="button" className="button-menu-mobile open-left waves-effect">
                                <i className="mdi mdi-menu"></i>
                            </button>
                        </li>
                        <li className="list-inline-item dropdown notification-list d-none d-sm-inline-block">
                            <a className="nav-link dropdown-toggle arrow-none waves-effect" data-toggle="dropdown"
                               href="#" role="button"
                               aria-haspopup="false" aria-expanded="false">
                                ایجاد جدید ترین <i className="mdi mdi-plus"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-animated">
                                <a className="dropdown-item" href="#">عملیات</a>
                                <a className="dropdown-item" href="#">اقدام دیگری</a>
                                <a className="dropdown-item" href="#">چیز های دیگر</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">پیوند جدا شده</a>
                            </div>
                        </li>
                        <li className="list-inline-item notification-list d-none d-sm-inline-block">
                            <a href="#" className="nav-link waves-effect">
                                فعالیت
                            </a>
                        </li>

                    </ul>

                </nav>

            </div>
        );
    }
}

export default TopBarComponent;