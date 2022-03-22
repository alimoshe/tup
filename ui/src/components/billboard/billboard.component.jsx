import {Component} from "react";

class BillboardComponent extends  Component{
    render() {
        return(
            <div
                className="owl-carousel owl-theme row cols-md-4 cols-sm-3 cols-1 icon-box-wrapper appear-animate br-sm mt-6 mb-10 appear-animate"
                data-owl-options="{
                    'nav': false,
                    'dots': false,
                    'loop': true,
                    'autoplay': true,
                    'autoplayTimeout': 4000,
                    'responsive': {
                        '0': {
                            'items': 1
                        },
                        '576': {
                            'items': 2
                        },
                        '768': {
                            'items': 3
                        },
                        '992': {
                            'items': 3
                        },
                        '1200': {
                            'items': 4
                        }
                    }
                }">
                <div className="icon-box icon-box-side text-dark">
                        <span className="icon-box-icon icon-shipping">
                            <i className="w-icon-truck"></i>
                        </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title">ارسال و عودت رایگان</h4>
                        <p className="text-default">برای کلیه سفارشات بالای 100 هزارتومان</p>
                    </div>
                </div>
                <div className="icon-box icon-box-side text-dark">
                        <span className="icon-box-icon icon-payment">
                            <i className="w-icon-bag"></i>
                        </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title">پرداخت ایمن </h4>
                        <p className="text-default">ما پرداخت مطمئن را تضمین می کنیم</p>
                    </div>
                </div>
                <div className="icon-box icon-box-side text-dark icon-box-money">
                        <span className="icon-box-icon icon-money">
                            <i className="w-icon-money"></i>
                        </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title">تضمین بازگشت پول</h4>
                        <p className="text-default">هر گونه بازگشت در عرض 30 روز</p>
                    </div>
                </div>
                <div className="icon-box icon-box-side text-dark icon-box-chat">
                        <span className="icon-box-icon icon-chat">
                            <i className="w-icon-chat"></i>
                        </span>
                    <div className="icon-box-content">
                        <h4 className="icon-box-title">پشتیبانی مشتری</h4>
                        <p className="text-default">تلفنی یا ایمیل به صورت شبانه روزی</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BillboardComponent;