import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

class LoginRoot extends React.Component {

    render() {

        return <div>

            <div id="snackbar"></div>

            {this.props.children}

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

module.exports = connect(storeState, mapDispatchToProps)(LoginRoot);