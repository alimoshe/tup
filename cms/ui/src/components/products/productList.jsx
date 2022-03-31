import React, {Component} from "react";

class ProductListComponent extends Component{
    constructor(props) {
        super(props);
        this.selectCheckBox = React.createRef();
        this.state = {
            selectedProduct : -1,

        };

    }

    handleSelectRow = (e) => {
        if (e.target.checked) {
            const dataTag = Number(e.target.attributes['data-tag'].value);
            this.setState({selectedProduct: dataTag})
            this.props.onSelectItem(dataTag);
        }else{
            const dataTag = -1;
            this.setState({selectedProduct: dataTag})
            this.props.onSelectItem(dataTag);
        }


    }
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">انتخاب</th>
                        <th scope="col">نام کالا</th>
                        <th scope="col">دسته بندی</th>
                        <th scope="col">تامین کننده</th>
                        <th scope="col">قیمت</th>
                        <th scope="col">تخفبف مجاز</th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.productList.map(data => (
                            <tr key={data.productId}>
                                <th><input type="checkbox"  onChange={this.handleSelectRow} ref={this.selectCheckBox} data-tag={data.productId}/></th>
                                <th>{data.title}</th>
                                <th>{data.categoryTitle}</th>
                                <th>{data.vendors[0].vendorTitle}</th>
                                <th>{data.mainPrice}</th>
                                <th>0</th>
                                <th>موجود در انبار</th>
                                <th><button className="btn btn-warning mr-1">ویرایس</button> <button className="btn btn-danger">حذف</button></th>
                            </tr>
                        ))

                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductListComponent;