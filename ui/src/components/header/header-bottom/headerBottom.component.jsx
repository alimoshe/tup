import {Component} from "react";

class headerBottomComponent extends  Component {
    render() {
        return (
            <div className="header-bottom sticky-content fix-top sticky-header">
                <div className="container">
                    <div className="inner-wrap">
                        <div className="header-left flex-1">
                            <form method="get" action="#"
                                  className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper mr-4 ml-4">
                                <div className="select-box">
                                    <select id="category" name="category">
                                        <option value="">تمام دسته بندیها</option>
                                        <option value="4">مدلینگ</option>
                                        <option value="5">مبلمان</option>
                                        <option value="6">کفشها</option>
                                        <option value="7">اسپورتی</option>
                                        <option value="8">گیم/بازی</option>
                                        <option value="9">کامپیوترها</option>
                                        <option value="10">الکترونیکی</option>
                                        <option value="11">آشپرخانه</option>
                                        <option value="12">لباس</option>
                                    </select>
                                </div>
                                <input type="text" className="form-control" name="search" id="search"
                                       placeholder="جستجو ..." required/>
                                <button className="btn btn-search" type="submit"><i className="w-icon-search" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}