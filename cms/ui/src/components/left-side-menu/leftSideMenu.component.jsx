import React, {Component} from "react";

class LeftSideMenuComponent extends Component{
    render() {
        return(
            <div className="left side-menu">
                <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
                    <i className="mdi mdi-close"></i>
                </button>

                <div className="left-side-logo d-block d-lg-none">
                    <div className="text-center">

                        <a href="index.html" className="logo"><img src="assets/images/logo_dark.png" height="20"
                                                                   alt="logo" /></a>
                    </div>
                </div>

                <div className="sidebar-inner slimscrollleft">

                    <div id="sidebar-menu">
                        <ul>
                            <li className="menu-title">اصلی</li>

                            <li>
                                <a href="index.html" className="waves-effect">
                                    <i className="dripicons-home"></i>
                                    <span> داشبورد <span className="badge badge-success badge-pill float-right">3</span></span>
                                </a>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-briefcase"></i> <span> المنت ها </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="ui-alerts.html">هشدار ها</a></li>
                                    <li><a href="ui-badge.html">نشان ها</a></li>
                                    <li><a href="ui-buttons.html">دکمه ها</a></li>
                                    <li><a href="ui-cards.html">کارت ها</a></li>
                                    <li><a href="ui-dropdowns.html">رها کردن</a></li>
                                    <li><a href="ui-navs.html">منو ها</a></li>
                                    <li><a href="ui-tabs-accordions.html">زبانه ها و آکاردئون ها</a></li>
                                    <li><a href="ui-modals.html">مدال ها</a></li>
                                    <li><a href="ui-images.html">تصاویر</a></li>
                                    <li><a href="ui-progressbars.html">میله پیشرفت</a></li>
                                    <li><a href="ui-pagination.html">صفحه بندی</a></li>
                                    <li><a href="ui-popover-tooltips.html">راهنمایی ها و ابزار ها</a></li>
                                    <li><a href="ui-spinner.html">اسپینر</a></li>
                                    <li><a href="ui-carousel.html">چرخ فلک</a></li>
                                    <li><a href="ui-video.html">ویدیو</a></li>
                                    <li><a href="ui-typography.html">تایپوگرافی</a></li>
                                    <li><a href="ui-grid.html">گرید</a></li>
                                </ul>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-archive"></i> <span> UI پیشرفته </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="advanced-alertify.html">هشدار</a></li>
                                    <li><a href="advanced-rating.html">رتبه بندی</a></li>
                                    <li><a href="advanced-nestable.html">غیر قابل انعطاف</a></li>
                                    <li><a href="advanced-rangeslider.html">محدوده کشویی</a></li>
                                    <li><a href="advanced-sweet-alert.html">شیرین هشدار</a></li>
                                    <li><a href="advanced-lightbox.html">جعبه نور</a></li>
                                </ul>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-rocket"></i> <span> آیکن ها </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="icons-material.html">طراحی متریال</a></li>
                                    <li><a href="icons-ion.html">یونیکون ها</a></li>
                                    <li><a href="icons-fontawesome.html">فونت عالی</a></li>
                                    <li><a href="icons-themify.html">Themify آیکن ها</a></li>
                                    <li><a href="icons-dripicons.html">قطره چکان</a></li>
                                    <li><a href="icons-typicons.html">آیکون تایپیکون</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="calendar.html" className="waves-effect"><i
                                    className="dripicons-calendar"></i><span> تقویم </span></a>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-document"></i><span> فرم ها </span> <span
                                    className="badge badge-warning badge-pill float-right">8</span></a>
                                <ul className="list-unstyled">
                                    <li><a href="form-elements.html">عناصر فرم</a></li>
                                    <li><a href="form-validation.html">اعتبار سنجی فرم</a></li>
                                    <li><a href="form-advanced.html">فرم پیشرفته</a></li>
                                    <li><a href="form-editors.html">ویرایشگران فرم</a></li>
                                    <li><a href="form-uploads.html">آپلود فایل فرم</a></li>
                                    <li><a href="form-mask.html">ماسک فرم</a></li>
                                    <li><a href="form-summernote.html">یادداشت</a></li>
                                    <li><a href="form-xeditable.html">فرم X قابل ویرایش</a></li>
                                </ul>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-graph-bar"></i><span> نمودار </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="charts-morris.html">نمودار موریس</a></li>
                                    <li><a href="charts-chartist.html">نمودار چارتیست</a></li>
                                    <li><a href="charts-chartjs.html">نمودار چارت</a></li>
                                    <li><a href="charts-flot.html">نمونه فلوت</a></li>
                                    <li><a href="charts-c3.html">نمودار C3</a></li>
                                    <li><a href="charts-other.html">نمودار تهیه جی کوئری</a></li>
                                </ul>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-view-thumb"></i><span> جداول ها </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="tables-basic.html">جداول پایه</a></li>
                                    <li><a href="tables-datatable.html">جدول داده ها</a></li>
                                    <li><a href="tables-responsive.html">جدول پاسخگو</a></li>
                                    <li><a href="tables-editable.html">میز قابل ویرایش</a></li>
                                </ul>
                            </li>

                            <li className="menu-title">خارجی</li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-location"></i><span> نقشه ها </span> <span
                                    className="badge badge-danger badge-pill float-right">2</span></a>
                                <ul className="list-unstyled">
                                    <li><a href="maps-google.html"> گوگل مپ</a></li>
                                    <li><a href="maps-vector.html"> نقشه برداری</a></li>
                                </ul>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-copy"></i><span> صفحات </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="pages-blank.html">صفحه خالی</a></li>
                                    <li><a href="pages-login.html">ورود</a></li>
                                    <li><a href="pages-register.html">ثبت نام</a></li>
                                    <li><a href="pages-recoverpw.html">باز یابی رمز عبور</a></li>
                                    <li><a href="pages-lock-screen.html">قفل صفحه</a></li>
                                    <li><a href="pages-404.html">خطای 404</a></li>
                                    <li><a href="pages-500.html">خطای 500</a></li>
                                </ul>
                            </li>

                            <li className="has_sub">
                                <a href="#" className="waves-effect"><i
                                    className="dripicons-medical"></i><span> صفحات اضافی </span> <span
                                    className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                <ul className="list-unstyled">
                                    <li><a href="extras-pricing.html">قیمت ها</a></li>
                                    <li><a href="extras-invoice.html">صورتحساب</a></li>
                                    <li><a href="extras-timeline.html">خط زمان</a></li>
                                    <li><a href="extras-faqs.html">سوالات متداول</a></li>
                                    <li><a href="extras-maintenance.html">نگهداری</a></li>
                                    <li><a href="extras-comingsoon.html">به زودی</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                    <div className="clearfix"></div>
                </div>

            </div>
        )
    }
}

export default LeftSideMenuComponent;