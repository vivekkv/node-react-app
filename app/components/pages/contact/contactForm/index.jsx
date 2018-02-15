import React from 'react';
import Input from 'presentational/Input';
import Textarea from 'presentational/Textarea';
import validate from 'validate.js';
import { alertError } from 'utils/notification';

export default class ContactForm extends React.Component {

    render() {

        return <div className="contact">
            <div className="team-info w3-agileits">

                <div className="container">

                    <div className="w3ls-title">

                        <h3 className="agileits-title w3title1">Contact Us</h3>

                    </div>

                    <div className="contact-form">

                        <form onSubmit={this.sendEmail.bind(this)} method="post">

                            <Input autoFocus={true} name="name" value={this.props.data.get("name")} placeholder="Enter name" onChange={this.props.onChange} />
                            <Input name="email" value={this.props.data.get("email")} placeholder="Enter email" onChange={this.props.onChange} />
                            <Input  name="phone" value={this.props.data.get("phone")} placeholder="Enter phone" onChange={this.props.onChange} />
                            <Textarea rows={6} name="message" value={this.props.data.get("message")} placeholder="Enter message" onChange={this.props.onChange} />
                           
                            <input type="submit" value="SUBMIT" />

                        </form>

                    </div>
                </div>
            </div>
        </div>
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