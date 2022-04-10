import React, {Component} from "react";

class LeftSideMenuComponent extends Component{
    render() {
        return(
            <div className="left side-menu">
                <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
                    <i className="mdi mdi-close" />
                </button>

                <div className="left-side-logo d-block d-lg-none">
                    <div className="text-center">

                        <a href="/" className="logo"><img src="assets/images/logo_dark.png" height="20"
                                                                   alt="logo" /></a>
                    </div>
                </div>

                <div className="sidebar-inner slimscrollleft">

                    <div id="sidebar-menu">
                        <ul>
                            <li className="menu-title">اصلی</li>

                            <li>
                                <a href="/" className="waves-effect">
                                    <i className="dripicons-home" />
                                    <span> کالاها </span>
                                </a>
                            </li>

                            <li>
                                <a href="/vendors" className="waves-effect">
                                    <i className="dripicons-home" />
                                    <span> تامین کنندگان <span className="badge badge-success badge-pill float-right">3</span></span>
                                </a>
                            </li>
                            <li>
                                <a href="/product-profile" className="waves-effect">
                                    <i className="dripicons-home" />
                                    <span> کاردکس کالا </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix">

                    </div>
                </div>

            </div>
        )
    }
}

export default LeftSideMenuComponent;