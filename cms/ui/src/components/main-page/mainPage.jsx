import React, {Component} from "react";
import TopBarComponent from "../top-bar/topBar.component";
import LeftSideMenuComponent from "../left-side-menu/leftSideMenu.component";
import FormComponent from "../form/form.component";

class MainPageComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <LeftSideMenuComponent />
                <div className="content-page">
                    <div className="content">
                        <TopBarComponent/>
                        <div className="page-content-wrapper ">
                            <div className="container-fluid">
                                <FormComponent
                                    formHeader="معرفی گالا"
                                    formType="معرفی کالا"
                                    formDescription= "لطفا با رعایت کامل کالای مدنظر را معرفی نماپید"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default MainPageComponent;