import React, {Component} from "react";

class FailureAlertComponent extends Component{

    render() {

        return (
            <div className="alert alert-danger mb-2" style={{display:this.props.isShow}} role="alert">
                {this.props.message}
            </div>
        );
    }
}

export default FailureAlertComponent;