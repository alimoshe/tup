import React, {Component} from "react";

class MainPageProduct extends  Component{
    render() {
        return(
            <div className="product-wrap">
                <div className="product text-center">
                    <figure className="product-media">
                        <a href="product-default.html">
                            <img src="assets/images/demos/demo2/products/1-1-1.jpg" alt="Product" width="300"
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
                        <h4 className="product-name"><a href="product-default.html">تسکین دهنده زنان</a></h4>
                        <div className="ratings-container">
                            <div className="ratings-full">
                                <span className="ratings" style={{ width: '100%' }}>&nbsp;</span>
                                <span className="tooltiptext tooltip-top">&nbsp;</span>
                            </div>
                            <a href="product-default.html" className="rating-reviews">(3 نظر )</a>
                        </div>
                        <div className="product-price">
                            <ins className="new-price">45000 تومان - 69000 تومان</ins>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  MainPageProduct;