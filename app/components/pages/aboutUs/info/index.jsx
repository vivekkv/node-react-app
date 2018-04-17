import React from 'react';

export default class Info extends React.Component {

    render() {

        return <div className="about">
            <div className="container">
                <div className="w3ls-title">
                    <h3 className="agileits-title">About Us </h3>
                </div>
                <div className="about-w3ls-row">
                    <div className="col-md-5">
                        <img src="assets/images/logo.jpg" className="img-responsive" alt="" />
				</div>
                        <div className="col-md-7 about-right">
                            <div className="about-agile-row">
                                <div className="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
                                    <ul id="myTab" className=" nav-tabs" role="tablist">
                                        <li role="presentation" className="active"><a id="home-tab" role="tab" data-toggle="tab" 
                                        aria-controls="home" aria-expanded="true"></a></li>
                                    </ul>
                                    <div className="clearfix"> </div>
                                    <div id="myTabContent" className="tab-content">
                                        <div role="tabpanel" className="tab-pane fade in active" id="home" aria-labelledby="home-tab">
                                            <div className="tabcontent-grids">
                                                <p>Sarah's Techno is proud to introduce itself as the major
                                                Manufacturer, Exporter and Supplier of a wide range of Post harvesting and food processing
                                                Machines and Equipment. The range includes Pneumatic Piston Filler, Fruit Mill, Hammer Mill,
                                                Heating Kettle, Lemon Cutting Machine and Sautiner. We provide our services as consultants in
                                                the manufacturing of pickle, sauce, and jam. Our Industrial Machines and Equipment are
                                                demanded by Food Processing Industry, Fruit Processing Industry, Manufacturers of Pickle Jam,
                                                Juice, Curry Paste and Ayurvedic Medicine Manufacturers, etc.
                                                We are firmly committed to fulfill the need of industry and make contributions to
                                                the society by providing high quality Food, Fruit, Pharmaceutical and Packing equipment. The
                                                concept of “Continues innovation” permeates Techno consultancy services and has resulted in
                                                evolution of unique technologies in the company. We want to be a reliable partner for food
                                                industry in providing effective solutions and technologies in food processing and packing needs.
                                                We have moved from an owner driven company to a professionally run organization with highly
                                                qualified managers and engineers who provide excellent support in sales and services under the
                                                leadership of Mr. Mathew Antony who have more than 25 years experience in the field of food and
                                                fruit processing equipments. We are a “One roof solution provider” for food, Fruit &
                                                Pharmaceuticals processors and packers.</p>
                                            </div>
                                        </div>
                                        <div className="clearfix"> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
            }

}