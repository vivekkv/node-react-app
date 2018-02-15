import React from 'react';

export default class Testimonial extends React.Component {

    render() {

        return <div className="container-fluid" style={{ "max-height": "400px", "overflow": "hidden", "overflow-y": "scroll" }}>

            <div className="row">

                <div className="col-sm-3 nopadding">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/REBi0YlVSAY" allowfullscreen></iframe>
                    </div>
                </div>
                <div className="col-sm-3 nopadding">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/GprXU4oULC0" allowfullscreen></iframe>
                    </div>
                </div>

                <div className="col-sm-3 nopadding">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/WqxzeQHhBUA" allowfullscreen></iframe>
                    </div>
                </div>

                <div className="col-sm-3 nopadding">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/UVF8feQLNRM" allowfullscreen></iframe>
                    </div>
                </div>

            </div>

        </div>

    }
}