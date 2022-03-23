import React, {Component} from 'react';

class FileUploadComponent extends Component {
    product = {};
    constructor(props) {
        super(props);
        this.state ={
            selectedFiles : [],
            physicalFiles : []
        }
    }

    handleUploadChange = (e) => {
        const clonedFiles = [...this.state.selectedFiles];
        const clonedPhysicalFiles = [...this.state.physicalFiles];
        if (!clonedFiles.includes(e.target.value, 0)) {

            clonedFiles.push(e.target.value);
            clonedPhysicalFiles.push(e.target.files[0]);

            this.setState({selectedFiles : clonedFiles});
            this.setState({physicalFiles : clonedPhysicalFiles});

        }
        console.log(this.state.selectedFiles);
    }
    getDisplayStyle = () => {
        return this.state.selectedFiles.length > 0 ? '' : 'none';
    }

    removeFile = (e) => {
        e.preventDefault();
        this.setState({selectedFiles : this.state.selectedFiles.filter((data) => {
            return data !== e.target.title;
            })})
    }
    render() {

        return (
            <>
                <input className="input-group"
                       accept=".gif,.jpg,.jpeg,.png"
                       type="file"
                       onInput={this.handleUploadChange}/>
                <table className="table table-dark mb-0 mt-3"
                       style={{display: this.getDisplayStyle()}}>
                    <thead>
                    <tr>
                        <th>مسیر فایل</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.selectedFiles.map(data => (
                            <tr>
                                <td>{data}</td>
                                <td><a href=""
                                       onClick={this.removeFile}
                                       title={String(data)}>
                                    <i className="ion ion-md-close-circle"/>&nbsp;حذف</a></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    this.state.physicalFiles.map(file => (

                         <img className="mt-5" src={URL.createObjectURL(file)} alt="picture" style={{
                             border:'1px',
                             width:'128px',
                             height:'128px'
                         }}/>
                    ))
                }
            </>
        )
    }
}

export default FileUploadComponent;