import {Component} from "react";
class headerMiddleComponent extends Component {
    render() {
        return(
            <div className="header-middle">
                <div className="container">
                    <div className="header-left mr-md-4">
                        <a href="#" className="mobile-menu-toggle  w-icon-hamburger">
                        </a>
                        <a href="demo2.html" className="logo ml-lg-0">
                            <img src="assets/images/demos/demo2/header-logo.png" alt="logo" width="144" height="45"/>
                        </a>
                        <form method="get" action="#"
                              className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper mr-4 ml-4">
                            <div className="select-box">
                                <select id="category" name="category">
                                    <option value="">تمام دسته بندیها</option>
                                    <option value="4">مدلینگ</option>
                                    <option value="5">مبلمان</option>
                                    <option value="6">کفشها</option>
                                    <option value="7">اسپورتی</option>
                                    <option value="8">گیم/بازی</option>
                                    <option value="9">کامپیوترها</option>
                                    <option value="10">الکترونیکی</option>
                                    <option value="11">آشپرخانه</option>
                                    <option value="12">لباس</option>
                                </select>
                            </div>
                            <input type="text" className="form-control" name="search" id="search"
                                   placeholder="جستجو ..." required/>
                            <button className="btn btn-search" type="submit"><i className="w-icon-search" />
                            </button>
                        </form>
                    </div>
                    <div className="header-right ml-4">
                        <a className="wishlist label-down link d-xs-show" href="wishlist.html">
                            <i className="w-icon-heart"></i>
                            <span className="wishlist-label d-lg-show">لیست علاقه مندیها </span>
                        </a>
                        <a className="compare label-down link d-xs-show" href="compare.html">
                            <i className="w-icon-compare"></i>
                            <span className="compare-label d-lg-show">مقایسه کردن </span>
                        </a>
                        <div className="dropdown cart-dropdown mr-0 mr-lg-2">
                            <div className="cart-overlay"></div>
                            <a href="#" className="cart-toggle label-down link">
                                <i className="w-icon-cart">

                                </i>
                                <span className="cart-label">سبد خرید </span>
                            </a>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default headerMiddleComponent;