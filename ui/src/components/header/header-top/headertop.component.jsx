import {Component} from "react";

class HeaderTop extends Component {
    render() {
        return(
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <p className="welcome-msg">به سایت فروشگاه تاپ کلیک خوش آمدید دکمه را بزنید تا حذف شوم:)!</p>
                    </div>
                    <div className="header-right pr-0">
                        <a href="blog.html" className="d-lg-show">وبلاگ </a>
                        <a href="contact-us.html" className="d-lg-show">تماس با ما </a>
                        <a href="my-account.html" className="d-lg-show">حساب کاربری من </a>
                        <a href="assets/ajax/login.html" className="d-lg-show login sign-in"><i
                            className="w-icon-account"></i>ورود </a>
                        <span className="delimiter d-lg-show">/</span>
                        <a href="assets/ajax/login.html" className="ml-0 d-lg-show login register">ثبت نام </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderTop;