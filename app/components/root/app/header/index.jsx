import React from 'react';

export default class Header extends React.Component {

    render() {

        return <div className="header">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header navbar-left wthree">
                        <h1><a><img src="/assets/images/logo.jpg"  /></a></h1>
                    </div>
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="header-right wthree">
                        <div className="top-nav-text">
                            <p>Call Us: <span>+91 0480 2786655, Mob: +91 9349165966</span></p>
                            <div id="sb-search" className="sb-search">
                                {/* <form action="#" method="post">
                                    <input type="search" className="sb-search-input" name="Search" placeholder="Enter your search term..." id="search" required="" />
                                    <input className="sb-search-submit" type="submit" value="" />
                                    <span className="sb-icon-search"> </span>
                                </form> */}
                                <div className="clearfix"> </div>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-left cl-effect-14">
                                <li><a href="/#/">Home</a></li>
                                <li><a href="/#/products">Products</a></li>
                                <li><a href="/#/images">Portfolio</a></li>
                                <li><a href="/#/videos">Videos</a></li>
                                <li><a href="/#/aboutUs">About Us</a></li>
                                <li><a href="/#/contact">Contact Us</a></li>
                            </ul>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </nav>
        </div>


    }
}