import React from 'react';
import Styles from '../styles';

export default class Footer extends React.Component {

    render() {

        let footerCategories = _.filter(this.props.landingPage.get("lstLandingPage").toArray(), (i) => { return i.type == "CATEGORIES" })

        return <div className="footer">
            <div className="container">
                <div className="w3layouts_footer_grid">
                    {/* <div className="title">
                        <h2>Follow Us</h2>
                    </div>
                    <div className="social-icon social_agileinfo">
                        <a href="#" className="social-button twitter"><i className="fa fa-twitter"></i></a>
                        <a href="#" className="social-button facebook"><i className="fa fa-facebook"></i></a>
                        <a href="#" className="social-button google"><i className="fa fa-google-plus"></i></a>
                        <a href="#" className="social-button dribbble"><i className="fa fa-dribbble"></i></a>
                        <a href="#" className="social-button skype"><i className="fa fa-skype"></i></a>
                    </div> */}

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        {/* <div className={Styles.footer_category_item}>

                            <label>Categories</label>

                            <ul>
                                {
                                    footerCategories.map((i) => {

                                        return <li><a href={'/#/category/' + i.value}>{i.additionalInfo}</a></li>
                                    })
                                }

                            </ul>

                        </div> */}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className={Styles.footer_category_item}>

                            <p>SARAH'S TECHNO</p>
                            <p>Aloor, Vellanchira P.O, Thrissur Dist, Kerala State, India - 680 697</p>
                            <p>Ph: 0480 2786655, Mob: +91 9349165966 </p>
                            <p>Email: sarahstechno@gmail.com</p>
                            <p>GST No: 32ATOPM4400D1Z5</p>

                            <img src="/assets/images/logo.jpg" />

                        </div>
                    </div>

                </div>
            </div>
        </div>

    }
}