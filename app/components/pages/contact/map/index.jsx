import React from 'react';

export default class Map extends React.Component {

    render() {

        return <div className="map w3layouts">
            <div className="col-md-8 map-left">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.256940547758!2d76.28745551528704!3d10.321310570250029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0802a0dc46a827%3A0x57e67af276ebacdd!2sSarah&#39;s+Techno+%2C+Techno+Consultancy!5e0!3m2!1sen!2sin!4v1520257617444" allowFullScreen=""></iframe>
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