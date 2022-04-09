import React from "react";

const Supplier = () => {
    return(
        <React.Fragment>
            <h2 className="title text-left mb-5 appear-animate">مشتریان ما</h2>
            <div
                className="owl-carousel owl-theme row cols-xl-8 cols-lg-6 cols-md-4 cols-sm-3 cols-2 brands-wrapper br-sm mb-10 appear-animate"
                data-owl-options="{
                    'nav': false,
                    'dots': false,
                    'autoplay': true,
                    'autoplayTimeout': 4000,
                    'loop': true,
                    'margin': 20,
                    'responsive': {
                        '0': {
                            'items': 2
                        },
                        '576': {
                            'items': 3
                        },
                        '768': {
                            'items': 4
                        },
                        '992': {
                            'items': 6
                        },
                        '1200': {
                            'items': 8
                        }
                    }
                }">
                <figure>
                    <img src="assets/images/demos/demo2/brands/1.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/2.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/3.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/4.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/5.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/6.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/7.png" alt="Brand" width="290" height="100"/>
                </figure>
                <figure>
                    <img src="assets/images/demos/demo2/brands/8.png" alt="Brand" width="290" height="100"/>
                </figure>
            </div>

        </React.Fragment>


    )
}

export default Supplier;