import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Navigation from './navigation';

class DashboardWrapper extends React.Component {

    render() {

        return <div id="wrapper">

            <Navigation />

            <div id="snackbar"></div>

            <div id="page-wrapper"  >

                {this.props.children}

            </div>

        </div>

    }
}

const storeState = (state, ownProps) => {
    return {
        'data': Map(state.app)
    }
}

const mapDispatchToProps = (dispatch, ownState) => {

    return {
        dispatch,
    }
}

module.exports = connect(storeState, mapDispatchToProps)(DashboardWrapper);