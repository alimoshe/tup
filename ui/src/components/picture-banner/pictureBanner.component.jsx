import {Component} from "react";

class  PictureBannerComponent extends Component{
    render() {
        return(
            <div className="banner br-sm banner-electronics appear-animate"
                 style={{
                     backgroundImage: 'url(assets/images/demos/demo2/banners/3.jpg)',
                     backgroundColor: '#333'
                 }}>
                <div className="banner-content mr-10 pr-1">
                    <div className="banner-price-info text-white font-weight-normal ls-25">
                        Save Big on <span className="font-weight-bolder text-secondary text-uppercase">50% تخفیف </span>
                    </div>
                    <h3 className="banner-title text-white mb-0 ls-25">فروش دوربین و چرم</h3>
                </div>
                <a href="shop-banner-sidebar.html" className="btn btn-white btn-rounded btn-icon-right mt-1">اکنون
                    میخرم <i className="w-icon-long-arrow-left"/></a>
            </div>
        )
    }
}

export default PictureBannerComponent;