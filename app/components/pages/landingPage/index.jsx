import React from 'react';
import Slider from './slider';
import Modal from './modal';
import Welcome from './welcome';
import Testimonial from './testimonial';
import Features from './features';
import Contact from './contact';
import Video from './videGallery';
import LatestNews from './latestNews';
import { SUBMIT_CONTACT, INPUT_CHANGE }  from 'constants/admin/contact';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import { connect } from 'react-redux';
import { Map } from 'immutable';

class LandingPage extends React.Component {

    render() {

        return <div>

            <Slider />

            <Modal />

            <Welcome />

            <Video />

            <Features />

            <LatestNews {...this.props} />

                <hr />
                
            <Contact data={this.props.contact} onChange={this.props.onChange} onEmailSubmit={this.props.onEmailSubmit}/>

        </div>
    }
}


let mapStateToProps = function (state) {

    return {
        contact: Map(state.admin.contact),
        landingPage: Map(state.admin.landingPage)
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
        },
        loadPageContent: function (type) {
            dispatch(reduxAction(LOAD_PAGE_CONTENT, { 'pageType': type }))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LandingPage);