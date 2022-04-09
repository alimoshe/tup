import React, { Component } from "react";
import MainPageProduct from "../main-page-product/mainPagetProd";

const ActivityItem = () => {
    return (
        <React.Fragment>

        </React.Fragment>
    )
}

class TopActivity extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="title-link-wrapper mb-3 appear-animate">
                    <h2 className="title title-deals mb-1">معاملات روز</h2>
                    <div className="product-countdown-container font-size-sm text-dark align-items-center">

                        <div className="product-countdown countdown-compact ml-1 font-weight-bold" data-until="+10d"
                            data-relative="true" data-compact="true">&nbsp;</div>
                    </div>
                    <a href="shop-boxed-banner.html" className="font-weight-bold ls-25">محصولات بیشتر <i
                        className="w-icon-long-arrow-left"/>&nbsp;</a>
                </div >
                <div className="owl-carousel owl-theme row cols-lg-5 cols-md-4 cols-2 product-deals-wrapper appear-animate mb-7"
                    data-owl-options="{
                    'nav': false,
                    'dots': true,
                    'items': 5,
                    'autoplay': false,
                    'margin': 20,
                    'responsive': {
                        '0': {
                            'items': 2,
                            'nav': false
                        },
                        '576': {
                            'items': 3
                        },
                        '768': {
                            'items': 4
                        },
                        '992': {
                            'items': 5
                        }
                    }
                }">

                    <MainPageProduct />
                    <div className="product-wrap">
                        <div className="product text-center">
                            <figure className="product-media">
                                <a href="product-default.html">
                                    <img src="assets/images/demos/demo2/products/1-2.jpg" alt="Product" width="300"
                                        height="338" />
                                </a>
                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart" title="افزودن به سبد خرید">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                        title="افزودن به علاقه مندیها">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                        title="نمایش سریع">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                        title="افزودن برای مقایسه">&nbsp;</a>
                                </div>
                                <div className="product-label-group">
                                    <label className="product-label label-new">جدید </label>
                                    <label className="product-label label-discount">-35%</label>
                                </div>
                            </figure>
                            <div className="product-details">
                                <h4 className="product-name"><a href="product-default.html">سفید والیز</a></h4>
                                <div className="ratings-container">
                                    <div className="ratings-full">
                                        <span className="ratings" style={{ width: '100%' }}>&nbsp;</span>
                                        <span className="tooltiptext tooltip-top">&nbsp;</span>
                                    </div>
                                    <a href="product-default.html" className="rating-reviews">(3 نظر )</a>
                                </div>
                                <div className="product-price">
                                    <ins className="new-price">40000 تومان</ins><span className="old-price">49000 تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-wrap">
                        <div className="product text-center">
                            <figure className="product-media">
                                <a href="product-default.html">
                                    <img src="assets/images/demos/demo2/products/1-3-1.jpg" alt="Product" width="300"
                                        height="338" />
                                    <img src="assets/images/demos/demo2/products/1-3-2.jpg" alt="Product" width="300"
                                        height="338" />
                                </a>
                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart" title="افزودن به سبد خرید">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                        title="افزودن به علاقه مندیها">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                        title="نمایش سریع">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                        title="افزودن برای مقایسه">&nbsp;</a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <h4 className="product-name"><a href="product-default.html">کفش چرم قهوه ای</a></h4>
                                <div className="ratings-container">
                                    <div className="ratings-full">
                                        <span className="ratings" style={{ width: '80%' }}>&nbsp;</span>
                                        <span className="tooltiptext tooltip-top">&nbsp;</span>
                                    </div>
                                    <a href="product-default.html" className="rating-reviews">(6 نظر )</a>
                                </div>
                                <div className="product-price">
                                    <ins className="new-price">41000 تومان - 69000 تومان</ins>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-wrap">
                        <div className="product text-center">
                            <figure className="product-media">
                                <a href="product-default.html">
                                    <img src="assets/images/demos/demo2/products/1-4.jpg" alt="Product" width="300"
                                        height="338" />
                                </a>
                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart" title="افزودن به سبد خرید">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                        title="افزودن به علاقه مندیها">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                        title="نمایش سریع">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                        title="افزودن برای مقایسه">&nbsp;</a>
                                </div>
                                <div className="product-label-group">
                                    <label className="product-label label-new">جدید </label>
                                </div>
                            </figure>
                            <div className="product-details">
                                <h4 className="product-name"><a href="product-default.html">چراغ قوه قابل حمل</a></h4>
                                <div className="ratings-container">
                                    <div className="ratings-full">
                                        <span className="ratings" style={{ width: '100%' }}>&nbsp;</span>
                                        <span className="tooltiptext tooltip-top">&nbsp;</span>
                                    </div>
                                    <a href="product-default.html" className="rating-reviews">(8 نظر )</a>
                                </div>
                                <div className="product-price">
                                    <ins className="new-price">10000 تومان</ins><del className="old-price">13000 تومان</del>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-wrap">
                        <div className="product text-center">
                            <figure className="product-media">
                                <a href="product-default.html">
                                    <img src="assets/images/demos/demo2/products/1-5.jpg" alt="Product" width="300"
                                        height="338" />
                                </a>
                                <div className="product-action-vertical">
                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart" title="افزودن به سبد خرید">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                        title="افزودن به علاقه مندیها">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                        title="نمایش سریع">&nbsp;</a>
                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                        title="افزودن برای مقایسه">&nbsp;</a>
                                </div>
                            </figure>
                            <div className="product-details">
                                <h4 className="product-name"><a href="product-default.html">شارژر usb</a></h4>
                                <div className="ratings-container">
                                    <div className="ratings-full">
                                        <span className="ratings" style={{ width: '100%' }}>&nbsp;</span>
                                        <span className="tooltiptext tooltip-top">&nbsp;</span>
                                    </div>
                                    <a href="product-default.html" className="rating-reviews">(3 نظر )</a>
                                </div>
                                <div className="product-price">
                                    <ins className="new-price">17000 تومان</ins><del className="old-price">29000 تومان</del>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TopActivity;