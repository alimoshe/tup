import React, {Component} from "react";
import ModalComponent from "../modal/modal";

class MessageBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

            return (
                <div>
                    <ModalComponent modalId="bs-message-modal"
                                    modalTitle={this.props.messageTitle}>
                        <h3>{this.props.message}</h3>
                        <div className="modal-footer">
                            <div>
                                <button type="submit" onClick={this.props.onOk}
                                        className="btn btn-success waves-effect waves-light">
                                    تایید
                                </button>
                                <button data-dismiss="modal"
                                        onClick={this.props.onCancel}
                                        className="btn btn-danger waves-effect ml-2">
                                    لغو
                                </button>
                            </div>
                        </div>
                    </ModalComponent>
                </div>
            );
    }
}

export default MessageBoxComponent;