import React from "react";
import {PageHeader, Table} from "antd";
import FormToolbarComponent from "../../components/form-toolbar/formToolbar";
import TableCustom from "./table-custom";
const ServicesPage = ({formHeader, formType}) => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <React.Fragment>
            <FormToolbarComponent formHeader={formHeader}/>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <PageHeader className="site-page-header"
                                                onBack={() => null}
                                                title="Order Summary" />
                                    <TableCustom dataSource={dataSource} columns={columns}/>;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );

}

export default ServicesPage;