import React from 'react';

export default class Map extends React.Component {

    render() {

        return <div className="map w3layouts">
            <div className="col-md-8 map-left">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.341724135723!2d76.30290001528697!3d10.314512870368699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08029ab9d97a25%3A0x250d8e2e714beb0e!2sVellanchira+Bus+Stop!5e0!3m2!1sen!2sin!4v1516352558181" allowFullScreen=""></iframe>
            </div>
            <div className="col-md-4 map-wthree-right">
                <h4><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Address</h4>
                <p>Aloor, Vellanchira P.O., Thrissur Dist, Kerala State, India 680697</p>
                <h4><span className="glyphicon glyphicon-phone" aria-hidden="true"></span>Phone</h4>
                <p> 0480 2786655, Mob: +91 9349165966 </p>
                <h4><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>Email</h4>
                <p className="agile-last"><a href="mailto:sarahstechno@gmail.com">sarahstechno@gmail.com</a></p>
            </div>
            <div className="clearfix"> </div>
        </div>
    }
}