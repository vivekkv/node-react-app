import React from 'react';
import Input from 'presentational/Input';
import Textarea from 'presentational/Textarea';
import validate from 'validate.js';
import { alertError } from 'utils/notification';

export default class ContactUs extends React.Component {

    render() {

        return <section id="contact">
            <div className="container-fluid">
                <div className="well well-sm">
                    <h3><strong>Contact Us</strong></h3>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.256940547758!2d76.28745551528704!3d10.321310570250029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0802a0dc46a827%3A0x57e67af276ebacdd!2sSarah&#39;s+Techno+%2C+Techno+Consultancy!5e0!3m2!1sen!2sin!4v1520257617444" width="100%" height="315" frameBorder="0" style={{ "border": "0" }} allowFullScreen></iframe>
                    </div>

                    <div className="col-md-5">
                        <h4><strong>Get in Touch</strong></h4>

                        <form onSubmit={this.sendEmail.bind(this)}>

                            <div className="form-group">

                                <Input className="form-control tlnt-input-one" name="name" value={this.props.data.get("name")} placeholder="Enter name" onChange={this.props.onChange} />
                            </div>
                            <div className="form-group">

                                <Input className="form-control tlnt-input-one" name="email" value={this.props.data.get("email")} placeholder="Enter email" onChange={this.props.onChange} />

                            </div>
                            <div className="form-group">
                                <Input className="form-control tlnt-input-one" name="phone" value={this.props.data.get("phone")} placeholder="Enter phone" onChange={this.props.onChange} />
                            </div>
                            <div className="form-group">
                                <Textarea rows={6} className="form-control tlnt-input-one" name="message" value={this.props.data.get("message")} placeholder="Enter message" onChange={this.props.onChange} />
                            </div>
                            <button className="btn btn-default" type="submit" name="button">
                                <i className="fa fa-paper-plane-o" aria-hidden="true"></i> Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    }

    sendEmail(e) {

        e.preventDefault();

        let constraints = {
            'name': { presence: true },
            'email': { presence: true, 'email': true },
            'phone': { presence: true },
            'message': { presence: true }
        };

        let validations = validate(this.props.data.toObject(), constraints);

        if (!validations) {

            this.props.onEmailSubmit();

        } else {

            alert("Please check all fields !");
        }

    }
}