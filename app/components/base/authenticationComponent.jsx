import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isAuthorized } from 'utils/authRegistry';

export default class AuthenticationComponent extends React.Component {

    componentWillMount() {

        const { router } = this.context;

        if (!isAuthorized()) {

          router.push('/login');
        }
    }

}

AuthenticationComponent.contextTypes = {
    router: PropTypes.object.isRequired
};