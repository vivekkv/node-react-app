import React from 'react';

export default class Testimonial extends React.Component {

    render() {

        let lstCategories = _.filter(this.props.landingPage.get("lstLandingPage").toArray(), (i) => { return i.type == "CATEGORIES" });

        return <div className="features">
            <div className="container">
                <div className="w3ls-title">
                    <h3 className="agileits-title">Our Hot Products</h3>
                </div>
                <div className="features-agilerow">

                    <div className="row">

                        {
                            lstCategories.map((category) => {

                              return  <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12  features-category">
                                    <div className="col-xs-3">
                                        <i className="fa fa-circle" aria-hidden="true"></i>
                                    </div>
                                    <div className="col-xs-9 features-w3grid-right">
                                       <a href={"/#/category/" + category.value}> <h4>{category.additionalInfo}</h4></a>
                                    </div>
                                    <div className="clearfix"> </div>
                                </div>
                            })
                        }

                    </div>

                </div>
            </div>
        </div>

    }
}