import React, {Component} from "react";

class SuccessAlertComponent extends Component {
    render() {
        return (
            <div className="alert alert-success" style={{display:this.props.show}} role="alert">
                {this.props.message}
            </div>
        );
    }
}

export default SuccessAlertComponent;