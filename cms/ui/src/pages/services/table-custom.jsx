import React from "react";
import 'antd/dist/antd.css';
import {Table} from "antd";
const TableCustom = ({data, columns}) => {
    return(
        <Table columns={columns} dataSource={data} />
    )
}
export default TableCustom;