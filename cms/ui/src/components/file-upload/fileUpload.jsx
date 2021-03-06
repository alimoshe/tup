import React, {Component} from 'react';
import axios from "axios";

const API_BASE_URL = "http://localhost:3080";

class FileUploadComponent extends Component {
    product = {};
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            images:[],
            physicalFiles: [],
            imageNames:[]

        }
    }



    handleUploadChange = (e) => {
        const clonedFiles = [...this.state.selectedFiles];
        const clonedPhysicalFiles = [...this.state.physicalFiles];
        if (!clonedFiles.includes(e.target.value, 0)) {

            clonedFiles.push(e.target.value);
            clonedPhysicalFiles.push(e.target.files[0]);

            this.handleAddImage(e.target.value);

            this.setState({selectedFiles : clonedFiles});
            this.setState({physicalFiles : clonedPhysicalFiles});


        }

    }
    getDisplayStyle = () => {
        return this.state.selectedFiles.length > 0 && this.props.toBeRender ? '' : 'none';
    }
    getRenderStatus = () => {
        return this.props.toBeRender === true ? '' : 'none';
    }

    removeFile = (e) => {
        e.preventDefault();
        this.setState({selectedFiles : this.state.selectedFiles.filter((data) => {
            return data !== e.target.title;
            })})
    }
    postImageToApi = () => {

        this.props.onPostToApi(this.state.physicalFiles);
        this.setState({selectedFiles : []})

    }

    handleAddImage = (image) => {
        const clonedImages = [...this.state.images];
        clonedImages.push(image);
        this.setState({images: clonedImages});

    }
    render() {

        return (
            < React.Fragment >
                <input className="input-group"
                       accept=".gif,.jpg,.jpeg,.png"
                       type="file"
                       onInput={this.handleUploadChange} style={{display:this.getRenderStatus()}}/>
                <table className="table table-dark mb-0 mt-3"
                       style={{display: this.getDisplayStyle()}}>
                    <thead>
                    <tr>
                        <th>???????? ????????</th>
                        <th>????????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.selectedFiles.map((data, index) => (
                            <tr key={index}>
                                <td>{data}</td>
                                <td><a href=""
                                       onClick={this.removeFile}
                                       title={String(data)}>
                                    <i className="ion ion-md-close-circle"/>&nbsp;??????</a></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    this.state.physicalFiles.map((file, index) => (

                         <img key={index} className="mt-5" src={URL.createObjectURL(file)} alt="picture" style={{
                             border:'1px',
                             width:'128px',
                             height:'128px'
                         }}/>
                    ))
                }
                <div className="modal-footer">
                    <div>
                        <button type="submit" onClick={this.postImageToApi}
                                className="btn btn-success waves-effect waves-light">
                            ??????????
                        </button>
                        <button data-dismiss="modal"
                                onClick={this.props.onHide}
                                className="btn btn-danger waves-effect ml-2">
                            ??????
                        </button>
                    </div>
                </div>
            </ React.Fragment >
        )
    }
}

export default FileUploadComponent;
