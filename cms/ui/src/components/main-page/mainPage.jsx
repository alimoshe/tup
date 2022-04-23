import React, {Component} from "react";
import TopBarComponent from "../top-bar/topBar.component";
import LeftSideMenuComponent from "../left-side-menu/leftSideMenu.component";
import FormComponent from "../form/form.component";
import { Route, Switch } from "react-router-dom";
import VendorComponent from "../../pages/vendor-page/vendorComponent";
import ProductProfile from "../../pages/cardex/productCardex";
import GalleryPage from "../../pages/gallery/gallery.page";
import ServicesPage from "../../pages/services/services-page";

class MainPageComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <LeftSideMenuComponent/>
                <div className="content-page">
                    <div className="content">
                        <TopBarComponent/>
                        <div className="page-content-wrapper ">
                            <div className="container-fluid">
                                <Switch>
                                    <Route exact path="/">
                                        <FormComponent
                                            formHeader="معرفی گالا"
                                            formType="معرفی کالا"
                                            formDescription="لطفا با رعایت کامل کالای مدنظر را معرفی نماپید"/>
                                    </Route>
                                    <Route exact path="/vendors/">
                                        <VendorComponent formHeader="معرفی تامین کنندگان"/>
                                    </Route>
                                    <Route path="/product-profile">
                                        <ProductProfile formHeader=" کاردکس"
                                                        formType="کاردکس کلی کالا"
                                        />
                                    </Route>
                                    <Route path="/gallery">
                                        <GalleryPage  formHeader="گالری تصاویر"
                                                      formType="گالری تصاویر کالاها و خدمات" />
                                    </Route>
                                    <Route path="/services">
                                        <ServicesPage  formHeader="معرفی خدمات"
                                                       formType="معرفی انواع خدمات" />
                                    </Route>
                                </Switch>


                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default MainPageComponent;