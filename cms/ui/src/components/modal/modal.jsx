import React, {Component} from "react";
class ModalComponent extends Component{
    constructor(props) {
        super(props);

    }
    getModalClassName = () => {
        return `modal fade ${this.props.modalId}`;
    }
    render() {
        return (

                <div className="col-sm-6 col-md-3 m-t-30">

                        <div className={this.getModalClassName()} tabIndex="-1" role="dialog"
                             aria-labelledby="mySmallModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title mt-0">{this.props.modalTitle}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>

                                     </div>
                                    <div className="modal-body">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>


                </div>

        );
    }
}

export default ModalComponent;