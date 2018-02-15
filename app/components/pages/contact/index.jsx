import React from 'react';
import ContactForm from './contactForm';
import ContactMap from './map';
import { SUBMIT_CONTACT, INPUT_CHANGE }  from 'constants/admin/contact';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { connect } from 'react-redux';
import { Map } from 'immutable';

class Contact extends React.Component {

    render() {
        return <div>

            <ContactForm {...this.props}/>

            <ContactMap />
         
        </div>
    }
}


let mapStateToProps = function (state) {

    return {
        data: Map(state.admin.contact),
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        onChange: function (name, value) {
            dispatch(reduxAction(INPUT_CHANGE, { name, value }));
        },
        onEmailSubmit: function () {
            dispatch(reduxAction(SUBMIT_CONTACT));
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Contact);