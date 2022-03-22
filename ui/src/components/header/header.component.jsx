import React from "react";
import HeaderTop from "./header-top/headertop.component";
import HeaderMiddleComponent from "./header-middle/headerMiddle.component";


class HeaderComponent extends React.Component {
     render() {
        return(
            <div className="header">
                <HeaderTop />
                <HeaderMiddleComponent />
            </div>
        )
    }
}

export default HeaderComponent;